import Table from "../../components/Table";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/muiTheme";
import Upward from "../../components/Upward";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Table />
      <Upward />
    </ThemeProvider>
  );
}
