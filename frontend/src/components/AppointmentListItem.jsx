

export default function AppointmentListItem(props) {
  const { start_date , test_id} = props;
  return (
    <div>
      <h1>AppointmentListItem page </h1>
      <section> {start_date }</section>
      <section> {test_id}</section>
    </div>
  );
}
