
  import AppointmentList from "./AppointmentList";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard(props) {
	// const [candidates, setCandidates] = useState(null);
	const [appointments, setAppointments] = useState(null);

	useEffect(() => {
		axios.get("/api/users").then((res) => setAppointments(res.data));
	}, []);
	return (
		<div>
			<h1>I am Dashboard</h1>
			<AppointmentList appointments={appointments} />
		</div>
	);
}