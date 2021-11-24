import { useLocation } from "react-router";


export default function Dashboard(props) {
  const { state } = useLocation();
  console.log("state is:", state);
  return (
    <div>
    <h1>Dashboard page </h1>
    </div>
  );
}