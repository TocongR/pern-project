import { useAuth } from '../../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
      <p className="text-gray-500 mt-2">Here's an overview of your workspace.</p>
    </div>
  );
};

export default DashboardPage;