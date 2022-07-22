import "reflect-metadata"
import Express from "express";
import { MovieService } from "../services/MovieService";
import { ResponsHelper } from "./ResponsHelper";
import { IMovie } from "../db/movieModel";
import { Movie } from "../entities/Movie";

const router = Express.Router();

router.get('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const movies = await MovieService.findById(movieId);
        ResponsHelper.resData(movies, res)
    } catch (error) {
        ResponsHelper.resData(null, res)
    }
})

router.get("/", async (req, res) => {
    const result = await MovieService.find(req.query as any);
    ResponsHelper.resPageData(result, res)
})

router.post('/', async (req, res) => {
    const result = await MovieService.add(req.body);
    if (Array.isArray(result)) {
        ResponsHelper.resErr(result, res)
    } else {
        ResponsHelper.resData(result, res)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const result = await MovieService.update(req.params.id, req.body);
        if (result.length > 0) {
            //有错误
            ResponsHelper.resErr(result, res)
        } else {
            ResponsHelper.resData(true, res)
        }
    } catch {
        ResponsHelper.resErr('id错误', res)
    }

})

router.delete('/:id', async (req, res) => {
    try {
        await MovieService.delete(req.params.id);
        ResponsHelper.resData(true, res)
    } catch (error) {
        ResponsHelper.resErr('id错误', res)
    }
})

export default router