import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../redux/usersSlice';

const ManageUsersPage = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Admin - Manage Users</h1>
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
              <th className="text-left py-2">Actions</th>
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
                <td className="py-2">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsersPage;