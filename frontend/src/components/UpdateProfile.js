import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/UpdatePage.css";

const UpdateProfile = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [updatedProfile, setUpdatedProfile] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const dobRef = useRef(null);
    const dpURLRef = useRef(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/loggedInUser?emailId=${userData?.emailId}`, {
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                if (response.status === 200) {
                    const data = await response.json();
                    setLoggedInUser(data.user);
                }else{

                }
            } catch (err) {
                console.log("Error fetching user details:", err);
            }
        };
        fetchUserDetails();
    }, []);

    const handleUpdateOnClick = async () => {
        const updatedUser = {
            name: nameRef.current.value,
            emailId: userData?.emailId,
            password: passwordRef.current.value,
            DOB: dobRef.current.value,
            dpURL: dpURLRef.current.value,
        };

        try {
            const response = await fetch("http://localhost:3000/api/users/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });

            const data = await response.json();
            if (response.status === 200) {
                sessionStorage.setItem("userData", JSON.stringify(data.user));
                setUpdatedProfile(data.user);
                setError(null);
            } else { 
                setError(data.message);
            }
        } catch (err) {
            console.log("Error updating user:", err);
        }
    };

    const handleCancelOnClick = () => {
        navigate("/home");
    };

    return (
        <div className="update-page-outer-container">
            <Header />
            <div className="update-page-inner-container">
                <h2>Update your profile</h2>
                <div className="user-details-container">
                    <div>
                        <label>Name:</label>
                        <input type="text" defaultValue={loggedInUser?.name || ""} ref={nameRef} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="text" defaultValue={loggedInUser?.password || ""} ref={passwordRef} />
                    </div>
                    <div>
                        <label>DOB:</label>
                        <input type="text" defaultValue={loggedInUser?.DOB || ""} ref={dobRef} />
                    </div>
                    <div>
                        <label>dpURL:</label>
                        <input type="text" defaultValue={loggedInUser?.dpURL || ""} ref={dpURLRef} />
                    </div>
                </div>
                {updatedProfile && <p className="update-success-message">Profile updated successfully!</p>}
                {error && <p className="error-message">{error}</p>}
                <div className="update-page-buttons">
                    <button onClick={handleUpdateOnClick} className="update-page-button">Update</button>
                    <button onClick={handleCancelOnClick} className="update-page-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
