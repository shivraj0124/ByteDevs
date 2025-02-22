import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <div className="font-bold text-center">
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<LandingPage />}></Route> */}
            <Route path="/login" element={<Login />}></Route>
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
