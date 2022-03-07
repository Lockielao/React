import { useState, useEffect } from 'react'
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom'

export function BoardMenu() {
  // 动态生成，与路由联动，可自动取消勾选
  // 优化 待路由配置加载后再执行，减少加载次数
  const [routeList, setRouterList] = useState([])
  const [subOpenKeys, setSubOpenKeys] = useState([])
  const [selKeys, setSelKeys] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [subKeyList, setSubKeyList] = useState([])
  const location = useLocation()
  useEffect(() => {
    import('../../router').then(({ menuList }) => {
      setRouterList(menuList[0].children);
      const subKeys = []
      function getSubKey(menuList) {
        menuList.forEach(k => {
          if (k.children && k.children.length > 0) {
            subKeys.push(k.path)
            getSubKey(k.children)
          }
        })
      }
      getSubKey(menuList[0].children)
      setSubKeyList(subKeys)
      setLoaded(true)
    })
  }, [])
  useEffect(() => {
    // 随路由变化
    if (!loaded) {
      return false
    }
    const locationList = location.pathname.split('/').filter(i => i);
    const saveSubkey = []
    const saveChildkey = []
    locationList.forEach(key => {
      if (subKeyList.some(i => i === key)) {
        saveSubkey.push(key)
      } else {
        saveChildkey.push(key)
      }
    })
    setSubOpenKeys(saveSubkey)
    setSelKeys(saveChildkey)
  }, [loaded, location, subKeyList])
  function handleSubMenuClick({ key }) {
    if (subOpenKeys.some(i => i === key)) {
      setSubOpenKeys([])
    } else {
      setSubOpenKeys([key])
    }
  }
  function createMenu(list = routeList) {
    const output = list.map(item => {
      if (item.children && item.children.length > 0) {
        const child = createMenu(item.children)
        return (
          <Menu.SubMenu key={item.path} icon={item.icon} title={item.name} onTitleClick={handleSubMenuClick}>
            {child}
          </Menu.SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.path} icon={item.icon}>
            <Link to={item.url}>{item.name}</Link>
          </Menu.Item>
        )
      }
    })
    return output
  }
  const menuItems = loaded && createMenu()
  return (
    <Menu theme="dark" mode="inline" openKeys={subOpenKeys} selectedKeys={selKeys}>
      {menuItems}
    </Menu>
  )
}