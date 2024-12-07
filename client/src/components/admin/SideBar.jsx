import React from "react";
import { VscTriangleRight } from "react-icons/vsc";
import { 
  MdOutlineDashboard,
  MdOutlineAdminPanelSettings,
  MdOutline3dRotation
} from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/auth_context";
import { toast, Slide } from "react-toastify";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SideBar() {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const { drawerState, setDrawerState, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!", {
      position: "top-left",
      autoClose: 5000,
      theme: "dark",
      transition: Slide,
    });
    navigate("/", { replace: true });
    closeDrawer();
    setDrawerState(false);
  };

  return (
    <React.Fragment>
      <button
        className="fixed left-0 top-1/2 transform -translate-y-1/2 focus:outline-none bg-neutral-900 h-24"
        onClick={() => {
          setDrawerState(true);
          openDrawer();
        }}
      >
        <VscTriangleRight />
      </button>

      <Drawer
        open={open}
        onClose={() => {
          closeDrawer();
          setDrawerState(false);
        }}
        className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white z-10 flex flex-col h-full"
        overlay={false}
      >
        <div className="flex items-center justify-between p-4 pb-1">
          <Typography variant="h5" color="blue-gray">
            <span className="text-white">
              Car<span className="text-red-500 animate-pulse">F</span>lex
            </span>
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <div className="flex flex-col h-full">
          <List className="flex-grow">
            <Link
              to="dashboard"
              onClick={() => {
                closeDrawer();
                setDrawerState(false);
              }}
            >
              <ListItem className="text-base">
                <ListItemPrefix className="me-3">
                  <MdOutlineDashboard className="h-5 w-5" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </Link>

            <Link
              to="users"
              onClick={() => {
                closeDrawer();
                setDrawerState(false);
              }}
            >
              <ListItem className="text-base">
                <ListItemPrefix className="me-3">
                  <MdOutlineAdminPanelSettings className="h-5 w-5" />
                </ListItemPrefix>
                User Administration
              </ListItem>
            </Link>

            <Link
              to="upload-3d-model"
              onClick={() => {
                closeDrawer();
                setDrawerState(false);
              }}
            >
              <ListItem className="text-base">
                <ListItemPrefix className="me-3">
                  <MdOutline3dRotation className="h-5 w-5" />
                </ListItemPrefix>
                Upload 3D Model
              </ListItem>
            </Link>
          </List>

          <div className="mt-auto">
            <div className="px-4">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-50 mb-4" />
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                  bg-gradient-to-r from-gray-800/50 to-indigo-900/50
                  hover:from-red-500/20 hover:to-red-600/20
                  text-gray-300 hover:text-red-400 transition-all duration-200
                  shadow-sm hover:shadow-md transform hover:-translate-y-0.5
                  mb-2"
              >
                <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-red-500/20">
                  <FaSignOutAlt className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium">Logout</span>
                  <span className="text-xs text-gray-400/80 group-hover:text-red-400/80">
                    Sign out of your account
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
