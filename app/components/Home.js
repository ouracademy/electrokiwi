// @flow
import React from 'react';
import styles from './Home.css';

const fs = require('fs');

const doSomething = () => {
  const root = fs.readdirSync('/');
  // This will print all files at the root-level of the disk,
  // either '/' or 'C:\'.
  console.log(root);
};

const Home = () => (
  <div className={styles.container} data-tid="container">
    <h2>ElectroKiwi</h2>
    <button type="button" onClick={doSomething}>
      On!
    </button>
  </div>
);

export default Home;
