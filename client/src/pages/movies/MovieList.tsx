
import MovieTable from '../../components/MovieTable'
import { connect } from "react-redux";
import { IRootState } from '../../redux/reducers';
import movieAction, { MovieActions } from '../../redux/actions/movieAction';
import { Dispatch } from "react"
import { IMovieTableEvents } from "../../components/MovieTable";
import { SwitchType } from '../../services/CommonTypes';
function mapStateToProps(state: IRootState) {
  return state.movies;
}

function mapDispatchToProps(dispatch: any): IMovieTableEvents {
  return {
    onLoad() {
      dispatch(movieAction.fetchMovies({
        page: 1,
        limit: 10,
        key: ""
      }))
    },
    onSwitchChange(type: SwitchType, newState: boolean, id: string) {
      dispatch(movieAction.changeSwitch(type,newState,id)); 
    },
    async onDelete(id:string) {
      await dispatch(movieAction.deleteMovie(id));
    },
    async onChange(newPage){
      await dispatch(movieAction.fetchMovies({
        page:newPage,
      }))
    },
    onInpChange(key){
      dispatch(movieAction.createSetConditionAction({key}));
    },
    onEnterDown() {
      dispatch(movieAction.fetchMovies({
        page:1
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable)