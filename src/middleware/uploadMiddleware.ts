import multer from "multer";
import path from "path";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'input'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Create multer upload middleware
export const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
}); 