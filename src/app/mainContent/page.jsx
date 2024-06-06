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
import moment from "moment";
import { useEffect, useState } from "react";
import { keyframes, keys } from "@mui/system";
// error for convert to Arabic
import "moment/dist/locale/ar-dz";
moment.locale("ar-dz");
export default function MainContent() {
  // stats
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [timings, settimings] = useState({
    Fajr: "04:10",
    Dhuhr: "12:53",
    Asr: "16:29",
    Maghrib: "19:53",
    Isha: "21:25",
  });
  const [selectedCity, setSelectedCity] = useState({
    displayName: "الجيزة",
    apiName: "Giza",
  });
  const [today, setToday] = useState("");
  const [timer, setTimer] = useState("10");
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
  const PrayersArray = [
    {
      key: "Fajr",
      displayName: "الفجر",
    },
    {
      key: "Dhuhr",
      displayName: "الظهر",
    },
    {
      key: "Asr",
      displayName: "العصر",
    },
    {
      key: "Maghrib",
      displayName: "المغرب",
    },
    {
      key: "Isha",
      displayName: "العشاء",
    },
  ];
  const getTimings = async () => {
    const respons = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=EGY&city=${selectedCity.apiName}`
    );
    settimings(respons.data.data.timings);
  };
  // for changing the time
  useEffect(() => {
    getTimings();
    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm"));
  }, [selectedCity]);
  // for changing the timer
  useEffect(() => {
    let interval = setInterval(() => {
      countDown();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const countDown = () => {
    const timeNow = moment();
    let prayerIndex = 0;
    if (
      timeNow.isAfter(moment(timings.Fajr, "hh:mm")) &&
      timeNow.isBefore(moment(timings.Dhuhr, "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      timeNow.isAfter(moment(timings.Dhuhr, "hh:mm")) &&
      timeNow.isBefore(moment(timings.Asr, "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      timeNow.isAfter(moment(timings.Asr, "hh:mm")) &&
      timeNow.isBefore(moment(timings.Maghrib, "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      timeNow.isAfter(moment(timings.Maghrib, "hh:mm")) &&
      timeNow.isBefore(moment(timings.Isha, "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }
    setNextPrayerIndex(prayerIndex);

    const nextPrayerObj = PrayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObj.key]; // timings["fajr"]

    const remainingTime = moment(nextPrayerTime, "hh:mm").diff(timeNow);
    const durationRemainingTime = moment.duration(remainingTime);
    console.log(durationRemainingTime.hours());
  };

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
          <h2> {today}</h2>
          <h2>{timer}</h2>
          <h1 style={{ marginTop: "10px" }}>{selectedCity.displayName}</h1>
        </div>
        <div>
          <h2>متبقي حتي صلاة {PrayersArray[nextPrayerIndex].displayName}</h2>
          <h1 style={{ marginTop: "10px" }}>10</h1>
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
              return (
                <MenuItem value={c.apiName} key={id}>
                  {c.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </div>
  );
}
