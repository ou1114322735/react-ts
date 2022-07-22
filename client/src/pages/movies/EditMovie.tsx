import { message } from 'antd';
import React, { Component } from 'react'
import { useNavigate } from 'react-router';
import MovieForm from '../../components/MovieForm';
import { IMovie, MovieService } from '../../services/MovieService';


const EditMovie = class extends Component {
  state = {
    movie:{},
    paramId:""
  }
  async componentDidMount(){
    const pathname = window.location.pathname;
    const paramId = pathname.split('edit/')[1];
    const  res:any= await MovieService.getMovieById(paramId);
    this.setState({
      movie:res.data,
      paramId,
    })
  }
  render() {
    return (
      <MovieForm movie={this.state.movie}  AddMovie={async (movie) => {
        const res = await MovieService.update(this.state.paramId,movie);        
        if(res.err){
          message.error('修改失败')
        }else{
          message.success('修改成功');
          window.location.href = "/list"
        }
      }} />
    )
  }
}


export default EditMovie;