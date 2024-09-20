import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupIcon from "@mui/icons-material/Group";
import HotelIcon from "@mui/icons-material/Hotel";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../../appStore";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: { open: true },
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: { open: false },
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const open = useAppStore((state) => state.dopen);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Guest", icon: <PersonPinIcon />, path: "/guest" },
    { text: "Bookings", icon: <EventNoteIcon />, path: "/bookings" },
    { text: "My Staff", icon: <GroupIcon />, path: "/staff" },
    { text: "Rooms", icon: <HotelIcon />, path: "/rooms" },
    { text: "Rating", icon: <StarIcon />, path: "/rating" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block", mb: 1 }} // Added bottom margin for spacing
            >
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    transition: "background-color 0.3s, transform 0.3s",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                      transform: "scale(1.05)", // Slight zoom on hover
                    },
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                  location.pathname === item.path
                    ? {
                        backgroundColor: theme.palette.action.selected,
                        color: theme.palette.primary.main,
                      }
                    : {},
                ]}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                      color: theme.palette.text.primary,
                      transition: "color 0.3s, transform 0.3s",
                      fontSize: 28, // Increased icon size
                      "&:hover": {
                        color: theme.palette.primary.main,
                        transform: "scale(1.2)", // Increase icon size on hover
                      },
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={[
                    {
                      fontWeight: "bold", // Make text bold
                      fontSize: 16, // Increased text size
                      transition: "color 0.3s, opacity 0.3s",
                      color: theme.palette.text.primary,
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    },
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block", mb: 1 }} // Added bottom margin for spacing
          >
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                  transition: "background-color 0.3s, transform 0.3s",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    transform: "scale(1.05)",
                  },
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
                location.pathname === "/profile"
                  ? {
                      backgroundColor: theme.palette.action.selected,
                      color: theme.palette.primary.main,
                    }
                  : {},
              ]}
              onClick={() => navigate("/profile")}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                    color: theme.palette.text.primary,
                    transition: "color 0.3s, transform 0.3s",
                    fontSize: 28, // Increased icon size
                    "&:hover": {
                      color: theme.palette.primary.main,
                      transform: "scale(1.2)",
                    },
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                <PersonPinIcon />
              </ListItemIcon>
              <ListItemText
                primary="My Profile"
                sx={[
                  {
                    fontWeight: "bold", // Make text bold
                    fontSize: 16, // Increased text size
                    transition: "color 0.3s, opacity 0.3s",
                    color: theme.palette.text.primary,
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  },
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}

export default Sidebar;
