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
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/article/details/:id" element={<ArticleDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/availabilities" element={<Availabilities />} />
          
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
