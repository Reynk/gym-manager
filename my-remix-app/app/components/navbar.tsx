import {Link} from 'react-router-dom';

function Navbar({loggedIn}: { loggedIn: boolean }) {
    return (
        <nav className="flex bg-yellow-300 p-3 justify-between items-center">
            <ul className="flex gap-4">
                <li>
                    <Link to="/client-list" className="text-blue-600 font-semibold">Client List</Link>
                </li>
                <li>
                    <Link to="/appointment-list" className="text-blue-600 font-semibold">Appointment List</Link>
                </li>
                <li>
                    {
                        loggedIn ? <form action='/logout' method="post">
                            <button type="submit" className="text-blue-600 font-semibold">Logout</button>
                        </form> : ''
                    }
                </li>
            </ul>
        </nav>
    );
}


export default Navbar;