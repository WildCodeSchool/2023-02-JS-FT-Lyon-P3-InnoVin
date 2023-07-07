import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Presentation from "./pages/Presentation";
import Login from "./pages/Login";
import Inscription from "./pages/Inscription";
import Admin from "./pages/Admin";
import Degustation from "./pages/Degustation";
import "react-toastify/dist/ReactToastify.css";
import TastingSheet from "./pages/TastingSheet";
import Recipe from "./pages/Recipe";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Presentation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Inscription />} />
        <Route path="/admin/users" element={<Admin />} />
        <Route path="/admin/wines" element={<Admin />} />
        <Route path="/admin/grapes" element={<Admin />} />
        <Route path="/admin/sessions" element={<Admin />} />
        <Route path="/tasting" element={<Degustation />}>
          <Route path="tastingsheet" element={<TastingSheet />} />
        </Route>
        <Route path="recipe" element={<Recipe />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
