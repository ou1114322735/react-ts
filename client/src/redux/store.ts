import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk, { ThunkMiddleware } from "redux-thunk";
import reducer, { IRootState } from "./reducers";
export const store = createStore(reducer,applyMiddleware(thunk as ThunkMiddleware<IRootState>, logger))