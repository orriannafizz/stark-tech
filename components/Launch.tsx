import React from "react";
import { LaunchProps } from "./Table";
import Image from "next/image";
interface LaunchRowProps extends LaunchProps {
  key: string;
}

const Launch: React.FC<LaunchRowProps> = ({
  id,
  name,
  date_utc,
  success,
  details,
  pics,
}) => {
  return (
    <tr key={id}>
      <td>{name}</td>
      <td className=" text-red-500">{date_utc}</td>
      <td>{success ? "Yes" : "No"}</td>{" "}
      <td>
        <div>
          <Image src={pics[0]} alt={name} width={500} height={500} />
        </div>
      </td>
      <td>{pics[0]}</td>
    </tr>
  );
};

export default Launch;
