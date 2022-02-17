import { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom'

export function BoardCrumb() {
  // 动态生成
  const [routerMap, setRouterMap] = useState({})
  useEffect(() => {
    import('../../router').then(({ menuList }) => {
      function routerFilter(list) {
        let output = {}
        list.forEach(item => {
          output[item.url] = {
            url: item.url,
            icon: item.icon,
            name: item.name,
          }
          if (item.children && item.children.length > 0) {
            const child = routerFilter(item.children)
            output = Object.assign(output, child)
          }
        })
        return output
      }
      setRouterMap(routerFilter(menuList));
    })
  }, [])
  const locationList = useLocation().pathname.split('/').filter(i => i);
  const crumbItems = locationList.map((i, index) => {
    const url = `/${locationList.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        {routerMap[url] && routerMap[url].icon}
        <Link to={url}>{routerMap[url] && routerMap[url].name}</Link>
      </Breadcrumb.Item>
    )
  })
  return (
    <Breadcrumb separator=">" style={{margin: '10px 20px'}}>{crumbItems}</Breadcrumb>
  )
}