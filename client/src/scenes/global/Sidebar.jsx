import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                background: "Yellow !important",
                },
                "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar >
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                        margin: "10px 0 20px 0",
                        color: "grey",
                        }}
                    >
                        {!isCollapsed && (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="15px"
                        >
                            <Typography  color="blue">
                            ADMIN
                            </Typography>
                            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                            <MenuOutlinedIcon />
                            </IconButton>
                        </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                            alt="profile-user"
                            width="100px"
                            height="100px"
                            src={`https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp`}
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                            />
                        </Box>
                            <Box textAlign="center">
                                <Typography
                                // variant="h2"
                                color="grey"
                                fontWeight="bold"
                                sx={{ m: "10px 0 0 0" }}
                                >
                                Miha Zamorski
                                </Typography>
                                <Typography 
                                 color="green">
                                Admin
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                        title="Dashboard"
                        to="/admin"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />

                        <Typography
                        // variant="h6"
                        color="grey"
                        sx={{ m: "15px 0 5px 20px" }}
                        >
                        Data
                        </Typography>
                        <Item
                        title="Users"
                        to="/admin/users"
                        icon={<PeopleOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Add user"
                        to="/admin/users/add"
                        icon={<PersonAddAltIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <hr style={{ margin: "5px 20px" }} />
                        <Item
                        title="Orders"
                        to="/admin/orders"
                        icon={<ShoppingCartIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Add order"
                        to="/admin/orders/add"
                        icon={<AddShoppingCartIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Add photos"
                        to="/admin/cphotos/add"
                        icon={<AddPhotoAlternateIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />

                        <Typography
                        // variant="h6"
                        color="grey"
                        sx={{ m: "15px 0 5px 20px" }}
                        >
                        Pages
                        </Typography>
                        <Item
                        title="Profile Form"
                        to="/form"
                        icon={<PersonOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Calendar"
                        to="/calendar"
                        icon={<CalendarTodayOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="FAQ Page"
                        to="/faq"
                        icon={<HelpOutlineOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />

                        <Typography
                        // variant="h6"
                        color="grey"
                        sx={{ m: "15px 0 5px 20px" }}
                        >
                        Charts
                        </Typography>
                        <Item
                        title="Bar Chart"
                        to="/bar"
                        icon={<BarChartOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Pie Chart"
                        to="/pie"
                        icon={<PieChartOutlineOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Line Chart"
                        to="/line"
                        icon={<TimelineOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Geography Chart"
                        to="/geography"
                        icon={<MapOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
}

const Item = ({ title, to, icon, selected, setSelected }) => {

    return (
      <MenuItem
        active={selected === title}
        style={{
          color: "grey",
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

export default Sidebar;