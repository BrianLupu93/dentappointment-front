import { Input } from "@/components/ui/input";
import { useService } from "@/context/service/serviceContext";
import type { ServiceAdmin } from "@/context/service/serviceTypes";
import { useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { FaRegSave } from "react-icons/fa";
import {
  deleteService,
  handleChangeService,
  updateService,
} from "../handlers/handlers";
import { useServiceCheckDelete } from "../hooks/useServiceCheckDelete";
import { useServiceCheckUpdate } from "../hooks/useServiceCheckUpdate";

type ServiceProps = ServiceAdmin;

export const ServiceForm = ({ name, duration, active, _id }: ServiceProps) => {
  const { state, dispatch } = useService();
  const [update, setToUpdate] = useState({ id: "", value: false });
  const { confirmDelete } = useServiceCheckDelete();
  const { confirmUpdate } = useServiceCheckUpdate();

  const nameRef = useRef<HTMLInputElement>(null);
  const durationRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className='flex gap-2 sm:gap-4 items-center'
      onChange={() =>
        handleChangeService(
          _id,
          state,
          nameRef,
          durationRef,
          activeRef,
          setToUpdate,
          dispatch,
        )
      }
    >
      <Input
        defaultValue={name}
        type='text'
        className='w-6/12 sm:w-8/12'
        ref={nameRef}
      />

      <Input
        defaultValue={duration}
        type='number'
        className='w-3/12 sm:w-2/12 no-spinner'
        min={15}
        max={120}
        ref={durationRef}
      />

      <Input
        type='checkbox'
        className='w-4 h-4 mx-auto'
        defaultChecked={active}
        ref={activeRef}
      />

      <TiDelete
        className='text-red-600 hover:scale-110 hover:cursor-pointer'
        size={20}
        onClick={() =>
          confirmDelete({
            id: _id,
            name,
            onConfirm: (id) => deleteService(id, dispatch),
          })
        }
      />

      {update.value && update.id === _id ? (
        <FaRegSave
          className='text-blue-600 hover:scale-110 hover:cursor-pointer'
          size={20}
          onClick={() =>
            confirmUpdate({
              id: _id,
              nameRef: nameRef,
              durationRef: durationRef,
              activeRef: activeRef,
              onConfirm: (data) => {
                updateService(data, dispatch);
                dispatch({ type: "SET_SELECTED_SERVICE", payload: null });
                setToUpdate({ id: "", value: false });
              },
            })
          }
        />
      ) : null}
    </form>
  );
};
