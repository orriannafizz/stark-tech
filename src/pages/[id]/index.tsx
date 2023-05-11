import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ThemeProvider, Typography } from "@mui/material";
import YouTube from "react-youtube";
import muiTheme from "../../styles/muiTheme";
import Loading from "../../../components/Loading";
import Header from "../../../components/Header";
interface LaunchProps {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
  details: string;
  pics: string[];
  ytLink: string;
}

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<LaunchProps>();

  useEffect(() => {
    if (id) {
      axios.get(`https://api.spacexdata.com/v5/launches/${id}`).then((res) => {
        const launchesWithPics = {
          id: res.data.id,
          name: res.data.name,
          date_utc: res.data.date_utc,
          success: res.data.success,
          details: res.data.details,
          pics: res.data.links.flickr.original,
          ytLink: res.data.links.youtube_id,
        };
        setData(launchesWithPics);
        console.log(res);
      });
    }
  }, [id]);

  if (!data) {
    return <Loading />;
  }
  const videoOptions = {
    height: "390",
    width: "640",
  };
  return (
    <>
      <Header />
      <div className="bg-black text-white flex flex-col items-center p-10 h-screen justify-center">
        <div className="mx-auto">
          <YouTube videoId={data.ytLink} opts={videoOptions} />
        </div>
        <div className="text-left mt-4">
          <Typography variant="h6" className="text-gray-600 text-lg mb-5">
            {data.date_utc.toString().split("T")[0]}
          </Typography>
          <Typography
            variant="h4"
            className="uppercase tracking-wider font-bold mb-5">
            {data.name}
          </Typography>

          {/* <Typography className="text-sm">
          Success: {data.success ? "Yes" : "No"}
        </Typography> */}
          <Typography className="text-sm text-gray-400">
            {data.details}
          </Typography>
        </div>
        {/* {data.pics &&
        data.pics.map((pic, index) => (
          <Image
            key={index}
            src={pic}
            alt={`Launch ${data.name}`}
            width={300}
            height={300}
          />
        ))} */}
      </div>
    </>
  );
}
