import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import './Dashboard.css'
import { BoardHeader } from '../components/BoardHeader'
const { Sider, Content } = Layout;

export function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="board-main">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="board-logo">{!collapsed && 'Lockielao'}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon="">
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon="">
            nav 2
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <BoardHeader collapsed={collapsed} onClick={() => setCollapsed(!collapsed)}/>
        <Content className="board-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}