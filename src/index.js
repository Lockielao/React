import ReactDOM from 'react-dom';
import './index.css';
import { AppRoutes } from './router'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('root')
);
