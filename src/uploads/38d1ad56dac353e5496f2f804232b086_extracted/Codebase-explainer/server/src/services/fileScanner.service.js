const AdmZip=require("adm-zip");
const fs=require("fs");
const path=require("path");

exports.scanZip=(zipPath)=>{
  const zip=new AdmZip(zipPath);
  const extractPath=zipPath+"_extracted";
  zip.extractAllTo(extractPath,true);

  function scan(dir){
    const items=fs.readdirSync(dir);
    return items.map(item=>{
      const fullPath=path.join(dir,item);
      const stat=fs.statSync(fullPath);

      if(stat.isDirectory()){
        return {type:"folder",name:item,children:scan(fullPath)};
      }
      return {
  type: "file",
  name: item,
  path: fullPath
};

    });
  }

  return scan(extractPath);
};
