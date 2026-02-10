import "./App.css";
import Navbar from "./components/Navbar";
import PageComponent from "./components/PageComponent";
import { ThemeProvider } from "./context/theme/themeContext";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import Services from "./pages/services/Services";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Navbar />
        <PageComponent>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/services' element={<Services />} />
          </Routes>
        </PageComponent>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
