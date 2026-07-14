import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';

const AuthenticatedLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = (
    <>
      <Link to="/dashboard" className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Dashboard</Link>
      <Link to="/projects" className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Projects</Link>
      <Link to="/profile" className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Profile</Link>
      <Link to="/settings" className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Settings</Link>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile top bar */}
      <div className="md:hidden flex justify-between items-center bg-white border-b border-gray-200 p-4">
        <Link to="/dashboard" className="font-bold text-lg text-gray-900">ProjectHub</Link>
        <button onClick={() => setMenuOpen((v) => !v)} className="text-gray-700">
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex flex-col gap-2">
          {navLinks}
          <Button variant="secondary" onClick={handleLogout} className="w-full mt-2">Logout</Button>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 bg-white border-r border-gray-200 p-4 flex-col">
        <Link to="/dashboard" className="font-bold text-lg text-gray-900 mb-8">ProjectHub</Link>
        <nav className="flex flex-col gap-2 flex-1">{navLinks}</nav>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500 mb-2 truncate">{user?.email}</p>
          <Button variant="secondary" onClick={handleLogout} className="w-full">Logout</Button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;