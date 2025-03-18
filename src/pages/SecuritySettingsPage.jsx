import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTwoStepVerification } from '../redux/securitySlice';

const SecuritySettingsPage = () => {
  const { twoStepVerification, passkeys, devices } = useSelector((state) => state.security);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Security Settings</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="mb-4">Ensure your account is using a strong password.</p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">How you sign in</h2>
          <p className="mb-4">
            Note: save you own charge access your account by keeping this information up to date.
          </p>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={twoStepVerification}
                onChange={() => dispatch(toggleTwoStepVerification())}
              />
              <span>2 Step Verification</span>
            </label>
            <p className="text-sm text-gray-600">On since May 1, 2024</p>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Passkeys and security keys</span>
            </label>
            <p className="text-sm text-gray-600">{passkeys} passkeys</p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Devices</h2>
          <p className="mb-4">Weave you’re signed in.</p>
          {devices.map((device) => (
            <div key={device.id} className="mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" checked={device.current} />
                <span>{device.name}</span>
              </label>
              <p className="text-sm text-gray-600">{device.location}</p>
              <p className="text-sm text-gray-600">{device.browser}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsPage;