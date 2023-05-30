// import Data from "../data.json";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import SearchIcon from "@mui/icons-material/Search";

import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { IconButton, InputBase, Paper } from "@mui/material";
// import useAuth from "./zustand/useAuth";
export default function Home() {
  // const { user } = useAuth();

  const [data, setData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/products");
    setData(response.data);
    setFiltredData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const search = (event) => {
    let word = event.target.value;
    let test = data.filter((item) =>
      item.title.toLowerCase().includes(word.toLowerCase())
    );
    setFiltredData(test);
  };

  return (
    <>
      {/* ---search bar---- */}

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "30%",
          m: "auto",
          mt: "2%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search products"
          inputProps={{ "aria-label": "Search products" }}
          onChange={(e) => {
            search(e);
            // search(e);
          }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* -------------------- */}
      <div className="flex justify-between flex-wrap">
        {filtredData.map((article, index) => {
          return (
            <Card className="w-[30%] mt-20" key={index}>
              <CardMedia
                sx={{ height: 260 }}
                image={article.url}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  tenetur veniam ad minus at iusto, sapiente commodi molestiae.
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  to={"/article/details/" + article.id}
                  size="small"
                  className="font-bold border p-2 bg-orange-300                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 rounded-full"
                >
                  Learn More
                </Link>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </>
  );
}
