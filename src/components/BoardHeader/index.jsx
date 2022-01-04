import React from 'react'
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import './index.css'
const { Header } = Layout;

export function BoardHeader(props) {
  return (
    <Header className="header">
      <span className="header-trigger" onClick={() => props.onClick(!props.collapsed)}>
        {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>
    </Header>
  )
}