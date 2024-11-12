import { useEffect, useState } from "react";
import Header from "./Header";
import "../styles/Home.css";

const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/users/allUsers", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setUsers(data.users);
                } else {
                    console.log("Failed to fetch users");
                }
            } catch (err) {
                console.log("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllUsers();
    }, []);

    const handleOnClickUserDelete = async (emailId) => {
        try {
            const response = await fetch("http://localhost:3000/api/users/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emailId }),
            });

            const data = await response.json();
            if (response.status === 200) {
                console.log(data.message);
                setUsers(prevUsers => prevUsers.filter(user => user.emailId !== emailId));
            } else {
                console.log("Error:", data.message);
            }
        } catch (err) {
            console.log("Error deleting user:", err);
        }
    };

    const loggedInUser = JSON.parse(sessionStorage.getItem("userData"));

    return (
        <div className="home-outer-container">
            <Header />
            <div className="home-inner-container">
                <h2 className="home-heading">Users Registered on our platform</h2>
                <div className="users-list">
                    {loading ? (
                        <p>Loading...</p>
                    ) : users.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        users.map((user, index) => (
                            <div key={index} className="user-card">
                                {loggedInUser.emailId !== user.emailId && <button
                                    className="user-delete-button"
                                    onClick={() => handleOnClickUserDelete(user.emailId)}
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </button>}
                                <p>
                                    <img src={user.dpURL} alt={user.name} width={70} height={70} />
                                </p>
                                <p>Name: {user.name}</p>
                                <p>Email: {user.emailId}</p>
                                <p>DOB: {user.DOB}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
