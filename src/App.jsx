import "./App.css";
import "./index.css";

import Main from "./components/main";
import Home from "./components/home";
import { Route, Routes } from "react-router-dom";
import ArticleDetails from "./components/articleDetails";

import User from "./components/admin/user";
import Products from "./components/admin/products";
import Basket from "./components/basket";
import AddArticle from "./components/admin/addArticle";
import EditArticle from "./components/admin/editArticle";
import SignUp from "./components/admin/signUp";
import SignIn from "./components/admin/signIn";
import PrivateRoute from "./components/privateRoute";
import Availabilities from "./components/admin/availabilities";


function App() {

  const routes = [
    {
      name: "/",
      path: <Home />,
    },
    {
      name: "/basket",
      path: <Basket />,
    },
    {
      name: "/article/details/:id",
      path: <ArticleDetails />,
    },
    {
      name: "/signup",
      path: <SignUp />,
    },
    {
      name: "/signin",
      path: <SignIn />,
    },
    {
      name: "/availabilities",
      path: <Availabilities />,
    },
    {
      name: "*",
      path: <Home />,
    },
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          {routes.map((component, index) => {
            return (
              <Route
                path={component.name}
                key={index}
                element={component.path}
              />
            );
          })}
        </Route>

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<User />} />
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/editarticle/:id" element={<EditArticle />} />
          <Route path="/dashboard/addarticle" element={<AddArticle />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
