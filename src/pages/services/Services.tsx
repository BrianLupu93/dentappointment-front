import AppFrame from "@/components/AppFrame";
import Title from "@/components/ui/Title";
import { useEffect, useRef } from "react";
import { useService } from "@/context/service/serviceContext";
import { ServiceForm } from "./components/ServiceForm";
import AddNewServiceForm from "./components/AddNewServiceForm";
import { useServiceCheckPost } from "./hooks/useServiceCheckPost";
import { fetchServices, postService } from "./handlers/handlers";

const Services = () => {
  const { state, dispatch } = useService();
  const { checkBeforeSubmit } = useServiceCheckPost();
  const serviceNameRef = useRef<HTMLInputElement>(null);
  const serviceDurationRef = useRef<HTMLInputElement>(null);

  // On mount call the fetchServices to get all the available services
  useEffect(() => {
    fetchServices(dispatch);
  }, []);

  function handleSubmit() {
    checkBeforeSubmit({
      nameRef: serviceNameRef,
      durationRef: serviceDurationRef,
      onConfirm: ({ name, duration }) =>
        postService(
          { name, duration },
          serviceNameRef,
          serviceDurationRef,
          dispatch,
        ),
    });
  }

  return (
    <>
      <Title children='Service management' />
      <AppFrame>
        <div className=' flex mb-4 font-semibold'>Available services:</div>
        <div className='flex mb-4 gap-2 sm:gap-4 text-sm'>
          <span className='w-6/12 sm:w-8/12'>Service Name</span>
          <span className='w-2/12 sm:w-1/12'>Duration</span>
          <span className='w-2/12 sm:w-1/12'>Active</span>
          <span className='w-2/12 sm:w-2/12'>Edit</span>
        </div>
        <div className='flex flex-col gap-4 mb-10'>
          {state.services ? (
            state.services.map((service) => {
              return (
                <ServiceForm
                  _id={service._id}
                  key={service._id}
                  name={service.name}
                  duration={service.duration}
                  active={service.active}
                />
              );
            })
          ) : (
            <div>You have no Services. Below can you add a new service.</div>
          )}
        </div>
        <div className=' flex mb-4 font-semibold'>Add a new Service:</div>
        <AddNewServiceForm
          serviceNameRef={serviceNameRef}
          serviceDurationRef={serviceDurationRef}
          handleClick={handleSubmit}
        />
      </AppFrame>
    </>
  );
};

export default Services;
