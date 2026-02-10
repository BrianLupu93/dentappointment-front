import "./App.css";
import Navbar from "./components/Navbar";
import PageComponent from "./components/PageComponent";
import { ThemeProvider } from "./context/theme/themeContext";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import Services from "./pages/services/Services";
import { DialogProvider } from "./context/dialog/AppDialogContext";
import { AppDialog } from "./components/AppDialog";
import { AppointmentProvider } from "./pages/home/context/appointmentContext";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Toaster />
        <DialogProvider>
          <Navbar />
          <PageComponent>
            <Routes>
              <Route
                path='/'
                element={
                  <AppointmentProvider>
                    <Home />
                  </AppointmentProvider>
                }
              />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/services' element={<Services />} />
            </Routes>
          </PageComponent>
          <AppDialog />
        </DialogProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
