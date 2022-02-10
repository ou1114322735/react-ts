import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";
import { BaseEntities } from "./BaseEntitits";

export class Condition extends BaseEntities{

    @IsInt({message:"页数必须是整数"})
    @Min(1,{message:"页数最少一页数"})
    @Type(()=>Number)
    public page:number = 1;

    @IsInt({message:"页码必须是整数"})
    @Min(1,{message:"页数最少每页一个数据"})
    @Type(()=>Number)
    public limit:number = 10;

    
    @Type(()=>String)
    public key:string = "";

    public static transform(plainObj:object): Condition {
        return super.baseTransform(Condition,plainObj)
    }
}