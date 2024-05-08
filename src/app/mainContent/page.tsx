import Prayer from "../components/prayer/page";
import styles from "./page.module.css";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import NativeSelect from "@mui/material/NativeSelect";

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
        <Prayer name="الفجر" time="29 : 4"></Prayer>
        <Divider sx={{ color: "black", marginTop: "10px" }} variant="middle" />
        <Prayer name="الظهر" time="51 : 12"></Prayer>
        <Divider sx={{ color: "black", marginTop: "10px" }} variant="middle" />
        <Prayer name="العصر" time="28 : 4"></Prayer>
        <Divider sx={{ color: "black", marginTop: "10px" }} variant="middle" />
        <Prayer name="المغرب" time="38 : 7"></Prayer>
        <Divider sx={{ color: "black", marginTop: "10px" }} variant="middle" />
        <Prayer name="العشاء" time="03 : 9"></Prayer>
      </div>
      <Stack sx={{ marginTop: "30px" }} direction="row">
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            المدينة
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
          >
            <option value={30}>الجيزة</option>
            <option value={20}>القاهرة</option>
            <option value={10}>الاسكندرية</option>
          </NativeSelect>
        </FormControl>
      </Stack>
    </div>
  );
}
