import axios from "axios";
import { useState, useEffect } from "react";
import Launch from "./Launch";

export interface LaunchProps {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
  details: string;
  pics: string[];
}

export default function Table() {
  const [data, setData] = useState<LaunchProps[]>([]);
  useEffect(() => {
    axios.get("https://api.spacexdata.com/v5/launches").then((res) => {
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

      setData(launchesWithPics);
    });
  }, []);

  return (
    <>
      <h1>SpaceX Launches</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Launch Date</th>
            <th>Success</th>
            <th>Details</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {data.map((launch: LaunchProps) => (
            <Launch
              key={launch.id}
              id={launch.id}
              name={launch.name}
              date_utc={launch.date_utc}
              success={launch.success}
              details={launch.details}
              pics={launch.pics}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
