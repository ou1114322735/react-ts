import { Reducer } from "react";
import { ISearchCondition } from "../../services/CommonTypes";
import { IMovie } from "../../services/MovieService";
import { DeleteAction, MovieActions, SaveMoviesAction, SetConditionAction, SetLoadingAction, SwitchAction } from "../actions/movieAction";


export type IMovieCondition = Required<ISearchCondition>;
export interface IMovieState {
    /**
     * 电影数组
     */

    data: IMovie[]
    /**
     * 查询条件
     */

    condition: IMovieCondition
    /**
     * 数据总数
     */

    total: number
    /**
     * 是否正在加载
     */

    isLoading: boolean
    /**
     * 总页数
     */
    totalPage:number

}

const defaultState: IMovieState = {
    data: [],
    condition: {
        page: 1,
        limit: 10,
        key: ""
    },
    total: 0,
    isLoading: false,
    totalPage:0
};

const saveMovies: Reducer<IMovieState, SaveMoviesAction> = (state, action) => {
    return {
        ...state,
        data: action.payload.movies,
        total: action.payload.total,
        totalPage:Math.ceil(action.payload.total / state.condition.limit) 
    }
};

const deleteMovie: Reducer<IMovieState, DeleteAction> = (state, action) => {
    return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload),
        total:state.total - 1,
        totalPage:Math.ceil((state.total - 1) / state.condition.limit)
    };
}

const setCondition: Reducer<IMovieState, SetConditionAction> = (state, action) => {
    const newState = {
        ...state,
        condition: {
            ...state.condition,
            ...action.payload
        }
    };
    newState.totalPage = Math.ceil(newState.total / newState.condition.limit);
    return newState;
};

const setLoading: Reducer<IMovieState, SetLoadingAction> = (state, action) => {
    return {
        ...state,
        isLoading: action.payload
    }
}

const changeSwitch:Reducer<IMovieState,SwitchAction> = (state, action) =>{
    if(!state.data.find(i=>i._id === action.payload.id)){
        return state;
    };
    const newData = state.data.map(item=>{
        if(item._id === action.payload.id){
            return {
                ...item,
                [action.payload.type] : action.payload.newVal
            }
        }else{
            return item;
        }
    });
    return {
        ...state,
        data:newData
    }
}



// eslint-disable-next-line import/no-anonymous-default-export
export default function (state: IMovieState = defaultState, action: MovieActions) {
    switch (action.type) {
        case "movie_save":
            return saveMovies(state, action)
        case "movie_delete":
            return deleteMovie(state, action)
        case "movie_setCondition":
            return setCondition(state, action)
        case "movie_setLoading":
            return setLoading(state, action)
        case "movie_switch":
            return changeSwitch(state,action);
        default:
            return state
    }
}
