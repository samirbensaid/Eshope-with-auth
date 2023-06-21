import { Link } from "react-router-dom";
import useBasket from "./zustand/useBasket";
import useAuth from "./zustand/useAuth";
import useMode from "./zustand/useMode";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Header() {
  const { user, removeUser,setUser } = useAuth();
  const { mode, setMode } = useMode();
  const { basket } = useBasket();







  const logout = async () => {
    refreshToken();
    let userData = JSON.parse(window.localStorage.getItem("user"));
    console.log(userData);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const response = await axios.post(
      "https://reals-api-staging.ewm.dev/api/logout",
      null,
      config
    );
    removeUser();
    window.location.href = "/signin";
    console.log(response.data);
  };
 
  if (!mode) {
    document.body.style.background = "black";
  } else {
    document.body.style.background = "white";
  }

  return (
    <nav className="  ">
      <IconButton sx={{ ml: 1 }} onClick={setMode} color="inherit">
        {mode === true ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto text-xl"
          id="navbar-default"
        >
          <ul className="font-medium flex gap-1 flex-col p-4 md:p-4 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8  md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li >
              <Link
               
                to="/"
                className="navActive block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                //
                to="basket"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Basket ({basket.length})
              </Link>
            </li>
            {user.name ? null : (
              <li >
                <Link
                  to="/signup"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sign up
                </Link>
              </li>
            )}
            {user.name ? null : (
              <li >
                <Link
                  to="/signin"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sign in
                </Link>
              </li>
            )}
            {user.roles && user.roles[0] === "ROLE_ADMIN" && (
              <li >
                <Link
                  to="/dashboard"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Dashboard
                </Link>
              </li>
            )}

            <li >
              <Link
                to="/availabilities"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Availabilities
              </Link>
            </li>
            {user.name && (
              <li>
                <Button onClick={logout} variant="outlined" color="error">
                  LOGOUT
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
