import { message } from 'antd';
import React, { Component } from 'react'
import { useRoutes } from 'react-router';
import MovieForm from '../../components/MovieForm'
import { MovieService } from '../../services/MovieService'
import {useNavigate} from "react-router-dom"
const AddMovie =  ()=>  {
   const navigate = useNavigate();
    return (
      <MovieForm AddMovie={async (movie)=>{
        const res = await MovieService.add(movie);
        console.log(res);
        
        if(res.err){
          message.error('添加失败')
        }else{
          message.success('添加成功');
          navigate('/list')
        }
      }}/>  
    )
}
export default AddMovie;
