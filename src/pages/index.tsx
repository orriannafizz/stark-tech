import { Inter } from "next/font/google";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "../../components/Table";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState<any[]>([]); // Set the type of data as any array
  useEffect(() => {
    axios.get("https://api.spacexdata.com/v5/launches").then((res) => {
      const launchesWithPics = res.data.map((launch: any) => ({
        id: launch.id,
        name: launch.name,
        date_utc: launch.date_utc,
        success: launch.success,
        details: launch.details,
        pics: launch.links.flickr.original,
      }));
      setData(launchesWithPics);
    });
  }, []);

  return (
    <>
      <Table />
    </>
  );
}
