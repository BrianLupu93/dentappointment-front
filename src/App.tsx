import "./App.css";
import Navbar from "./components/Navbar";
import PageComponent from "./components/PageComponent";
import { ThemeProvider } from "./context/themeContext";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Navbar />
        <PageComponent>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </PageComponent>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
