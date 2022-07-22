
export interface IResponseData<T> {
    err:"";
    data:T
}

export interface IResponseErr {
    err:string;
    data:null
}

export interface IResponsePageData<T> {
    err:"";
    data:T[];
    total:number
}

export interface ISearchCondition {
    page?:number;
    limit?:number;
    key?:string
}

export enum SwitchType {
    isHot = "isHot",
    isComing = 'isComing',
    isClassic = 'isClassic'
}