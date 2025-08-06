import multer, { diskStorage } from "multer";

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/uploads/"); // where file will save
  },
  filename:function(req,file,cb){
    cb(null,`${Date.now()}-${file.originalname}`); //unique file name
  }
});

export const upload = multer({storage:storage});
