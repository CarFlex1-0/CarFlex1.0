import React, { useState } from "react";
import { VscTriangleRight } from "react-icons/vsc";
import {
  MdOutlineDashboard,
  MdOutlineDirectionsCar,
  MdOutlinePayments,
  MdOutlineFeedback,
  MdOutlineAccountCircle,
  MdBuildCircle,
} from "react-icons/md";
import { BiTrip } from "react-icons/bi";
import {
  FaChevronDown,
  FaSignOutAlt,
  FaAngleRight,
  FaRegNewspaper,
  FaRegComments,
} from "react-icons/fa";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

import { BsWrenchAdjustable } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/auth_context";
import { toast, Slide } from "react-toastify";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SideBar() {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const { drawerState, setDrawerState, logout } = useAuth();
  const navigate = useNavigate();
  const [accordionOpen, setAccordionOpen] = useState(0);

  const handleAccordionOpen = (value) => {
    setAccordionOpen(accordionOpen === value ? 0 : value);
  };

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
        className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white z-10 flex flex-col h-full"
        overlay={false}
      >
        <div className="flex items-center justify-between p-4 pb-1">
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

        <div className="flex flex-col h-full">
          <List className="flex-grow">
            <Link
              to="dashboard"
              onClick={() => {
                closeDrawer();
                setDrawerState(false);
              }}
            >
              <ListItem className="text-lg">
                <ListItemPrefix className="me-3">
                  <MdOutlineDashboard className="h-5 w-5" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </Link>

            <Link
              to="profile-page"
              onClick={() => {
                closeDrawer();
                setDrawerState(false);
              }}
            >
              <ListItem className="text-lg">
                <ListItemPrefix className="me-3">
                  <MdOutlineAccountCircle className="h-5 w-5" />
                </ListItemPrefix>
                My Profile
              </ListItem>
            </Link>

            <Accordion
              open={accordionOpen === 3} // Use a new number for this accordion
              icon={
                <FaChevronDown
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    accordionOpen === 3 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={accordionOpen === 3}>
                <AccordionHeader
                  onClick={() => handleAccordionOpen(3)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <MdOutlineDirectionsCar className="h-5 w-5 me-3" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Customize Your Car
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 text-white">
                  <Link
                    to="models"
                    onClick={() => {
                      closeDrawer();
                      setDrawerState(false);
                    }}
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <FaAngleRight strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Car Models
                    </ListItem>
                  </Link>

                  <Link
                    to="models/ratings"
                    onClick={() => {
                      closeDrawer();
                      setDrawerState(false);
                    }}
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <FaAngleRight strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      View Ratings
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>

            <Link
              to="travel-planner"
              onClick={() => {
                closeDrawer();
                setDrawerState(false);
              }}
            >
              <ListItem className="text-lg">
                <ListItemPrefix className="me-3">
                  <BiTrip className="h-5 w-5" />
                </ListItemPrefix>
                Plan Your Journey
              </ListItem>
            </Link>
            {/* Blogs Dropdown */}
            <Accordion
              open={accordionOpen === 1} // Separate state for Accordion
              icon={
                <FaChevronDown
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    accordionOpen === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={accordionOpen === 1}>
                <AccordionHeader
                  onClick={() => handleAccordionOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <FaRegNewspaper className="h-5 w-5 me-3" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Blogs
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 text-white">
                  <Link
                    to="blog-dashboard"
                    onClick={() => {
                      closeDrawer();
                      setDrawerState(false);
                    }}
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <FaAngleRight strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      View All Blogs
                    </ListItem>
                  </Link>

                  <Link
                    to="blog-create"
                    onClick={() => {
                      closeDrawer();
                      setDrawerState(false);
                    }}
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <FaAngleRight strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Create Blogs
                    </ListItem>
                  </Link>
                  <Link
                    to="blog-actions-dashboard"
                    onClick={() => {
                      closeDrawer();
                      setDrawerState(false);
                    }}
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <FaAngleRight strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      My Blogs
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>

            <Link
              to="forum-page"
              onClick={() => {
                closeDrawer();
                setDrawerState(false);
              }}
            >
              <ListItem className="text-lg">
                <ListItemPrefix className="me-3">
                  <FaRegComments className="h-5 w-5" />
                </ListItemPrefix>
                Forums
              </ListItem>
            </Link>

            {/* Marketplace Dropdown */}
            <Accordion
              open={accordionOpen === 2} // Use a different number than blogs accordion
              icon={
                <FaChevronDown
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    accordionOpen === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={accordionOpen === 2}>
                <AccordionHeader
                  onClick={() => handleAccordionOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <HiOutlineWrenchScrewdriver className="h-5 w-5 me-3" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Marketplace
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 text-white">
                  <Link
                    to="buy-parts"
                    onClick={() => {
                      closeDrawer();
                      setDrawerState(false);
                    }}
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <FaAngleRight strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Buy Parts
                    </ListItem>
                  </Link>

                  <Link
                    to="order-details"
                    onClick={() => {
                      closeDrawer();
                      setDrawerState(false);
                    }}
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <FaAngleRight strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Order History
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>

            <Link
              to="subscription"
              onClick={() => {
                closeDrawer();
                setDrawerState(false);
              }}
            >
              <ListItem className="text-lg">
                <ListItemPrefix className="me-3">
                  <MdOutlinePayments className="h-5 w-5" />
                </ListItemPrefix>
                Payments
              </ListItem>
            </Link>

            <Link
              to="feedback"
              onClick={() => {
                closeDrawer();
                setDrawerState(false);
              }}
            >
              <ListItem className="text-lg">
                <ListItemPrefix className="me-3">
                  <MdOutlineFeedback className="h-5 w-5" />
                </ListItemPrefix>
                Leave A Feedback
              </ListItem>
            </Link>
          </List>

          <div className="mt-auto">
            <div className="px-2">
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
