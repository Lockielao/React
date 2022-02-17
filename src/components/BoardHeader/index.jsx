import React, { useState, useEffect } from 'react'
import { TwitterPicker } from 'react-color';
import { Layout, Button, ConfigProvider } from 'antd';
// import enUS from 'antd/lib/locale/en_US';
// import zhCN from 'antd/lib/locale/zh_CN';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import './index.css'
const { Header } = Layout;

export function BoardHeader(props) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [globalConfig, setGlobalConfig] = useState({});
  useEffect(() => {
    console.log('init')
    let defaultConfig = {
      prefixCls: 'lockielao',
      theme: {
        primaryColor: '#1890ff',
      },
    }
    let localConfig = localStorage.getItem('globalConfig');
    if (localConfig) {
      defaultConfig = JSON.parse(localConfig)
    }
    setGlobalConfig(defaultConfig)
    ConfigProvider.config(defaultConfig);
  }, [])
  function handleChangeColor({ hex }) {
    const mergedConfig = Object.assign({}, globalConfig, {
      theme: {
        primaryColor: hex,
      }
    })
    setGlobalConfig(mergedConfig)
    localStorage.setItem('globalConfig', JSON.stringify(mergedConfig));
    ConfigProvider.config(mergedConfig);
  }
  const presetColors = ['#6667ab', '#002fa7', '#939597', '#f5df4d', '#ff6f61', '#88B04B', '#F7CAC9', '#91A8D0', '#964F4C', '#45B5AA']
  return (
    <Header className="header">
      <div className="header-trigger" onClick={() => props.onClick()}>
        {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className="header-setting">
        {/* <Radio.Group value={props.config.locale} onChange={handleChangeLag}>
          <Radio.Button key="en" value={enUS}>
            English
          </Radio.Button>
          <Radio.Button key="cn" value={zhCN}>
            中文
          </Radio.Button>
        </Radio.Group> */}
        <div className="header-color-content">
          <Button className="header-color" type="primary" onClick={() => setShowColorPicker(!showColorPicker)}>主题色</Button>
          {showColorPicker && <TwitterPicker colors={presetColors} color={globalConfig.theme.primaryColor} triangle="top-right" className="header-color-picker" onChange={handleChangeColor}></TwitterPicker>}
        </div>
      </div>
    </Header>
  )
}