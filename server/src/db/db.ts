import  Mongoose  from "mongoose";
import MovieModel from "./movieModel"
Mongoose.connect('mongodb://localhost:27017/moviedb').then(()=>{
    console.log('数据库连接成功');
})

export {MovieModel};