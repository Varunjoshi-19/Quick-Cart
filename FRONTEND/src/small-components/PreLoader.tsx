import React, { useEffect } from 'react';
import styles from "../Styling/PreLoader.module.css"


const Preloader: React.FC = () => {

useEffect(() => { 

window.document.body.style.overflow = "hidden";

} , [])


  return (
    <div className={styles.preloader}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Preloader;
