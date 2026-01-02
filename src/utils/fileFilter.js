const path=require("path");

module.exports=(req,file,cb)=>{
  if(path.extname(file.originalname)!==".zip"){
    cb(new Error("Only zip files allowed"));
  }
  cb(null,true);
};
