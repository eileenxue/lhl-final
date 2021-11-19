export default function UserListItem(props) {
  const  {first_name,last_name, id} = props;

  return (
    <div>

    <h1>UserListItem page </h1>
    <p> {first_name}</p> 
    <p> {last_name}</p> 
    

    </div>

  );
}