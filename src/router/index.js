import {
  BrowserRouter,
  useRoutes,
  Navigate
} from 'react-router-dom';
import { TicTacToe } from '../components/TicTacToe';
import { List } from '../components/List';
import store from '../store';
import {
  Dashboard,
  Demo,
  Login,
} from '../pages'
import { HomeOutlined, AppstoreOutlined, NumberOutlined } from '@ant-design/icons';
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
    element: <RequireAuth><Dashboard /></RequireAuth>,
    name: '主页',
    icon: <HomeOutlined />,
    children: [
      {
        path: 'demo',
        element: <Demo />,
        name: '示例',
        icon: <AppstoreOutlined />,
        children: [
          {
            path: 'game',
            name: '三连棋',
            icon: <NumberOutlined />,
            element: <TicTacToe />
          },
          {
            path: 'list',
            name: '列表',
            element: <List />
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
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
