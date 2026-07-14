import { Outlet, Link } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg text-gray-900">ProjectHub</Link>
        <div className="flex gap-4">
          <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
          <Link to="/register" className="text-gray-600 hover:text-gray-900">Register</Link>
        </div>
      </nav>
      <main className="max-w-md mx-auto mt-16 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;