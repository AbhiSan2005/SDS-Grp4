import { GoogleGenerativeAI } from "@google/generative-ai";
import Project from '../models/project.model.js';
import Report from '../models/report.model.js';
import Event from "../models/event.model.js";
import cloudinary from '../config/cloudinary.js';
import PDFDocument from 'pdfkit';

export const getReports = async(req,res) =>{
    try {
        const reports = await Report.find()
            .populate('project', 'title')
            .populate('event')
            .sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ message: 'Failed to fetch reports.' });
    }
}

export const deleteReport = async (req, res) => {
    const {id} = req.params;
    try {
        const report = await Report.findByIdAndDelete(id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found.' });
        }
        res.status(200).json({ message: 'Report deleted successfully.' });
    } catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({ message: 'Failed to delete report.' });
    }
};

const bufferToDataURI = (fileFormat, buffer) => {
    return `data:${fileFormat};base64,${buffer.toString('base64')}`;
}

export const uploadReport = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No report file uploaded.' });
        }

        const fileURI = bufferToDataURI(req.file.mimetype, req.file.buffer);

        // Upload the Data URI to Cloudinary
        const result = await cloudinary.uploader.upload(fileURI, {
            folder: 'sds_reports', 
            resource_type: 'raw'    
        });

        // create db record
        const newReport = new Report({
            title: req.body.title, 
            project: req.body.project, 
            filePath: result.secure_url, 
            fileType: req.file.mimetype,
        });

        await newReport.save();
        res.status(201).json({ message: 'Report uploaded successfully!', report: newReport });

    } catch (error) {
        console.error("Error uploading report:", error);
        res.status(400).json({ message: 'Upload failed.', error: error.message });
    }
};

// Generating the report takes here 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

export const generateAndSaveProjectReport = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).populate('members', 'name role');
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // prompt for the report (will change it later as per requirements)
    const prompt = `
      Generate a professional project summary report in for the following project.
      Structure it with these sections: Overview, Key Features, Technologies Used, and Team Contribution.
      
      Project Title: ${project.title}
      Description: ${project.description}
      Team Members: ${project.members?.map(m => m.name).join(', ')}
      Technologies: ${project.technologies.join(', ')}
    `;

    const result = await model.generateContent(prompt);
    const reportText = await result.response.text();
    
    // Using PDFKit to create a PDF 
    const doc = new PDFDocument({ margin: 50 });
    doc.fontSize(24).text(`Project Report: ${project.title}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(reportText); 
    doc.end();

    // uploading to cloudinary
    const cloudinaryUpload = (pdfStream) => {
      return new Promise((resolve, reject) => {

        const safeProjectTitle = project.title.replace(/[^a-zA-Z0-9_]/g, '_'); 
        const desiredFilename = `${safeProjectTitle}_report`; 

        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "sds_generated_reports", resource_type: "raw" , format: 'pdf', public_id: desiredFilename },
          (error, result) => {
            if (error) {
                console.log("Cloudinary Upload Error:", error);
                reject(error);
            } else resolve(result);
          }
        );
        pdfStream.pipe(uploadStream);

        pdfStream.on('error', (err) => {
          console.error('PDF Stream Error:', err);
          reject(err); 
        });
      });
    };

    const uploadResult = await cloudinaryUpload(doc);
    
    const newReport = new Report({
      title: `AI-Generated Report for ${project.title}`,
      project: project._id,
      filePath: uploadResult.secure_url, 
      fileType: 'application/pdf',
      status: 'Approved' 
    });

    await newReport.save();
    res.status(201).json({ message: 'Report generated and saved successfully!', report: newReport });

  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: 'Failed to generate project report.' });
  }
};

export const generateAndSaveEventReport = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    const prompt = `
      Generate a professional event summary report in markdown format.
      Include sections like: Event Overview, Date & Location, Key Highlights, and Organizer.
      
      Event Title: ${event.title}
      Description: ${event.description}
      Start Date: ${new Date(event.startDate).toLocaleString()}
      End Date: ${new Date(event.endDate).toLocaleString()}
      Location: ${event.location}
      Organizer: ${event.organizer}
    `;

    const result = await model.generateContent(prompt);
    const reportText = await result.response.text();

    const pdfBuffer = await new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);
      doc.fontSize(24).text(`Event Report: ${event.title}`, { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(reportText); 
      doc.end();
    });

    const cloudinaryUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const safeEventTitle = event.title.replace(/[^a-zA-Z0-9_]/g, '_');
        const desiredFilename = `${safeEventTitle}_report`;
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "sds_event_reports", resource_type: "raw", format: 'pdf', public_id: desiredFilename },
          (error, result) => { if (error) reject(error); else resolve(result); }
        );
        uploadStream.end(buffer);
      });
    };
    const uploadResult = await cloudinaryUpload(pdfBuffer);

    const newReport = new Report({
      title: `AI-Generated Report for ${event.title}`,
      event: event._id,
      filePath: uploadResult.secure_url,
      fileType: 'application/pdf',
      status: 'Approved'
    });
    await newReport.save();

    res.status(201).json({ message: 'Event report generated and saved!', report: newReport });

  } catch (error) {
    console.error("Error generating event report:", error);
    res.status(500).json({ message: 'Failed to generate event report.' });
  }
};