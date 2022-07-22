import Express from 'express'
import multer from 'multer';
import path from 'path';
import { ResponsHelper } from './ResponsHelper';
const route = Express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,"../../public/upload"))
    },
    filename: function (req, file, cb) {
        //1.文件名，时间戳
        const fileName = new Date().getTime();
        //2.文件后缀
        const extName = path.extname(file.originalname);
        //3.文件存储
      cb(null, ""+fileName+extName)
    }
  })

const extensionsAllowArr = ['.jpg','.gif','.png','.bmp'] 
const upload = multer(
    { 
        storage, 
        limits:{
            fileSize:1024*1024*20,//最大存储10M的文件,
        },
        fileFilter(req, file, cb){
            const ext = path.extname(file.originalname);
            if(extensionsAllowArr.includes(ext)){
                cb(null,true)
            }else{
                cb(new TypeError('文件类型不符合'))
            }
        },
    }
    ).single('imgFile')
route.post("/",(req,res)=>{
    upload(req, res, function (err) {
        if (err) {
          ResponsHelper.resErr(err,res)
        }else{
            ResponsHelper.resData(`upload/${req.file?.filename}`,res)
        }
      })
})

export default route;