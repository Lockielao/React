import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import './Dashboard.css'
import { BoardHeader } from '../components/BoardHeader'
import { BoardCrumb } from '../components/BoardCrumb'
import { BoardMenu } from '../components/BoardMenu'
const { Sider, Content } = Layout;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  function handleHeaderClick() {
    setCollapsed(!collapsed)
  }
  return (
    <Layout className="board-main">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="board-logo">{!collapsed && 'Lockielao'}</div>
        <BoardMenu />
      </Sider>
      <Layout>
        <BoardHeader collapsed={collapsed} onClick={() => handleHeaderClick()}/>
        <BoardCrumb />
        <Content className="board-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default Dashboard