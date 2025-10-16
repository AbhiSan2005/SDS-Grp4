import Report from '../models/report.model.js';
import Project from '../models/project.model.js';

// @desc    Get faculty dashboard overview
// @route   GET /api/faculty/dashboard
// @access  Private/Faculty
export const getFacultyDashboard = async (req, res) => {
  try {
    const [totalReports, totalProjects, publishedReports] = await Promise.all([
      Report.countDocuments(),
      Project.countDocuments(),
      Report.countDocuments({ status: 'Published' })
    ]);

    // Get recent reports
    const recentReports = await Report.find({ status: 'Published' })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('project', 'title')
      .populate('uploadedBy', 'firstName lastName');

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalReports,
          totalProjects,
          publishedReports
        },
        recentReports
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching faculty dashboard',
      error: error.message
    });
  }
};

// @desc    Get all reports for faculty
// @route   GET /api/faculty/reports
// @access  Private/Faculty
export const getFacultyReports = async (req, res) => {
  try {
    const { reportType } = req.query;
    
    let query = { status: 'Published' };
    if (reportType) query.reportType = reportType;

    const reports = await Report.find(query)
      .populate('project', 'title technologies')
      .populate('uploadedBy', 'firstName lastName')
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

// @desc    View single report
// @route   GET /api/faculty/reports/:id
// @access  Private/Faculty
export const viewReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('project', 'title technologies members')
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

// @desc    Get all projects (for faculty view)
// @route   GET /api/faculty/projects
// @access  Private/Faculty
export const getFacultyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isVisible: true })
      .populate('members', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

// @desc    View single project
// @route   GET /api/faculty/projects/:id
// @access  Private/Faculty
export const viewProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('members', 'name email position');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};