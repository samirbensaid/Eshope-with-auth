import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Products() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/products");
    setData(response.data);
  };

  const Delete = async (x) => {
    await axios.delete(`http://localhost:3000/products/${x}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="relative  sm:rounded-lg ">
      <div className="flex items-center justify-between  dark:bg-gray-900">
        <div className="w-[100%]">
          <h1
            className="m-5 font-bold text-xl underline"
            style={{ color: "#0F4C75" }}
          >
            List products
          </h1>
          <div className="text-right mb-5 ">
            <Link
              to="/dashboard/addarticle"
              className="border font-bold bg-[#3C4B64] text-white p-3 rounded-full text-right"
            >
              ADD ARTICLE
            </Link>
          </div>
          <table className=" shadow-md w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-lg text-white uppercase bg-[#3C4B64] underline dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  image url
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {data.map((article, index) => {
              return (
                <tbody key={index}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="text-center">
                      <img className="max-w-[50px]" src={article.url} alt="" />
                    </td>
                    <td>
                      <div className="pl-3 underline font-bold ">{article.id}</div>
                    </td>
                    <td
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="pl-3">
                        <div className="text-base font-semibold flex">
                          {article.title.substr(0, 50)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{article.thumbnailUrl}</td>

                    <td className="px-6 py-4 flex gap-6">
                      <Link to={"/dashboard/editarticle/" + article.id}>
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => {
                          Delete(article.id);
                        }}
                        className="hover:underline font-medium text-red-600"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}
