"use client";
import Prayer from "../../components/prayer/page";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
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
  const [remainingTime, setRemainingTime] = useState("");
  const [today, setToday] = useState("");
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
  }, [timings]);

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

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(timeNow);
    if (remainingTime < 0) {
      const midNightDiff = moment("00:00:00", "hh:mm:ss").diff(timeNow);
      const fajrToMidNightDiff = moment(nextPrayerTime, "hh:mm").diff(
        moment("11:59:59", "hh:mm:ss")
      );
      const totalDiff = midNightDiff + fajrToMidNightDiff;
      remainingTime = totalDiff;
    }
    const durationRemainingTime = moment.duration(remainingTime);
    setRemainingTime(
      `${durationRemainingTime.hours()}:${durationRemainingTime.minutes()}:${durationRemainingTime.seconds()}`
    );
  };

  const handleCityChange = (event) => {
    const cityObj = avilableCities.find((city) => {
      return city.apiName == event.target.value;
    });
    setSelectedCity(cityObj);
  };

  return (
    <div className=" mt-14 container mx-auto 2xl:px-72  lg:px-44  md:px-5  sm:px-14 max-[640px]:px-5">
      <div className="relative isolate px-6  lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4a0bb7] to-[#2111d0] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className=""
        >
          <div>
            <h2 className="text-2xl max-[500px]:text-sm"> {today}</h2>
            <h1 className="text-2xl text-center" style={{ marginTop: "10px" }}>
              {selectedCity.displayName}
            </h1>
          </div>
          <div>
            <h2 className="text-2xl max-[600px]:text-xl">
              متبقي حتي صلاة {PrayersArray[nextPrayerIndex].displayName}
            </h2>
            <h1 className="text-2xl text-center" style={{ marginTop: "10px" }}>
              {remainingTime}
            </h1>
          </div>
        </div>
        <Divider sx={{ color: "black", marginTop: "30px" }} variant="middle" />
        <div className="">
          <Prayer name="الفجر" time={timings.Fajr}></Prayer>
          <Divider
            sx={{ color: "black", marginTop: "10px" }}
            variant="middle"
          />
          <Prayer name="الظهر" time={timings.Dhuhr}></Prayer>
          <Divider
            sx={{ color: "black", marginTop: "10px" }}
            variant="middle"
          />
          <Prayer name="العصر" time={timings.Asr}></Prayer>
          <Divider
            sx={{ color: "black", marginTop: "10px" }}
            variant="middle"
          />
          <Prayer name="المغرب" time={timings.Maghrib}></Prayer>
          <Divider
            sx={{ color: "black", marginTop: "10px" }}
            variant="middle"
          />
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
    </div>
  );
}
