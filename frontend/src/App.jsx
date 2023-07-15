import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Presentation from "./pages/Presentation";
import Login from "./pages/Login";
import Inscription from "./pages/Inscription";
import Admin from "./pages/Admin";
import Tasting from "./pages/Tasting";
import "react-toastify/dist/ReactToastify.css";
import TastingSheet from "./pages/TastingSheet";
import TastingProfile from "./pages/TastingProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Presentation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Inscription />} />
        <Route path="/tasting" element={<Outlet />}>
          <Route index element={<Tasting />} />
          <Route path="tastingsheet" element={<TastingSheet />} />
          <Route path="tastingprofile" element={<TastingProfile />} />
        </Route>
        <Route path="/admin/users" element={<Admin />} />
        <Route path="/admin/wines" element={<Admin />} />
        <Route path="/admin/sessions" element={<Admin />} />
        <Route path="/admin/recipes" element={<Admin />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
