"use client";
import Prayer from "../../components/prayer/page";
import styles from "./page.module.css";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { useEffect, useState } from "react";
import { keyframes, keys } from "@mui/system";

export default function MainContent() {
  // stats
  const [timings, settimings] = useState({
    Fajr: "04:10",
    Dhuhr: "12:53",
    Asr: "16:29",
    Maghrib: "19:53",
    Isha: "21:25",
    Midnight: "00:53",
  });
  const [selectedCity, setSelectedCity] = useState({
    displayName: "الجيزة",
    apiName: "Giza",
  });
  const avilableCities = [
    {
      displayName: "الجيزة",
      apiName: "Giza",
    },
    {
      displayName: "القاهرة",
      apiName: "Cairo",
    },
    {
      displayName: "الاسكندرية",
      apiName: "Alexandria",
    },
  ];
  const getTimings = async () => {
    const respons = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=EGY&city=${selectedCity.apiName}`
    );
    settimings(respons.data.data.timings);
  };
  useEffect(() => {
    getTimings();
  }, [selectedCity]);
  const handleCityChange = (event) => {
    const cityObj = avilableCities.find((city) => {
      return city.apiName == event.target.value;
    });
    setSelectedCity(cityObj);
  };

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
          <h1 style={{ marginTop: "10px" }}>{selectedCity.displayName}</h1>
        </div>
        <div>
          <h2>متبقي حتي صلاة المغرب</h2>
          <h1 style={{ marginTop: "10px" }}>1 : 20 : 30</h1>
        </div>
      </div>
      <Divider sx={{ color: "black", marginTop: "30px" }} variant="middle" />
      <div className={styles.bottomRow}>
        <Prayer name="الفجر" time={timings.Fajr}></Prayer>
        <Divider sx={{ color: "black", marginTop: "10px" }} variant="middle" />
        <Prayer name="الظهر" time={timings.Dhuhr}></Prayer>
        <Divider sx={{ color: "black", marginTop: "10px" }} variant="middle" />
        <Prayer name="العصر" time={timings.Asr}></Prayer>
        <Divider sx={{ color: "black", marginTop: "10px" }} variant="middle" />
        <Prayer name="المغرب" time={timings.Maghrib}></Prayer>
        <Divider sx={{ color: "black", marginTop: "10px" }} variant="middle" />
        <Prayer name="العشاء" time={timings.Isha}></Prayer>
      </div>
      <Stack sx={{ marginTop: "30px" }} direction="row">
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            المدينة
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={handleCityChange}
          >
            {avilableCities.map((c, id) => {
              return <MenuItem value={c.apiName}>{c.displayName}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Stack>
    </div>
  );
}
