import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#ffffff",
          },
          "&:hover fieldset": {
            borderColor: "#ffffff",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ffffff",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&.Mui-focused": {
            color: "#ffffff",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#000000", // 黑色按鈕文字
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: "#ffffff", // 白色的箭头
        },
      },
    },
  },
});

export default theme;
