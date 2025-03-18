import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFullName,
  updateEmail,
  updateTitle,
  updateLanguage,
  updateDateFormat,
  toggleAutomaticTimestore,
} from '../redux/profileSlice';

const ProfilePage = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-500 hover:underline">Notifications</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">Change Password</a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">Security Settings</a>
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Full name</h2>
          <div className="flex items-center">
            <p className="mr-4">{profile.fullName}</p>
            <button
              onClick={() => dispatch(updateFullName('New Name'))}
              className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Email address</h2>
          <div className="flex items-center">
            <p className="mr-4">{profile.email}</p>
            <button
              onClick={() => dispatch(updateEmail('new.email@example.com'))}
              className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Title</h2>
          <div className="flex items-center">
            <p className="mr-4">{profile.title}</p>
            <button
              onClick={() => dispatch(updateTitle('New Title'))}
              className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Languages and dates</h2>
          <p className="mb-4">Choose what language and date format to use throughout your account.</p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Language</h3>
            <div className="flex items-center">
              <p className="mr-4">{profile.language}</p>
              <button
                onClick={() => dispatch(updateLanguage('New Language'))}
                className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Date format</h3>
            <div className="flex items-center">
              <p className="mr-4">{profile.dateFormat}</p>
              <button
                onClick={() => dispatch(updateDateFormat('New Format'))}
                className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Automatic timestore</h3>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={profile.automaticTimestore}
                onChange={() => dispatch(toggleAutomaticTimestore())}
                className="mr-2"
              />
              <label>Enable Automatic Timestore</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;