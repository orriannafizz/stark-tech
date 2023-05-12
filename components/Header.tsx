import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
type Props = {};

const Header = (props: Props) => {
  return (
    <div className="bg-black py-4 px-4">
      <Button
        href="/"
        variant="outlined"
        className=""
        style={{ color: "white", borderColor: "white" }}>
        back
      </Button>
    </div>
  );
};

export default Header;
