import "./App.css";
import Navbar from "./components/Navbar";
import PageComponent from "./components/PageComponent";
import { ThemeProvider } from "./context/theme/themeContext";
import Dashboard from "./pages/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router";
import Services from "./pages/services/Services";
import { DialogProvider } from "./context/dialog/AppDialogContext";
import { AppDialog } from "./components/AppDialog";
import { Toaster } from "sonner";
import { ServiceProvider } from "./context/service/serviceContext";
import { AppointmentProvider } from "./context/appointment/appointmentContext";
import Appointment from "./pages/appointment/Appointment";
import { DashboardProvider } from "./context/dashboard/dashboardContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/login/Login";
import { AuthProvider } from "./context/auth/authContext";
import Register from "./pages/register/Register";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DialogProvider>
            <Toaster />
            <Navbar />
            <PageComponent>
              <Routes>
                {/* PUBLIC ROUTES */}
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route
                  path='/'
                  element={
                    <AppointmentProvider>
                      <Appointment />
                    </AppointmentProvider>
                  }
                />

                {/* PROTECTED ROUTES */}
                <Route
                  path='/dashboard'
                  element={
                    <ProtectedRoute>
                      <DashboardProvider>
                        <Dashboard />
                      </DashboardProvider>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path='/services'
                  element={
                    <ProtectedRoute>
                      <ServiceProvider>
                        <Services />
                      </ServiceProvider>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </PageComponent>

            <AppDialog />
          </DialogProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
