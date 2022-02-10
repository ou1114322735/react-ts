import { MovieModel } from "../db/db";
import { IMovie } from "../db/movieModel";
import { ISearchResult } from "../entities/CommonTypes";
import { Condition } from "../entities/Condition";
import { Movie } from "../entities/Movie";

export class MovieService {
    public static async  add(movie:Movie):Promise<IMovie | string[]> {
        //1.类型转换
        movie = Movie.transform(movie);
        //2.数据验证
        const errs = await movie.validateThisMovie();
        if(errs.length > 0){
            //代表输入数据有错误
            return errs;
        }
        //3.添加到数据库
        return await MovieModel.create(movie)
    }

    public static async delete(id:string): Promise<void>{
         await MovieModel.deleteOne({_id:id})
    };

    public static async update(id:string,movie:Movie):Promise<string[]> {
        //1.类型转换
        const movieObj = Movie.transform(movie);
        //2.数据验证
        const errs = await movieObj.validateThisMovie(true);
        if(errs.length > 0){
            //代表输入数据有错误
            return errs;
        }
        //3.删除操作
         await MovieModel.updateOne({_id:id}, movie);
         return errs
    }

    public static async findById(id:string):Promise<IMovie | null> {
        return await MovieModel.findById(id);
    }

    /**
     * 根据条件查询
     * @param condition page、limit、key
     */
    public static async find(condition:Condition):Promise<ISearchResult<IMovie>> {
        //1.类型转换
        condition = Condition.transform(condition);
        //2.数据验证
        const errors = await condition.validateThisMovie();
        if(errors.length > 0){
            //代表输入数据有错误
            return {
                total:0,
                data:[],
                errors,
            }
        }
        //3.查询
        const movies = await MovieModel.find({
            name: {$regex: new RegExp(condition.key)},
        }).skip((condition.page - 1) * condition.limit).limit(condition.limit);
        const count = await MovieModel.find({
            name: {$regex: new RegExp(condition.key)},
        }).countDocuments();
        return {
            total:count,
            data:movies,
            errors:[]
        }
    }
}