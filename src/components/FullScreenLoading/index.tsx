import React from 'react';
import styles from './FullScreenLoading.module.css'; // 创建一个 CSS Modules 文件

const FullScreenLoading = () => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingSpinner}></div>
      <p className={styles.loadingText}>加载中...</p>
    </div>
  );
};

export default FullScreenLoading;