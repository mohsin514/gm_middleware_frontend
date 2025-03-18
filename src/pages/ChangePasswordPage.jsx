import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPassword, setNewPassword, setConfirmPassword } from '../redux/passwordSlice';

const ChangePasswordPage = () => {
  const { currentPassword, newPassword, confirmPassword } = useSelector((state) => state.password);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="mb-4">Ensure your account is using a strong password.</p>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Current password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => dispatch(setCurrentPassword(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">New password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => dispatch(setNewPassword(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Confirm password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <p className="text-sm">
            ✔ At least 8 characters<br />
            X One uppercase letter<br />
            X One lowercase letter<br />
            X One number<br />
            X One special character (e.g., !@#$%^&*)
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400">
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Update password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;