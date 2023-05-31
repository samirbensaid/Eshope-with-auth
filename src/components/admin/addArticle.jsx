import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AddArticle() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    let newProduct = {
      albumId: 1,
      title: data.title,
      url: data.img,
      description: data.description,
      thumbnailUrl: data.img,
      price:data.price
    };
    try {
      await axios.post("http://localhost:3000/products", newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="underline font-bold mb-4">Add product </h1>
      <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title Article
        </label>
        <input
          type="text"
          id="small-input"
          //name="title"
          {...register("title")}
          className="block w-full p-2 mb-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

          <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Price
        </label>
        <input
        placeholder="0"
          type="number"
          id="small-input"
          //name="title"
          {...register("price")} 
          className="block w-full p-2 mb-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          URL Image
        </label>
        <input
          type="text"
          id="small-input"
          //name="img"
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
          id="message"
          rows="4"
          //name="description"
          {...register("description")}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>

        <div className=" mt-5 text-center hover:text-red-700">
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ fontWeight: "700" }}
          >
            Validation
          </Button>
          <Button
            variant="contained"
            color="error"
            type="reset"
            sx={{ fontWeight: "700" }}
          >
            ANNULER
          </Button>
         
        </div>
      </form>
    </div>
  );
}
