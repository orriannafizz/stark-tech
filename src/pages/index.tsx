import { Inter } from "next/font/google";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "../../components/Table";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/muiTheme";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Table />
    </ThemeProvider>
  );
}
