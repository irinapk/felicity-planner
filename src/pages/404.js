import { Box } from "@mui/material";

const style = {
  errorPage: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      fontFamily: "PoiterOne",
    },
    "& h1": {
      fontSize: 50,
      fontWeight: 700,
    },
    "& p": {
      fontSize: 30,
      fontWeight: 500,
    },
  },
};

export default function Custom404() {
  return (
    <Box sx={style.errorPage}>
      <h1>Page Not Found</h1>
      <p>Check if the URL is correct</p>
    </Box>
  );
}
