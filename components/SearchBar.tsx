import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { SelectChangeEvent } from "@mui/material/Select";
import { Filter } from "./Table";

interface SearchBarProps {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  setTrigger: React.Dispatch<React.SetStateAction<number>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  filter,
  setFilter,
  setTrigger,
}) => {
  const handleSortChange = (event: SelectChangeEvent) => {
    setFilter({
      ...filter,
      fromNowtoPast: event.target.value === "true",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  const handleSuccessChange = (event: SelectChangeEvent) => {
    setFilter({
      ...filter,
      isSuccess: event.target.value as string,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTrigger((prev) => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit} className=" space-x-2 mb-4 flex items-center">
      <TextField
        name="text"
        value={filter.text}
        onChange={handleInputChange}
        label="search..."
      />
      <TextField
        type="date"
        name="startDate"
        value={filter.startDate || ""}
        onChange={handleInputChange}
        label="Start Date"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ max: filter.endDate }}
      />
      <TextField
        type="date"
        name="endDate"
        value={filter.endDate}
        onChange={handleInputChange}
        label="End Date"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ min: filter.startDate }}
      />
      <FormControl>
        <InputLabel id="Sucessful">Sucessful</InputLabel>
        <Select
          label="Sucessful"
          value={filter.isSuccess}
          onChange={handleSuccessChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Succeed">Succeed</MenuItem>
          <MenuItem value="Failed">Failed</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="launch-date">Sorting</InputLabel>
        <Select
          label="Sorting"
          value={filter.fromNowtoPast ? "true" : "false"}
          onChange={handleSortChange}>
          <MenuItem value="true">
            <ArrowDownwardIcon /> Newest to Oldest
          </MenuItem>
          <MenuItem value="false">
            <ArrowUpwardIcon /> Oldest to Newest
          </MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        filte
      </Button>
    </form>
  );
};

export default SearchBar;
