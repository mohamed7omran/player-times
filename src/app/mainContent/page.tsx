import styles from "./page.module.css";
import Divider from "@mui/material/Divider";
import { FaStarAndCrescent } from "react-icons/fa6";
export default function MainContent() {
  return (
    <div className={styles.mainContent}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className={styles.topRow}
      >
        {/* <image></image> */}
        <div>
          <h2> 4:20 | 2024 8 مايو </h2>
          <h1 style={{ marginTop: "10px" }}>الجيزة</h1>
        </div>
        <div>
          <h2>متبقي حتي صلاة المغرب</h2>
          <h1 style={{ marginTop: "10px" }}>1 : 20 : 30</h1>
        </div>
      </div>
      <Divider sx={{ color: "black", marginTop: "30px" }} variant="middle" />
      <div className={styles.bottomRow}>
        <div className={styles.row}>
          <div className={styles.time}>12 : 48</div>
          <div className={styles.name}>
            {" "}
            الفجر{" "}
            <span>
              <FaStarAndCrescent />
            </span>
          </div>
        </div>
        <Divider sx={{ color: "black", marginTop: "10px" }} variant="middle" />
        <div className={styles.row}>
          <div className={styles.time}>12 : 48</div>
          <div className={styles.name}>
            {" "}
            الظهر{" "}
            <span>
              <FaStarAndCrescent />
            </span>
          </div>
        </div>
        <Divider sx={{ color: "black", marginTop: "10px" }} variant="middle" />
        <div className={styles.row}>
          <div className={styles.time}>12 : 48</div>
          <div className={styles.name}>
            {" "}
            العصر{" "}
            <span>
              <FaStarAndCrescent />
            </span>
          </div>
        </div>
        <Divider sx={{ color: "black", marginTop: "10px" }} variant="middle" />
        <div className={styles.row}>
          <div className={styles.time}>12 : 48</div>
          <div className={styles.name}>
            {" "}
            المغرب{" "}
            <span>
              <FaStarAndCrescent />
            </span>
          </div>
        </div>
        <Divider sx={{ color: "black", marginTop: "10px" }} variant="middle" />
        <div className={styles.row}>
          <div className={styles.time}>12 : 48</div>
          <div className={styles.name}>
            {" "}
            العشاء{" "}
            <span>
              <FaStarAndCrescent />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
