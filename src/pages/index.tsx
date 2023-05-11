import { Inter } from "next/font/google";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "../../components/Table";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Table />
    </>
  );
}
