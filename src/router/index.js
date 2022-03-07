import React from 'react'
import {
  BrowserRouter,
  useRoutes,
  Navigate
} from 'react-router-dom';
import store from '../store';
import Spinner from '../components/Spinner'
import { HomeOutlined, AppstoreOutlined, CalculatorOutlined } from '@ant-design/icons';

// 懒加载
const lazyLoad = (path, isComponent = false) => {
  // lazy只能引入export default的
  const Comp = isComponent ? React.lazy(() => import(`../components/${path}`)) : React.lazy(() => import(`../pages/${path}`))
  return (
    <React.Suspense fallback={<Spinner />}>
      <Comp />
    </React.Suspense>
  )
}

function RequireAuth({ children }) {
  const userInfo = store.getState()
  if (userInfo && userInfo.login && userInfo.login.isLogin) {
    return children
  } else {
    return <Navigate to="/login" replace/>
  }
}
const menu = [
  {
    path: '/home',
    element: <RequireAuth>{lazyLoad('Dashboard')}</RequireAuth>,
    name: '主页',
    icon: <HomeOutlined />,
    children: [
      {
        path: 'demo',
        element: lazyLoad('Demo'),
        name: '示例',
        icon: <AppstoreOutlined />,
        children: [
          {
            path: 'game',
            name: '三连棋',
            element: lazyLoad('TicTacToe', 1)
          },
          {
            path: 'list',
            name: '列表',
            element: lazyLoad('List', 1)
          },
        ]
      },
      {
        path: 'calc',
        element: lazyLoad('Calc'),
        name: '算法',
        icon: <CalculatorOutlined />,
      },
    ]
  },
  {
    path: '/login',
    element: lazyLoad('Login'),
  }
]

function App() {
  const element = useRoutes(menu);
  return element;
}

const AppRoutes = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

function filterMenuKey(list = menu, perfix = '') {
  // 去掉组件
  return list.map(item => {
    const url = `${perfix}${perfix && !perfix.endsWith('/') ? '/' : ''}${item.path}`
    return {
      path: item.path,
      url,
      icon: item.icon,
      name: item.name,
      children: item.children && item.children.length > 0 ? filterMenuKey(item.children, url) : null
    }
  })
}
const menuList = filterMenuKey()

export {
  AppRoutes,
  menuList
};
