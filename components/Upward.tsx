import { Inter } from "next/font/google";
import { Box, Fab } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Upward = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
      <Fab
        color="primary"
        size="small"
        aria-label="scroll back to top"
        onClick={scrollTop}
        style={{
          display: "flex",
          backgroundColor: "rgba(255,255,255,0.6)",
        }}>
        <ArrowUpwardIcon />
      </Fab>
    </Box>
  );
};

export default Upward;
