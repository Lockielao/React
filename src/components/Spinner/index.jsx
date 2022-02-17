import { Spin } from 'antd';
import './index.css'

export default function Spinner() {
  return (
    <div className="spinner-wrap">
      <Spin tip="加载中..." size="large" />
    </div>
  )
}