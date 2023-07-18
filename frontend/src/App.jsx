import { Route, Routes } from "react-router-dom";
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
import Recipe from "./pages/Recipe";
import RequiredAuth from "./components/RequiredAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* --- Routes publiques --- */}
        <Route path="/" element={<Presentation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Inscription />} />
        {/* --- Routes User --- */}
        <Route
          path="/workshop"
          element={<RequiredAuth allowedRoles={["Admin", "Utilisateur"]} />}
        >
          <Route index element={<Tasting />} />
          <Route path="tastingsheet" element={<TastingSheet />} />
          <Route path="tastingprofile" element={<TastingProfile />} />
          <Route path="recipe" element={<Recipe />} />
        </Route>
        {/* --- Routes Admin --- */}
        <Route
          path="/admin"
          element={<RequiredAuth allowedRoles={["Admin"]} />}
        >
          <Route path="home" element={<Admin />} />
          <Route path="users" element={<Admin />} />
          <Route path="wines" element={<Admin />} />
          <Route path="sessions" element={<Admin />} />
          <Route path="recipes" element={<Admin />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
