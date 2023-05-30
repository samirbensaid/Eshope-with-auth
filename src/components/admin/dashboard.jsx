
import { Outlet } from "react-router-dom";

import Aside from "./aside";
import Header from "./header";

export default function Dashboard() {
  
  return (
    <div>
      <Header />
      <Aside />

      <div className="p-4 sm:ml-64 bg-[#EBEDEF] ">
        <div className="w-[80%] min-h-[100vh] m-auto p-4  rounded-lg  mt-14">
        
          <Outlet />
        </div>
      </div>
    </div>
  );
}
