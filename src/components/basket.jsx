import { Alert } from "@mui/material";
import { useState } from "react";
import useBasket from "./zustand/useBasket";
// import { useNavigate } from "react-router-dom";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Typography from "@mui/joy/Typography";
import { toast, Toaster } from "react-hot-toast";
import useMode from "./zustand/useMode";

export default function Basket() {
  const { basket, reset, deleteOne, edit, calculeTotal } = useBasket();

  const { mode } = useMode();

  const [open, setOpen] = useState(false);

  //const [totalPrice, setTotalPrice] = useState(0);

  //   const navigate = useNavigate();

  // const calculeTotal = () => {
  //   let total = 0;
  //   basket.map((article) => {
  //     total = total + parseInt(article.price) * parseInt(article.count);
  //   });
  //   setTotalPrice(total);
  // };
  // useEffect(() => {
  //   calculeTotal();
  // }, []);

  return (
    <div className="h-[70vh]">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {basket.length > 0 ? (
          <div>
            <div className="text-right">
              <Button
                variant="outlined"
                color="danger"
                endDecorator={<DeleteForever />}
                onClick={() => setOpen(true)}
              >
                Discard
              </Button>
            </div>

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
                      reset();
                    }}
                  >
                    Discard notes
                  </Button>
                </Box>
              </ModalDialog>
            </Modal>
            {/* ------------------------ */}

            <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="font-bold text-xl bg-neutral-700 text-white">
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-16 py-3">
                    Qty
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {basket.map((article, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-32 p-4">
                        <img src={article.img} alt="Apple Watch" />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {article.title}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {article.price} $
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                            onClick={() => {
                              let elem = document.querySelector(
                                "#product_" + index
                              );
                              let x = elem.value;
                              x = parseInt(x);
                              if (x > 1) {
                                elem.value = x - 1;
                                edit(index, x - 1);
                              }
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                          <div>
                            <input
                              key={index}
                              onChange={() => {
                                let value = document.querySelector(
                                  "#product_" + index
                                ).value;
                                edit(index, parseInt(value));
                              }}
                              type="text"
                              id={"product_" + index}
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={article.count}
                              required
                            />
                          </div>
                          <button
                            className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                            onClick={() => {
                              let elem = document.querySelector(
                                "#product_" + index
                              );
                              let x = elem.value;
                              x = parseInt(x);
                              elem.value = x + 1;
                              edit(index, x + 1);
                            }}
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            calculeTotal();
                            deleteOne(index);

                            toast.error("Product deleted with succes.", {
                              style: {
                                border: "1px solid red",
                                padding: "30px",
                                color: "red",
                              },
                              iconTheme: {
                                primary: "red",
                                secondary: "#FFFAEE",
                              },
                            });
                          }}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <Alert variant="filled" severity="error">
            List empty — check our website to find what you want !
          </Alert>
        )}
      </div>
      <div className="text-right">
        {mode ? (
          <div className=" font-bold text-2xl text-right mt-5 mr-5 dark:text-white ">
            Total : {calculeTotal()} $
          </div>
        ) : (
          <div className="text-white font-bold text-2xl text-right mt-5 mr-5">
            Total : {calculeTotal()} $
          </div>
        )}
      </div>
    </div>
  );
}
