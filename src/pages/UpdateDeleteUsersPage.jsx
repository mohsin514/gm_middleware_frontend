import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, deleteUser } from '../redux/usersSlice';

const UpdateDeleteUsersPage = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleUpdateUser = (id) => {
    const updatedUser = {
      id,
      firstName: 'Updated',
      lastName: 'User',
      email: 'updated.user@example.com',
      viewOnly: true,
      edit: true,
      admin: false,
    };
    dispatch(updateUser(updatedUser));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Admin - Update or Delete Users</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2">Delete User</th>
              <th className="text-left py-2">First Name</th>
              <th className="text-left py-2">Last Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">View Only</th>
              <th className="text-left py-2">Edit</th>
              <th className="text-left py-2">Administrator</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-2">
                  <input
                    type="checkbox"
                    onChange={() => handleDeleteUser(user.id)}
                  />
                </td>
                <td className="py-2">{user.firstName}</td>
                <td className="py-2">{user.lastName}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">
                  <input
                    type="checkbox"
                    checked={user.viewOnly}
                    onChange={() => handleUpdateUser(user.id)}
                  />
                </td>
                <td className="py-2">
                  <input
                    type="checkbox"
                    checked={user.edit}
                    onChange={() => handleUpdateUser(user.id)}
                  />
                </td>
                <td className="py-2">
                  <input
                    type="checkbox"
                    checked={user.admin}
                    onChange={() => handleUpdateUser(user.id)}
                  />
                </td>
                <td className="py-2">
                  <button
                    onClick={() => handleUpdateUser(user.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateDeleteUsersPage;