import {Link} from 'react-router-dom';
import {useTranslation} from "~/utils/useTranslation";
import {LanguageSelector} from "~/components/language-selector";

function Navbar({loggedIn}: { loggedIn: boolean }) {
    const { t } = useTranslation();
    return (
        <nav className="flex bg-yellow-300 p-3 justify-between items-center">
            <ul className="flex gap-4">
                {loggedIn && <>
                    <li>
                        <Link to="/client-list" className="text-blue-600 font-semibold">{t('clientList')}</Link>
                    </li>
                    <li>
                        <Link to="/appointment-list" className="text-blue-600 font-semibold">{t('appointmentsList')}</Link>
                    </li>
                </>
                }
                <li>
                    {
                        loggedIn ? <form action='/logout' method="post">
                            <button type="submit" className="text-blue-600 font-semibold">Logout</button>
                        </form> : <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
                    }
                </li>
                <li>
                    <LanguageSelector />
                </li>
            </ul>
        </nav>
    );
}


export default Navbar;