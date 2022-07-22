import { IResponseData, IResponseErr, IResponsePageData, ISearchCondition } from "./CommonTypes";
import axios from 'axios'
export interface IMovie {
    _id?: string;
    name: string;
    types: string[]
    areas: string[];
    timeLong: number;
    isHot?: boolean;
    isComing?: boolean;
    isClassic?: boolean;
    description?: string;
    poster?: string;
}

export class MovieService {
    static async add(movie: IMovie): Promise<IResponseData<IMovie> | IResponseErr> {
        const { data } = await axios.post('/api/movie/', movie);
        return data;
    }

    static async update(id: string, movie: Partial<IMovie>): Promise<IResponseData<true> | IResponseErr> {
        const { data } = await axios.put('/api/movie/' + id, movie);
        return data;
    }

    static async delete(id: string): Promise<IResponseData<true> | IResponseErr> {
        return new Promise(resolve => {
            setTimeout(async () => {
                const { data } = await axios.delete("/api/movie/" + id);
                resolve(data)
            }, 300);
        })

    }

    static async getMovieById(id: string): Promise<IResponseData<IMovie | null>> {
        const { data } = await axios.get("/api/movie/" + id);
        return data;
    }

    static async getMovies(condition: ISearchCondition): Promise<IResponsePageData<IMovie>> {
        return new Promise(resolve => {
            setTimeout(async () => {
                const { data } = await axios.get("/api/movie", {
                    params: condition
                });
                resolve(data)
            }, 800);
        })

    }
}