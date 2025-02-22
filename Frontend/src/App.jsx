import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div className="font-bold text-center">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          
          <Route path="/Signup" element={<Signup />}></Route>
          
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
