import { ThunkAction } from "redux-thunk";
import { ISearchCondition, SwitchType } from "../../services/CommonTypes";
import { IMovie, MovieService } from "../../services/MovieService";
import { IRootState } from "../reducers";
import { IAction } from "./actionTypes";


export type SaveMoviesAction = IAction<"movie_save",{
    movies:IMovie[],
    total:number
}>
function createSaveMoviesAction(movies:IMovie[],total:number):SaveMoviesAction {
    return {
        type:"movie_save",
        payload:{
            movies,
            total,
        }
    }
}


export type SetLoadingAction = IAction<"movie_setLoading",boolean>
function createSetLoadingAction(isLoading:boolean):SetLoadingAction{
    return {
        type:"movie_setLoading",
        payload:isLoading
    }
}


export type SetConditionAction = IAction<"movie_setCondition",ISearchCondition>
function createSetConditionAction(condition:ISearchCondition):SetConditionAction {
    return {
        type:"movie_setCondition",
        payload:condition
    }
}

export type DeleteAction = IAction<"movie_delete",string>
function createDeleteAction(id:string):DeleteAction{
    return {
        type:"movie_delete",
        payload:id
    }
}
export type SwitchAction = IAction<"movie_switch",{
    type:SwitchType,
    newVal:boolean,
    id:string
}>
function ChangeSwitchAction(type:SwitchType, newVal:boolean, id:string):SwitchAction{
    return {
        type:"movie_switch",
        payload:{
            type,
            newVal,
            id
        }
    }
}

export type MovieActions =SwitchAction | SaveMoviesAction | SetLoadingAction | SetConditionAction | DeleteAction;

function fetchMovies(condition:ISearchCondition):ThunkAction<Promise<void>,IRootState,any,MovieActions>{
    return async (dispatch,getState) => {
        //1.开启加载状态
        dispatch(createSetLoadingAction(true));
        //2.设置条件        
        dispatch(createSetConditionAction(condition));
        //3.获取服务器数据
        const curCondition = getState().movies.condition
        const resp = await MovieService.getMovies(curCondition);
        //4.更改仓库数据
        dispatch(createSaveMoviesAction(resp.data,resp.total));
        
        //5.关闭加载状态
        dispatch(createSetLoadingAction(false));
    }
}

function deleteMovie(id:string):ThunkAction<Promise<void>,IRootState,any,MovieActions>{
    return async (dispatch,getState) => {
        dispatch(createSetLoadingAction(true));
        await MovieService.delete(id);
        dispatch(createDeleteAction(id));
        dispatch(createSetLoadingAction(false));
    }
}

function changeSwitch(type:SwitchType,newVal:boolean,id:string):ThunkAction<Promise<void>,IRootState,any,MovieActions>{
    return async (dispatch, getState) => {
        dispatch(ChangeSwitchAction(type,newVal,id));
        console.log(id);
        
        await MovieService.update(id, {
            [type]:newVal
        });
    }

}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    createSaveMoviesAction,
    createSetLoadingAction,
    createSetConditionAction,
    createDeleteAction,
    fetchMovies,
    deleteMovie,
    ChangeSwitchAction,
    changeSwitch
}

