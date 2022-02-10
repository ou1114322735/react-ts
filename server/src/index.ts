import "reflect-metadata";

import {MovieModel} from "./db/db";
import { Movie } from "./entities/Movie";
import { MovieService } from "./services/movieService";

const random = (min,max)=>{
    let ran = max - min;
    return Math.floor(Math.random()*ran);
}

const cond:any = {
    page:1,
    limit:0,
    key:`10`
}

MovieService.find(cond).then(res=>{
    console.log(res);
    
})
