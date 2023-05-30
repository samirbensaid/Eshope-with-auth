import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function EditArticle() {
  const { register, handleSubmit, setValue } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3000/products/${id}`);

    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setValue("title", data.title);
    setValue("img", data.url);
    setValue("description", data.description);
  }, [data]);

  const onSubmit = async (formData) => {
    let newProduct = {
      albumId: 1,
      title: formData.title,
      url: formData.img,
      description: formData.description,
      thumbnailUrl: formData.img,
    };
    try {
      await axios.patch("http://localhost:3000/products/" + id, newProduct);

      navigate("/dashboard/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="font-bold underline mb-4">Edit product</h1>
      <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title Article
        </label>
        <input
          //defaultValue={data.title}
          type="text"
          id="small-input"
          // name="title"
          {...register("title")}
          className="block w-full p-2 mb-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          URL Image
        </label>
        <input
          //defaultValue={data.url}
          type="text"
          id="small-input"
          // name="img"
          {...register("img")}
          className="block w-full p-2 mb-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          //defaultValue={data.description}
          id="message"
          rows="4"
          // name="description"
          {...register("description")}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>

        <div className=" mt-5 text-center">
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ fontWeight: "700" }}
          >
            SAVE
          </Button>
        </div>
      </form>
    </div>
  );
}
