import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
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
      fontWeight: 600,
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
    width: 260,
    height: 500,
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
    menuUrl: "/dashboard",
  },
  {
    menuIdx: 2,
    menuTitle: "Task Management",
    menuUrl: "/tasks",
  },
  {
    menuIdx: 3,
    menuTitle: "Open Space",
    menuUrl: "/open",
  },
  {
    menuIdx: 4,
    menuTitle: "My Page",
    menuUrl: "/mypage",
  },
];

export default function SideMenu(props) {
  const router = useRouter();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const onSelectMenu = (idx, url) => {
    document.getElementById("menu-sound").play();
    setSelectedIdx(idx);
    router.push(url);
  };

  useEffect(() => {
    let openMenu =
      selectedIdx !== 0
        ? menuItems.filter((elm) => elm.menuIdx === selectedIdx)[0]
        : null;

    if (openMenu === null || openMenu.menuUrl !== router.asPath) {
      openMenu = menuItems.filter((elm) => elm.menuUrl === router.asPath)[0];
      setSelectedIdx(openMenu.menuIdx);
    } else {
      setSelectedIdx(1);
    }
  }, []);

  return (
    <Box sx={useStyles.menuPanel}>
      <div className="menuLogo">
        <Image
          src="/feli_icon_white.png"
          width={60}
          height={60}
          alt="felicity_logo"
        />
        <div>
          <h1>FELICITY</h1>
          <h3>Work Planner</h3>
        </div>
      </div>

      <div className="menuList">
        {menuItems.map((item) => (
          <Button
            key={item.menuTitle}
            sx={[
              useStyles.menuButton,
              selectedIdx === item.menuIdx ? useStyles.selectedBtn : null,
            ]}
            disableRipple
            onClick={() => onSelectMenu(item.menuIdx, item.menuUrl)}
          >
            {item.menuTitle}
          </Button>
        ))}
      </div>
      <audio id="menu-sound" controls style={{ display: "none" }}>
        <source src="/audio/menu_single_click.mp3" type="audio/mpeg" />
      </audio>
      <Box sx={useStyles.plantImg} />
    </Box>
  );
}
