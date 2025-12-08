import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { useTheme } from "../../../../context/themeContext";
import { CiLight, CiDark } from "react-icons/ci";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
export default function Sidebar({ open, onClose, handelLogOut}) {
  const { theme, toggleTheme } = useTheme();

  const routs = [
    {
      text: "الصفحه الرئيسيه",
      icon: <HomeOutlinedIcon />,
      path: "/home",
    },
    {
      text: "اضافه نقله جديده",
      icon: <OpenInBrowserIcon />,
      path: "add-day",
    },
    {
      text: "جميع النقل",
      icon: <StorefrontIcon />,
      path: "all-days",
    },
  ];

  return (
    <Drawer
     
      variant="persistent"
      anchor="right"
      open={open}
      
      PaperProps={{
        className:
          "bg-white text-black dark:bg-gray-900 dark:text-white w-64 transition-colors duration-300",
      }}
    >
      <div className="flex items-center p-2">
        <IconButton onClick={onClose} className="text-black dark:text-white">
          <ChevronRightIcon />
        </IconButton>
      </div>

      <Divider className="bg-gray-300 dark:bg-gray-700" />

      <List>
        {routs.map((e, index) => (
          <Link key={index} to={e.path}>
            <ListItem
              button
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ListItemIcon className="text-black dark:text-white">
                {e.icon}
              </ListItemIcon>
              <ListItemText primary={e.text} />
            </ListItem>
          </Link>
        ))}
        <li onClick={toggleTheme}>
          <ListItem button className="hover:bg-gray-100 dark:hover:bg-gray-800">
            <ListItemIcon className="text-black dark:text-white text-3xl">
              {theme === "light" ? <CiLight /> : <CiDark />}
            </ListItemIcon>
            <ListItemText primary={theme === "light" ? "الوضع الفاتح" : "الوضع الداكن"} />
          </ListItem>
        </li>
        <li onClick={handelLogOut}>
          <ListItem button className="hover:bg-gray-100  dark:hover:bg-gray-800">
            <ListItemIcon className="text-black dark:text-white text-3xl">
            <ExitToAppIcon className="text-red-500" />
            </ListItemIcon>
            <ListItemText primary={"تسجيل الخروج"}  className="text-red-500"/>
          </ListItem>
        </li>
      </List>

      <Divider className="bg-gray-300 dark:bg-gray-700" />
    </Drawer>
  );
}
