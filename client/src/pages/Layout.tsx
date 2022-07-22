import React from 'react'
import { Link, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import { Layout as AntD, Menu} from 'antd';
import "./Layout.css";
const { Header,  Sider, Content } = AntD;
export default function Layout() {
  return (
    <div className='layout-root'>
       <AntD>
      <Header>
        <Link to='/' >猫眼电影管理系统</Link>
      </Header>
      <AntD>
        <Sider>
        <Menu
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            <Link to='add'>添加电影</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='list'>电影列表</Link>
          </Menu.Item>
        </Menu>
        </Sider>
        <Content className='content'>
          <Outlet />
        </Content>
      </AntD>
    </AntD>
    </div>
  )
}
