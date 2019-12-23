import React from 'react';
import { Spin } from 'antd';
import './FallbackLoading.css';

const FallbackLoading = () => (
  <div className="fallback-loading">
    <Spin size="large"></Spin>
  </div>
);

export default FallbackLoading;
