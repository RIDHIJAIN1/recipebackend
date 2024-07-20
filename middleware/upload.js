import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination : './uploads/',
    filename : (req,file,cb)=>{
        cb(null , `${Date.now()}-${file.originalname}`);
    }

});

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }

  const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  }).single('image');

  export default upload;
  
  

