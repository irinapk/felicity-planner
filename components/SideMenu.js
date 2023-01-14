import { Button, getMenuItemUtilityClass } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

const useStyles = {
  menuPanel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "white",
    height: "100vh",
    width: 330,
    maxWidth: 330,
    minWidth: 290,

    boxShadow: "3px 0px 20px rgba(0, 0, 0, 0.25)",
    "& .menuLogo": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      paddingLeft: "20px",
      margin: "40px 5px 100px 5px",
      "& img": {
        width: "60px",
        height: "60px",
        marginRight: "10px",
      },
    },
    "& h1": {
      fontFamily: "PoiterOne",
      fontSize: 55,
      color: "#778C94",
    },
    "& h3": {
      fontFamily: "PoiterOne",
      fontSize: 30,
      fontWeight: 500,
      color: "#778C94",
    },
    "& .menuList": {
      padding: "0 35px",
    },
  },
  menuButton: {
    minWidth: 250,
    width: "100%",
    height: 50,
    fontFamily: "MontserratAlt",
    color: "#7C8993",
    borderRadius: 15,
    background: "transparent",
    "&:hover": {
      background: "transparent",
      color: "#7C8993",
    },
  },
  selectedBtn: {
    color: "white",
    background: "#7C8993",
    "&:hover": {
      background: "#7C8993",
      color: "white",
    },
  },
  plantImg: {
    width: 230,
    height: 420,
    background: `url(/images/plant-img.png) no-repeat`,
    backgroundSize: "contain",
    marginTop: "auto",
    marginRight: "10px",
    justifySelf: "flex-end",
    alignSelf: "flex-start",
  },
};

const menuItems = [
  {
    menuIdx: 1,
    menuTitle: "Dashboard",
  },
  {
    menuIdx: 2,
    menuTitle: "Task Management",
  },
  {
    menuIdx: 3,
    menuTitle: "Open Space",
  },
  {
    menuIdx: 4,
    menuTitle: "My Page",
  },
];

export default function SideMenu(props) {
  const [selectedIdx, setSelectedIdx] = useState(1);
  // let { path, url } = useRouteMatch();

  const onSelectMenu = (idx) => {
    setSelectedIdx(idx);
    // onSelect(idx);
  };

  useEffect(() => {
    // console.log(url);
    // console.log(selectedIdx);
    // console.log(path);
  }, [selectedIdx]);

  return (
    <Box sx={useStyles.menuPanel}>
      <div className="menuLogo">
        <img src="/feli_icon_white.png" />
        <div>
          <h1>FELICITY</h1>
          <h3>Work Planner</h3>
        </div>
      </div>

      <div className="menuList">
        {menuItems.map((item) => (
          <Button
            sx={[
              useStyles.menuButton,
              selectedIdx === item.menuIdx ? useStyles.selectedBtn : null,
            ]}
            disableRipple
            onClick={() => onSelectMenu(item.menuIdx)}
          >
            {item.menuTitle}
          </Button>
        ))}
      </div>

      <Box sx={useStyles.plantImg} />
    </Box>
  );
}