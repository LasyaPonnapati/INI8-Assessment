import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const navigate = useNavigate(); 
    const handleUpdateClick = () => {
        navigate('/update');
    };
    return(
        <header className="header-container">

            <h1 className="header-heading">Welcome!</h1>
            <button className="header-user-data" onClick={handleUpdateClick}>
            <span class="material-symbols-outlined">update</span>
            <h1 className="header-greeting">Hello! {userData.name}</h1>
            </button>

        </header>
    )
};

export default Header;