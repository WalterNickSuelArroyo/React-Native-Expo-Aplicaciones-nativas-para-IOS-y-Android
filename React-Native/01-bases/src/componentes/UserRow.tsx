import type { User } from "../interfaces/reqres.response";

interface Props {
    user: User;
}

export const UserRow = ({ user }: Props) => {
  return (
    <tr className="p-2">
      <td>
        <img src={user.avatar} referrerPolicy="no-referrer" alt="Avatar" className="w-14 rounded-full" />
      </td>
      <td>
        {user.first_name} {user.last_name}
      </td>
      <td>{user.email}</td>
    </tr>
  );
};