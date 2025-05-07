import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="bg-white shadow p-4 flex gap-4 justify-center font-semibold">
      <Link to="/">Join Queue</Link>
      <Link to="/status">Queue Status</Link>
      <Link to="/staff">Staff Dashboard</Link>
    </nav>
  );
}

export default Header;
