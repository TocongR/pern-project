import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-md">
        <p className="text-sm text-gray-500">Name</p>
        <p className="font-medium text-gray-900 mb-4">{user?.name}</p>
        <p className="text-sm text-gray-500">Email</p>
        <p className="font-medium text-gray-900">{user?.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;