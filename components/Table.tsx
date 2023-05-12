import axios from "axios";
import { useState, useEffect } from "react";
import Launch from "./Launch";
import Loading from "./Loading";
import { Box, Grid, Typography } from "@mui/material";
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
export interface Filter {
  text: string;
  startDate: string | null;
  endDate: string;
  isSuccess: string;
  fromNowtoPast: boolean;
}
export default function Table() {
  const [data, setData] = useState<LaunchProps[]>();
  const [trigger, setTrigger] = useState<number>(1);
  const [filter, setFilter] = useState<Filter>({
    text: "",
    startDate: null,
    endDate: new Date().toISOString().split("T")[0],
    isSuccess: "All",
    fromNowtoPast: true,
  });
  useEffect(() => {
    axios
      .post("https://api.spacexdata.com/v5/launches/query", {
        query: {
          date_utc: {
            ...(filter.startDate === null ? {} : { $gte: filter.startDate }),

            $lte: filter.endDate,
          },
          ...(filter.isSuccess === "All"
            ? {}
            : { success: filter.isSuccess === "Succeed" ? true : false }),

          ...(filter.text === ""
            ? {}
            : {
                name: {
                  $regex: filter.text,
                  $options: "i", // 'i' makes the search case-insensitive
                },
              }),
        },

        options: {
          limit: 1000,
          pagination: true,
          page: 1,
          sort: {
            date_utc: filter.fromNowtoPast ? "desc" : "asc",
          },
        },
      })
      .then((res) => {
        const launchesWithPics = res.data.docs
          .map((launch: any) => ({
            id: launch.id,
            name: launch.name,
            date_utc: launch.date_utc,
            success: launch.success,
            details: launch.details,
            pics: launch.links.flickr.original,
          }))
          .filter((launch: LaunchProps) => launch.pics.length > 0);
        console.log(res.data.docs);
        setData(launchesWithPics);
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  useEffect(() => {
    console.log(data);
  }, [data]);
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
      <SearchBar
        filter={filter}
        setFilter={setFilter}
        setTrigger={setTrigger}
      />
      <div className="flex justify-center items-center tracking-widest">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            overflow: "hidden",
            width: "50%",
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
      {data.length === 0 ? (
        <div className="bg-black h-[80vh]  m-10">
          <Typography variant="h6">No data Found ...</Typography>
        </div>
      ) : (
        <div className="bg-black h-[50vh]" />
      )}
    </div>
  );
}
