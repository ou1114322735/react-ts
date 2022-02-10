import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";


export abstract class BaseEntities {
    protected  static baseTransform <T>(cls:ClassConstructor<T>,plainObj:object): T {
        return plainObj instanceof cls ? plainObj : plainToClass(cls,plainObj);
    }

    public  async validateThisMovie(skipMissing = false):Promise<string[]>{
        const errors = await validate(this,{
            skipMissingProperties: skipMissing
        })
        const temp = errors.map(e=>Object.values(e.constraints!));
        return temp.flat();
    }
}