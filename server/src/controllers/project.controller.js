import Project from "../models/project.model.js";
import cloudinary from "../config/cloudinary.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bufferToDataURI = (fileFormat, buffer) => {
    return `data:${fileFormat};base64,${buffer.toString('base64')}`;
}

export const createProject = async (req, res) => {
    try {
        let imageUrl = '';

        if (req.file) {
            const fileURI = bufferToDataURI(req.file.mimetype, req.file.buffer);
            const result = await cloudinary.uploader.upload(fileURI, {
                folder: 'sds_projects'
            });
            imageUrl = result.secure_url;
        }

        const projectData = {
            ...req.body,
            technologies: req.body.technologies.split(','),
            image: imageUrl,
            members: req.body.members
        };
        
        const newProject = new Project(projectData);
        await newProject.save();

        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(400).json({ message: error.message });
    }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate("members", "name photo role");
    if (!project)
      return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        
        if (req.file) {
            const fileURI = bufferToDataURI(req.file.mimetype, req.file.buffer);
            
            const result = await cloudinary.uploader.upload(fileURI, {
                folder: 'sds_projects'
            });

            updateData.image = result.secure_url;
        }

        if (updateData.technologies && typeof updateData.technologies === 'string') {
            updateData.technologies = updateData.technologies.split(',');
        }
        
        const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject)
      return res.status(404).json({ message: "Project not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


