import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="flex bg-blue-500 p-3">
            <ul className="flex gap-4">
                <li>
                    <Link to="/client-list">Client List</Link>
                </li>
                <li>
                    <Link to="/appointment-list">Appointment List</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;