import UserListItem from "./UserListItem";

export default function UserList(props) {
  const users = [
    {
      id: 1,
      first_name: "Bob",
      last_name: "1",
      email: "bob1@gmail.com",
      password: "123",
    },
    {
      id: 2,
      first_name: "Bob",
      last_name: "2",
      email: "bob2@gmail.com",
      password: "123",
    },
    {
      id: 3,
      first_name: "Bob",
      last_name: "3",
      email: "bob3@gmail.com",
      password: "123",
    },
  ];

  const parsedUsers =
    Array.isArray(users) &&
    users.map((user) => <UserListItem {...user} key={user.id} />);

  return (
    <div>
      <h1>UserList page </h1>

      <section>{parsedUsers}</section>
    </div>
  );
}
