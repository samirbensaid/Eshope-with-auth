import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Box from "@mui/joy/Box";

import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

export default function Products() {
  const [open, setOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(0);

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
      {/* ------------------------ */}
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
            Are you sure you want to discard all of your notes?
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
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                Delete(deleteIndex);
                setOpen(false);
              }}
            >
              Discard notes
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
      {/* ------------------------ */}
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
                  price
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
                      <div className="pl-3 underline font-bold ">
                        {article.id}
                      </div>
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
                    <td className="px-6 py-4 font-bold">{article.price} $</td>

                    <td className="px-6 py-4 flex gap-6">
                      <Link to={"/dashboard/editarticle/" + article.id}>
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => {
                          setOpen(true);
                          setDeleteIndex(article.id);
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
