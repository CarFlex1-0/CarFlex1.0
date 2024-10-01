import React from "react";
import { VscTriangleRight } from "react-icons/vsc";
import { MdOutline3dRotation } from "react-icons/md";
import { BiTrip } from "react-icons/bi";
import { RiQuestionnaireFill } from "react-icons/ri";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAuth } from "@contexts/auth_context";
export function SideBar() {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const { drawerState, setDrawerState } = useAuth();
  return (
    <React.Fragment>
      <button
        className="fixed left-0 top-1/2 transform -translate-y-1/2 focus:outline-none bg-neutral-950 glass h-24 z-10 rounded-lg"
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
        className="bg-gradient-to-r from-blue-900  to-indigo-950 text-white z-10"
        // className={open ? "bg-indigo-900 text-white z-10" : ""}
        overlay={false}
      >
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography color="white" variant="h5">
            <div className="flex items-center space-x-2">
              <span className="text-2xl text-indigo-200">
                Car<span className="text-red-600">F</span>lex
              </span>
              {/* <span className="text-2xl text-indigo-500">{title}</span> */}
            </div>
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

        <List>
          <Link
            to="dashboard"
            onClick={() => {
              closeDrawer();
              setDrawerState(false);
            }}
          >
            <ListItem className="text-lg">
              <ListItemPrefix className="me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                    clipRule="evenodd"
                  />
                </svg>
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
            <ListItem className="text-lg">
              <ListItemPrefix className="me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </ListItemPrefix>
              User Administartion
            </ListItem>
          </Link>

          <Link
            to="upload-3d-model"
            onClick={() => {
              closeDrawer();
              setDrawerState(false);
            }}
          >
            <ListItem className="text-lg">
              <ListItemPrefix className="me-3">
                <MdOutline3dRotation />
              </ListItemPrefix>
              Upload 3D Model
            </ListItem>
          </Link>

          <Link
            to="car-enhancements"
            onClick={() => {
              closeDrawer();
              setDrawerState(false);
            }}
          >
            <ListItem className="text-lg">
              <ListItemPrefix className="me-3">
                <BiTrip />
              </ListItemPrefix>
              Plan Your Journey
            </ListItem>
          </Link>

          <Link
            to="forum"
            onClick={() => {
              closeDrawer();
              setDrawerState(false);
            }}
          >
            <ListItem className="text-lg">
              <ListItemPrefix className="me-3">
                <RiQuestionnaireFill />
              </ListItemPrefix>
              Forums
            </ListItem>
          </Link>
        </List>

        <Button className="mt-3 ml-5 bg-slate-400" size="sm">
          Logout
        </Button>
      </Drawer>
    </React.Fragment>
  );
}
