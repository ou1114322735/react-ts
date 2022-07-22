import { combineReducers } from "redux";
import movies, { IMovieState } from "./movieReducer";

export interface IRootState {
    movies:IMovieState
}
export default combineReducers({
    movies,
})