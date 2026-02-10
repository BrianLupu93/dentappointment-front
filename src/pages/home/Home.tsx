import ClientForm from "./components/ClientForm";
import HomeCalendar from "./components/HomeCalendar";
import HompageTitle from "./components/HompageTitle";
import ServiceSelector from "./components/ServiceSelector";
import TimeSelector from "./components/TimeSelector";
import { AppointmentProvider } from "./context/appointmentContext";
import AppFrame from "@/components/AppFrame";

const Home = () => {
  return (
    <AppointmentProvider>
      <div className='mx-auto'>
        <HompageTitle />
      </div>

      <AppFrame>
        <div className='flex flex-col sm:flex-row gap-4 items-center mb-4'>
          <ClientForm />
          <HomeCalendar />
        </div>
        <div className='flex flex-col items-start gap-4 mb-4'>
          <div>Select a service</div>
          <ServiceSelector />
        </div>
        <div className='flex flex-col items-start gap-4'>
          <div>Select time</div>
          <TimeSelector />
        </div>
      </AppFrame>
    </AppointmentProvider>
  );
};

export default Home;
