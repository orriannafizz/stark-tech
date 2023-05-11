import { useState, useEffect } from "react";
import { LaunchProps } from "./Table";
import {
  TextField,
  Button,
  ThemeProvider,
  createTheme,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import theme from "@/styles/muiTheme";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { DateRangePicker } from "@mui/lab";
import { SelectChangeEvent } from "@mui/material/Select";
interface SearchBarProps {
  data: LaunchProps[] | undefined;
  setData: React.Dispatch<React.SetStateAction<LaunchProps[] | undefined>>;
}
interface Filter {
  text: string;
  startDate: string;
  endDate: string;
  selectSuccess: boolean;
  isSuccessful: boolean;
  fromNowtoPast: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ data, setData }) => {
  const [filter, setFilter] = useState<Filter>({
    text: "",
    startDate: "",
    endDate: "",
    selectSuccess: false,
    isSuccessful: false,
    fromNowtoPast: true,
  });
  const handleSelectChange = (event: SelectChangeEvent) => {
    setFilter({
      ...filter,
      fromNowtoPast: event.target.value === "true",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 這裡實現你的過濾和設定數據的邏輯
  };

  return (
    <ThemeProvider theme={theme}>
      <form
        onSubmit={handleSubmit}
        className=" space-x-2 mb-4 flex items-center">
        <TextField
          name="text"
          value={filter.text}
          onChange={handleInputChange}
          label="search..."
        />
        <TextField
          type="date"
          name="startDate"
          value={filter.startDate}
          onChange={handleInputChange}
          label="Start Date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          name="endDate"
          value={filter.endDate}
          onChange={handleInputChange}
          label="End Date"
          InputLabelProps={{ shrink: true }}
        />
        {/* 這裡還可以添加更多的 TextField 根據你的過濾條件 */}

        <FormControl>
          <InputLabel id="demo-simple-select-label">Launch Date</InputLabel>
          <Select
            label="Launch Date"
            value={filter.fromNowtoPast ? "true" : "false"}
            onChange={handleSelectChange}>
            <MenuItem value="true">
              <ArrowDownwardIcon /> Newest to Oldest
            </MenuItem>
            <MenuItem value="false">
              <ArrowUpwardIcon /> Oldest to Newest
            </MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </ThemeProvider>
  );
};

export default SearchBar;
