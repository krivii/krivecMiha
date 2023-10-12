import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CategoryIcon from '@mui/icons-material/Category';
import AddHomeIcon from '@mui/icons-material/AddHome';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';

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
                <Box
                textAlign="center"
                sx={{
                    m: "10px  20px ", // Added a bottom margin of 20px
                    border: "2px solid #ccc", // Added a border with a light gray color
                    padding: "20px", // Added some padding for spacing
                    borderRadius: "8px", // Added rounded corners for a modern look
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Added a box shadow for depth
                }}
                >
                <Typography
                    color="grey"
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                >
                    Miha Zamorski
                </Typography>
                <Typography color="green">Admin</Typography>
                </Box>
                   
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                        title="Dashboard"
                        to="/admin"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />

                        <Typography
                        variant="h6"
                        color="grey"
                        sx={{ m: "15px 0 5px 20px" }}
                        >
                        Clients
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
                        {/* <hr style={{ margin: "5px 20px" }} /> */}
                        <Item
                        title="Add photos"
                        to="/admin/cphotos/add"
                        icon={<AddPhotoAlternateIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />

                        <Typography
                        variant="h6"
                        color="grey"
                        sx={{ m: "15px 0 5px 20px" }}
                        >
                        Views
                        </Typography>
                        <Item
                        title="Categories"
                        to="/admin/categories"
                        icon={<CategoryIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Add category"
                        to="/admin/categories/add"
                        icon={<AddHomeIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <hr style={{ margin: "5px 20px" }} />
                        <Item
                        title="Page images"
                        to="/admin/pphotos"
                        icon={<PhotoIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="Videos"
                        to="/admin/videos"
                        icon={<VideoCameraBackIcon />}
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