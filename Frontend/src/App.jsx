import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";

import Table from "./components/DashBoard/table";
import AddEvent from "./components/DashBoard/AddEvent";
import DashBoard from "./components/DashBoard/DashBoardLayout";
import Main from "./components/DashBoard/Main_page";

import ComedianDashBoard from "./components/ComedianDash/VenueDashBoard";
import ComedianMain from "./components/ComedianDash/ComedianMain";
import ComedianTable from "./components/ComedianDash/ComedianTable";
import AddVenue from "./components/ComedianDash/AddVenue";

function App() {
  return (
    <>
      <div className="font-bold text-center">
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<LandingPage />}></Route> */}
            <Route path="/login" element={<Login />}></Route>
            {/* <Route path="/comedian" element={<ComedianDashboard />}></Route>
            <Route path="/table" element={<Table/>}></Route>
            <Route path="/AddEvent" element={<AddEvent/>}></Route> */}
            <Route path="/DashBoard_Lay" element={<DashBoard />}>
              <Route index element={<Main />} />
              <Route path={"table"} element={<Table />} />
              <Route path={"AddEvent"} element={<AddVenue />} />
              
            </Route>

            <Route path="/ComedianDashBoard_Lay" element={<ComedianDashBoard />}>
              <Route index element={<ComedianMain />} />
              <Route path={"ComedianTable"} element={<ComedianTable />} />
              <Route path={"AddVenue"} element={<AddEvent />} />
             
            </Route>

            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
