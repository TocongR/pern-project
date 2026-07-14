import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">ProjectHub</h1>
      <p className="text-gray-500 max-w-md mb-8">
        Organize your projects and tasks in one place, built for focus and simplicity.
      </p>
      <div className="flex gap-3">
        {isAuthenticated ? (
          <Link to="/dashboard"><Button>Go to Dashboard</Button></Link>
        ) : (
          <>
            <Link to="/login"><Button variant="secondary">Log in</Button></Link>
            <Link to="/register"><Button>Get Started</Button></Link>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;