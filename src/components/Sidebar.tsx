import { Link, useNavigate } from "react-router-dom";
import '../styles/Sidebar.css';
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Sidebar: React.FC = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutUser = () => {
        logout();
        navigate('/login')
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <h2>Menu</h2>
                {
                    token && <button className="logout" onClick={() => logoutUser()}>Logout</button>
                }
            </div>
            <div className="sidebar__content">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/speech">Speech</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;