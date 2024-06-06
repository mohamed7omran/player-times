import React from "react";
import styles from "./page.module.css";
import { FaStarAndCrescent } from "react-icons/fa6";

const Prayer = ({ name, time }) => {
  return (
    <div className={styles.row}>
      <div className={styles.time}>{time}</div>
      <div className={styles.name}>
        {name}
        <span>
          <FaStarAndCrescent />
        </span>
      </div>
    </div>
  );
};

export default Prayer;
