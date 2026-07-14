import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-gray-500">Page not found</p>
      <Link to="/" className="mt-6 text-blue-600 hover:underline">Go home</Link>
    </div>
  );
};

export default NotFoundPage;