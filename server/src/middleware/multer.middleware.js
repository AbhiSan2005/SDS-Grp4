import multer from 'multer';

// Configure multer to store files in memory as a buffer.
// as it avoids writing the file to disk on your server.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;