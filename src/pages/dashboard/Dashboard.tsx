import AppFrame from "@/components/AppFrame";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Title from "@/components/ui/Title";
import { useEffect, useState } from "react";
import { getAppointmentsByDate } from "./handlers/handlers";
import { useDashboard } from "@/context/dashboard/dashboardContext";
import Row from "./components/Row";
import { WeeklyBarSelector } from "./components/WeeklyBarSelector";

const Dashboard = () => {
  const { state, dispatch } = useDashboard();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAppointmentsByDate(state.selectedDay, dispatch, setLoading);
  }, [state.currentDate]);

  return (
    <>
      <Title children='Dashboard' />
      <AppFrame>
        <WeeklyBarSelector
          selectedDate={state.currentDate}
          onSelect={(dateObj, formatted) => {
            dispatch({ type: "SET_SELECTED_DAY", payload: formatted });
            dispatch({ type: "SET_CURRENT_DATE", payload: dateObj });
          }}
        />
        <Table>
          <TableHeader>
            <TableRow className='h-14'>
              <TableHead>Name</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className='text-left'>
            {state.appointments.length ? (
              state.appointments.map((app) => {
                return (
                  <Row
                    key={app._id}
                    clientInfo={app.clientInfo}
                    service={app.service}
                    startTime={app.startTime}
                    endTime={app.endTime}
                    done={app.done}
                    date={app.date}
                    _id={app._id}
                  />
                );
              })
            ) : (
              <TableRow className='h-12'>
                <TableCell colSpan={5} className='text-center text-orange-600'>
                  There are no Appointments on the selected Day!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </AppFrame>
    </>
  );
};

export default Dashboard;
