import ClientForm from "./components/ClientForm";
import HomeCalendar from "./components/HomeCalendar";

const Home = () => {
  return (
    <div className='w-full flex flex-col sm:flex-row gap-4 p-6 border border-black dark:border-white rounded-md'>
      <ClientForm />
      <HomeCalendar />
    </div>
  );
};

export default Home;
