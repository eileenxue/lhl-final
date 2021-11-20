import AppointmentListItem from "./AppointmentListItem";

export default function AppointmentList(props) {
  const appointments = [
    {
      id: 1,
      user_id: 1,
      is_proctor: true,
      start_date: "2021-11-20",
      test_id: 1
    },
    {
      id: 2,
      user_id: 2,
      is_proctor: false,
      start_date: "2021-11-20",
      test_id: 1
    },
    {
      id: 3,
      user_id: 3,
      is_proctor: true,
      start_date: "2021-11-20",
      test_id: 2
    },
  ];

  // const { appointments } = props;

  const parsedAppointments =
    Array.isArray(appointments) &&
    appointments.map((appointment) => (
      <AppointmentListItem {...appointment} key={appointment.id} />
    ));

  return (
    <div>
      <h1>AppointmentList page </h1>
      <section> {parsedAppointments} </section>
    </div>
  );
}
