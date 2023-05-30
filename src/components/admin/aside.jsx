import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";
import axios from "axios";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
//import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Typography from "@mui/joy/Typography";

export default function Aside() {
  const [open, setOpen] = useState(false);

  const logout = async () => {
    let token = JSON.parse(window.localStorage.getItem("token"));
    console.log(token);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      "https://reals-api-staging.ewm.dev/api/logout",
      null,
      config
    );

    window.location.href = "/signin";
    console.log(response.data);
  };

  return (
    <aside
      id="logo-sidebar"
      className=" fixed top-0 left-0 z-50 w-64 h-screen transition-transform -translate-x-full bg-[#3C4B64] border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="bg-slate-700">
        <Link to="/" className="flex items-center justify-center py-4 gap-4">
          <DashboardIcon className="text-white"></DashboardIcon>
          <span className=" self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
            Home
          </span>
        </Link>
      </div>
      <div className="h-full  pt-20 px-3 pb-4 overflow-y-auto bg-[#3C4B64] dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3 text-white text-2xl">Dashboard</span>
            </a>
          </li>

          <li>
            <Link
              to="/dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap text-white text-lg">
                Users
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/products"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap text-white text-lg">
                Products
              </span>
            </Link>
          </li>

          <li>
            <Link
              onClick={() => setOpen(true)}
              className="text-red-500 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-red-500  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-lg flex-1 ml-3 whitespace-nowrap underline">
                Logout
              </span>
            </Link>
           
          </li>
        </ul>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<WarningRoundedIcon />}
          >
            Confirmation
          </Typography>
          <Divider />
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
          >
            Are you sure you want to disconnect?
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "flex-end",
              pt: 2,
            }}
          >
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="solid" color="danger" onClick={logout}>
              Disconnect
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </aside>
  );
}
