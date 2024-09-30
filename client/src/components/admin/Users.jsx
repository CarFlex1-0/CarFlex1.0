import React, {useState, useEffect} from "react";
import {  UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,

} from "@material-tailwind/react";
import DashboardHeader from "./DashboardHeader";
import Footer from "./Footer";
import { useAuth } from "@contexts/auth_context";
const TABLE_HEAD = ["Username", "Email", "Joined", "Status"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    online: false,
    date: "04/10/21",
  },
];

export default function Users() {
   const [users, setUsers] = useState(TABLE_ROWS);
  useEffect(() => {
  //  console.log(users)
  }, [users])
  const { drawerState } = useAuth();
   // Handle toggle change
   const handleToggle = (index) => {
     const updatedUsers = [...users];
     updatedUsers[index].online = !updatedUsers[index].online;
     setUsers(updatedUsers);
   };
  return (
    <div className={drawerState ? "blur bg-blue-950" : ""}>
      <DashboardHeader title={"User Administration"} />
      <Card className="backdrop-blur-md bg-white/10 rounded-lg shadow-lg p-4 m-28">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none p-6 text-white"
          color="transparent"
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Typography variant="h5" className="mb-1">
                Members List
              </Typography>
              <Typography className="font-normal">
                See information about all carflex users
              </Typography>
            </div>
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="flex items-center gap-2 rounded-md px-4 py-2 glass text-slate-700"
              >
                <UserPlusIcon className="h-5 w-5" />
                View Active Members
              </Button>
              <div className="relative">
                <label className="input input-bordered flex items-center gap-2 w-64 h-10 bg-[#3f3f46]  shadow-lg">
                  <input type="text" className="grow" placeholder="Search" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody className="overflow-auto p-0">
          <table className="min-w-full text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 p-4">
                    <Typography
                      variant="h6"
                      color="white"
                      className="font-normal"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ img, name, email, online, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={`${classes} text-white`}>
                      <div className="flex items-center gap-3 text-white">
                        <Avatar
                          src={img}
                          alt={name}
                          className="h-12 w-12 rounded-full"
                          variant="rounded"
                        />
                        <div className="flex flex-col">
                          <Typography variant="small" className="font-normal">
                            {name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={`${classes} text-white`}>
                      <Typography
                        variant="small"
                        className="font-normal text-slate-300"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={`${classes} text-white`}>
                      <Typography variant="small" className="font-normal">
                        {date}
                      </Typography>
                    </td>
                    <td className={`${classes} text-white`}>
                      <input
                        type="checkbox"
                        className="toggle toggle-success"
                        checked={online}
                        onChange={() => handleToggle(index)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t p-4">
          <Typography variant="small" color="white" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex items-center gap-2 rounded-md px-4 py-2 glass text-slate-700"
            >
              Previous
            </Button>
            <Button
              size="sm"
              className="flex items-center gap-2 rounded-md px-4 py-2 glass text-slate-700"
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Footer />
    </div>
  );
}
