import { TableCell, TableRow } from "@/components/ui/table";
import type { Appointment } from "@/context/dashboard/dashboardTypes";
import { GrStatusGoodSmall } from "react-icons/gr";
import { TiDelete } from "react-icons/ti";
import { deleteAppointment, getAppointmentsByDate } from "../handlers/handlers";
import { useDashboard } from "@/context/dashboard/dashboardContext";
import { useAppointmentCheckDelete } from "../hooks/useAppointmentCheckDelete";

type RowProps = Appointment;

const Row = ({
  clientInfo,
  service,
  _id,
  startTime,
  endTime,
  done,
  date,
}: RowProps) => {
  const { state, dispatch } = useDashboard();
  const { confirmDelete } = useAppointmentCheckDelete();

  function handleDelete() {
    confirmDelete({
      id: _id,
      clientName: clientInfo.fullName,
      serviceName: service.name,
      date: date,
      time: `${startTime} - ${endTime}`,
      onConfirm: () => deleteAppointment(_id, dispatch, state.appointments),
    });
  }
  return (
    <TableRow id={_id} className='h-12'>
      <TableCell>{clientInfo.fullName}</TableCell>
      <TableCell>{service.name}</TableCell>
      <TableCell>
        {startTime} - {endTime}
      </TableCell>
      <TableCell>
        <GrStatusGoodSmall
          className={`${done ? "text-red-600" : "text-green-600"} animate-pulse`}
          size={20}
        />
      </TableCell>
      <TableCell>
        <TiDelete
          className='text-red-500 hover:cursor-pointer hover:scale-110'
          size={20}
          onClick={handleDelete}
        />
      </TableCell>
    </TableRow>
  );
};

export default Row;
