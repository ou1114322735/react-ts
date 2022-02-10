import { IMovie } from "../db/movieModel";

export interface ISearchResult<T> {
    total:number;
    data:T[];
    errors:string[]
}