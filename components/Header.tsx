import { Button } from "@mui/material";
import React from "react";

const Header = () => {
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
