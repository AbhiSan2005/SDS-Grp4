// Middleware to restrict access based on user roles

// Allows access if the user is an Admin
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next(); 
    } else {
        res.status(403).json({ message: 'Forbidden: Admin access required.' });
    }
};

// Allows access if the user is a Faculty Advisor
const facultyOnly = (req, res, next) => {
    if (req.user && req.user.role === 'Faculty Advisor') {
        next(); 
    } else {
        res.status(403).json({ message: 'Forbidden: Faculty Advisor access required.' }); 
    }
};

// Allows access if the user is EITHER an Admin OR a Faculty Advisor
const adminOrFacultyOnly = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'Faculty Advisor')) {
        next(); 
    } else {
        res.status(403).json({ message: 'Forbidden: Admin or Faculty Advisor access required.' }); 
    }
};


export { adminOnly, facultyOnly, adminOrFacultyOnly };