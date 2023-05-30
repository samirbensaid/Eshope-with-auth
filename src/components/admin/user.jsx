import axios from "axios";
import { useEffect, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function User() {
  const [data, setData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/users");
    setData(response.data);
    setFiltredData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const search = (event) => {
    let word = event.target.value;
    let test = data.filter((item) =>
      item.name.toLowerCase().includes(word.toLowerCase())
    );

    setFiltredData(test);
  };

  const Promote = async (id) => {
    try {
      await axios.patch("http://localhost:3000/users/" + id, {
        role: ["admin"],
      });
      fetchData();

      // try{
      //  await axios.patch("http://localhost:3000/users/"+id,{
      //   role:["admin"]
      //  })
      //  fetchData()
      // }
      
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {}, [data]);

  return (
    <div className="relative  sm:rounded-lg">
      <h1 className=" font-bold text-xl underline" style={{ color: "#0F4C75" }}>
        List Users
      </h1>

      {/* ---search bar---- */}

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "30%",
          m: "auto",
          mb: "2%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search user"
          inputProps={{ "aria-label": "search user" }}
          onChange={(e) => {
            search(e);
          }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <table className="shadow-md w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-white uppercase bg-[#0F4C75] underline dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        {filtredData.map((article, index) => {
          return (
            <tbody key={index}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="pl-3">
                    <div className="text-base font-semibold flex">
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-[#9ca035]  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
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
                      {article.name}
                    </div>
                    <div className="font-normal text-gray-500">
                      {article.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{article.phone}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {article.role[0] == "admin" ? (
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                    ) : (
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                    )}

                    {article.role[0]}
                  </div>
                </td>
                <td className="px-6 py-4 flex gap-6">
                  <Link
                    onClick={() => Promote(article.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Promote to Admin
                  </Link>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
