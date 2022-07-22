import { Response } from "express";
import { ISearchResult } from "../entities/CommonTypes";

export class ResponsHelper {
    static resErr(err: string | string[], res: Response) {
        if (Array.isArray(err)) {
            err = err.join(";");
        }
        res.send({
            err,
            data: null
        })
    };

    static resData(data: any, res: Response) {
        res.send({
            err: "",
            data,
        })
    };

    static resPageData<T>(result: ISearchResult<T>, res: Response) {
        if (result.errors.length > 0) {
            this.resErr(result.errors, res)
        } else {

            res.send({
                err: "",
                data: result.data,
                total: result.total
            })
        }

    }

}