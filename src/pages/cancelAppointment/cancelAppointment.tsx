import { routes } from "@/context/api/routes";
import { useEffect, useRef, useState } from "react";

export default function CancelAppointment() {
  const [message, setMessage] = useState("Processing...");
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setMessage("Missing token");
      return;
    }

    const cancelAppointment = async () => {
      try {
        const res = await fetch(`${routes.appointment}/cancel?token=${token}`);

        const data = await res.json();

        if (!res.ok) {
          setMessage(
            typeof data === "string"
              ? data
              : "Something went wrong while cancelling.",
          );
          return;
        }

        setMessage(data);
      } catch (error) {
        setMessage("Server error");
      }
    };

    cancelAppointment();
  }, []);

  return (
    <div className='mx-auto h-full w-full mt-20 text-center'>
      <div className='text-2xl font-semibold'>CANCEL APPOINTMENT</div>
      <p className='mt-6 text-orange-600'>{message}</p>
    </div>
  );
}
