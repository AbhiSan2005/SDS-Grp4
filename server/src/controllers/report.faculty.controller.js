import Report from '../models/report.model.js';
import path from 'path';
import fs from 'fs/promises';

// @desc    Get all reports
// @route   GET /api/reports
// @access  Private (Admin/Faculty)
export const getAllReports = async (req, res) => {
  try {
    const { reportType, status } = req.query;
    
    let query = {};
    if (reportType) query.reportType = reportType;
    if (status) query.status = status;

    const reports = await Report.find(query)
      .populate('project', 'title')
      .populate('uploadedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reports',
      error: error.message
    });
  }
};

// @desc    Get single report
// @route   GET /api/reports/:id
// @access  Private (Admin/Faculty)
export const getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('project', 'title')
      .populate('uploadedBy', 'firstName lastName email');

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching report',
      error: error.message
    });
  }
};

// @desc    Create report (with file upload)
// @route   POST /api/reports
// @access  Private/Admin
export const createReport = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a report file'
      });
    }

    const reportData = {
      ...req.body,
      filePath: req.file.path,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      uploadedBy: req.user.id
    };

    const report = await Report.create(reportData);
    await report.populate('uploadedBy', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Report uploaded successfully',
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating report',
      error: error.message
    });
  }
};

// @desc    Update report
// @route   PUT /api/reports/:id
// @access  Private/Admin
export const updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('project uploadedBy', 'title firstName lastName');

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Report updated successfully',
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating report',
      error: error.message
    });
  }
};

// @desc    Delete report
// @route   DELETE /api/reports/:id
// @access  Private/Admin
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Delete file from filesystem
    try {
      await fs.unlink(report.filePath);
    } catch (err) {
      console.error('Error deleting file:', err);
    }

    await report.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting report',
      error: error.message
    });
  }
};

// @desc    Download report
// @route   GET /api/reports/:id/download
// @access  Private (Admin/Faculty)
export const downloadReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Check if file exists
    try {
      await fs.access(report.filePath);
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: 'Report file not found on server'
      });
    }

    res.download(report.filePath, report.fileName);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error downloading report',
      error: error.message
    });
  }
};