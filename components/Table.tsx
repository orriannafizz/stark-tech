import axios from "axios";
import { useState, useEffect } from "react";
import Launch from "./Launch";
import Loading from "./Loading";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import SearchBar from "./SearchBar";
export interface LaunchProps {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
  details: string;
  pics: string[];
}

export default function Table() {
  const [data, setData] = useState<LaunchProps[]>();

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v5/launches")
      .then((res) => {
        const launchesWithPics = res.data
          .map((launch: any) => ({
            id: launch.id,
            name: launch.name,
            date_utc: launch.date_utc,
            success: launch.success,
            details: launch.details,
            pics: launch.links.flickr.original,
          }))
          .filter((launch: LaunchProps) => launch.pics.length > 0);
        console.log(launchesWithPics);
        setData(launchesWithPics);
      })
      .finally(() => {
        console.log(data);
      });
  }, []);
  if (!data) {
    return <Loading />;
  }
  return (
    <div className="bg-black text-white flex justify-center items-center flex-col">
      <Image
        src="/SpaceX-White-Logo.wine.svg"
        width={300}
        height={100}
        alt="Space X"
      />
      <SearchBar data={data} setData={setData} />

      <div className="flex justify-center items-center tracking-widest">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center", // 這裡更改為 "center" 或 "flex-start"
            overflow: "hidden",
            width: "50%", // 這裡增加了 width: '100%'
          }}>
          <Grid container spacing={2}>
            {data.map((launch: LaunchProps) => (
              <Grid item xs={12} sm={6} key={launch.id}>
                <Launch
                  key={launch.id}
                  id={launch.id}
                  name={launch.name}
                  date_utc={launch.date_utc}
                  success={launch.success}
                  details={launch.details}
                  pics={launch.pics}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
}
