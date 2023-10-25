import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CategoryIcon from '@mui/icons-material/Category';
import AddHomeIcon from '@mui/icons-material/AddHome';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import {useAuthContext} from '../../hooks/useAuthContext'   

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const {user} = useAuthContext();

    

    return (
        <Box
            sx={{

                "& .pro-sidebar-inner": {
                background: "#800080  !important"
                },
                "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                padding: "1px 35px 1px 20px !important",
                },
                "& .pro-inner-item:hover": {
                color: "#AAAAAA  !important",
                },
                "& .pro-menu-item.active": {
                color: "#AAAAAA  !important",
                },
            }}
        >
            <ProSidebar >
                <Menu iconShape="square">
                <Box
                textAlign="center"
                sx={{
                    m: "10px  20px ", 
                    border: "2px solid #ccc", 
                    padding: "10px", 
                    borderRadius: "8px", 
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
                }}
                >
                <Typography
                    color="#FFFFFF"
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                >
                    {user.name}
                </Typography>
                <Typography  color="#FBF014">Admin</Typography>
                </Box>
                   
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {/* <Item
                        title="Dashboard"
                        to="/admin"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        /> */}

                        <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#FFFFFF"
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
                        <hr style={{ margin: "5px  50px  5px 10px" }} />
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
                        fontWeight="bold"
                        color="#FFFFFF"
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
                        <Item
                        title="Videos"
                        to="/admin/videos"
                        icon={<VideoCameraBackIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#FFFFFF"
                        sx={{ m: "15px 0 5px 20px" }}
                        >
                        Static pages
                        </Typography>

                        <Item
                        title="Page images"
                        to="/admin/pphotos"
                        icon={<PhotoIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />
                        <Item
                        title="FAQs"
                        to="/admin/faq"
                        icon={<HelpOutlineOutlinedIcon />}
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
          color: "#FFFFFF",
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