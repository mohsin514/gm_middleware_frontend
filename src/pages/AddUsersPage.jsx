import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../redux/usersSlice';

const AddUsersPage = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      firstName: 'New',
      lastName: 'User',
      email: 'new.user@example.com',
      viewOnly: false,
      edit: false,
      admin: false,
    };
    dispatch(addUser(newUser));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Admin - Add Users</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2">First Name</th>
              <th className="text-left py-2">Last Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">View Only</th>
              <th className="text-left py-2">Edit</th>
              <th className="text-left py-2">Administrator</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-2">{user.firstName}</td>
                <td className="py-2">{user.lastName}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{user.viewOnly ? '✅' : '❌'}</td>
                <td className="py-2">{user.edit ? '✅' : '❌'}</td>
                <td className="py-2">{user.admin ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6">
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUsersPage;