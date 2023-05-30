import { Navigate, Outlet } from "react-router-dom";
import Aside from "./admin/aside";
import Header from "./admin/header";

import useAuth from "./zustand/useAuth";

export default function PrivateRoute() {
  const { user } = useAuth();

  //   console.log(user);
  //   if (user.token == undefined) {
  //     return <Navigate to="/signin" />;
  //   }
  //   if (user.roles[0] != "ROLE_ADMIN") {
  //     return <Navigate to="/" />;
  //   }

  return (
    <>
      <Header />
      <Aside />
      <div className="p-4 sm:ml-64 bg-[#EBEDEF] ">
        <div className="w-[80%] min-h-[100vh] m-auto p-4  rounded-lg  mt-14">
          <Outlet />
        </div>
      </div>
    </>
  );
}
