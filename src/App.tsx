import React from 'react';

import styles from './app.module.scss';
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <div className={styles.app}>
       <HomePage />
    </div>
  );
}

export default App;
