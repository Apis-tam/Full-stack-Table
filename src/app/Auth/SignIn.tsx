'use client';

import { TabParam, useAuth } from '../Hooks/useAuth';

export const Auth = () => {
  const { formAction, requeredFields, setActiveTab, activeTab } = useAuth();

  const handleTabSwitch = (tab: TabParam) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gray-100">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md absolute top-40">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 text-center text-lg font-semibold border-b-2 ${
              activeTab === 'signin' ? ' border-blue-500 text-blue-500' : 'text-gray-500'
            } hover:border-blue-300`}
            onClick={() => handleTabSwitch('signin')}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 border-b-2 text-center text-lg font-semibold ${
              activeTab === 'signup' ? ' border-blue-500 text-blue-500' : 'text-gray-500'
            } hover:border-blue-300`}
            onClick={() => handleTabSwitch('signup')}
          >
            Sign Up
          </button>
        </div>
        <form action={formAction}>
          <h2 className="text-2xl font-bold text-center mb-6">
            {activeTab === 'signup' ? 'Sign up' : 'Sign In'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                autoComplete="email"
                name="email"
                type="email"
                className={`mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  !requeredFields?.email && ' border-red-600'
                }`}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                autoComplete="current-password"
                name="password"
                type="password"
                className={`mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  !requeredFields?.password && ' border-red-600'
                }`}
                placeholder="Enter your password"
              />
            </div>
            {activeTab === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  autoComplete="username"
                  name="userName"
                  type="text"
                  className={`mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    !requeredFields?.userName && ' border-red-600'
                  }`}
                  placeholder="Enter your username"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {activeTab === 'signup' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Auth;
