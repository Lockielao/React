import {
  BrowserRouter,
  // Route,
  // Link,
  useRoutes,
  // Routes
} from 'react-router-dom';
// import {
//   TicTacToe,
//   List
// } from '../components/demo'
import {
  Dashboard,
  Demo,
} from '../pages'

function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Dashboard />,
      children: [
        {
          path: 'demo/*',
          element: <Demo />,
          // children: [
          //   {
          //     path: 'game',
          //     element: <TicTacToe />
          //   },
          //   {
          //     path: 'list',
          //     element: <List />
          //   },
          // ]
        },
      ]
    },
    // { path: 'demo', element: <Demo /> }
  ]);
  return element;
}

const displayRoutes = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

export default displayRoutes;
