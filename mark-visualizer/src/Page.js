import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Page.css";
import "./Sidebar.css";
import { UserContext } from "./UserContext";
import { usrlogin } from "./usrlogin";

export const Page = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5002/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            axios.delete(`http://localhost:5002/api/remove/${id}`);
            alert("Sucessfully Deleted");
            setTimeout(() => loadData(), 500);
        }
    };

    const text__style = {
        textDecoration: "none",
        color: "white",
    };

    // user context message setup
    const { user, setUser } = useContext(UserContext);

    return (
        <div className="student__page">
            {/* Side-Navbar */}
            <div className="sidebar">
                <div className="sidebar__content">
                    <Link to="/Page" style={text__style}>
                        <div className="navbar__options">Student</div>
                    </Link>
                    <Link to="/Programmes" style={text__style}>
                        <div className="navbar__options">Programs</div>
                    </Link>
                    <Link to="/Results" style={text__style}>
                        <div className="navbar__options">Results</div>
                    </Link>
                    <Link to="/Analytics" style={text__style}>
                        <div
                            className="navbar__options"
                            onClick={(event) =>
                                (window.location.href =
                                    "http://127.0.0.1:5500/visualization/lineChart.html")
                            }
                        >
                            Analytics
                        </div>
                    </Link>
                    <Link to="/Setting" style={text__style}>
                        <div className="navbar__options">Prediction</div>
                    </Link>
                </div>
            </div>

            <div className="page__container">
                <div className="table__options">
                    <input
                        type="text"
                        placeholder="Student ID"
                        className="student__Input"
                    />

                    <Link to="/addContact">
                        <button>Add Student</button>
                    </Link>

                    <Link>
                        <button>Filter</button>
                    </Link>
                </div>
                {/* showing user context here */}
                <pre>{JSON.stringify(user, null, 2)}</pre>
                {user ? (
                    <button onClick={() => setUser(null)}>logout</button>
                ) : (
                    <button
                        onClick={async () => {
                            const user = await usrlogin();
                            setUser(user);
                        }}
                    >
                        login
                    </button>
                )}
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>S.NO</th>
                            <th style={{ textAlign: "center" }}>Student ID</th>
                            <th style={{ textAlign: "center" }}>First Name</th>
                            <th style={{ textAlign: "center" }}>Last Name</th>
                            <th style={{ textAlign: "center" }}>Batch</th>
                            <th style={{ textAlign: "center" }}>Course ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row">{index + 1} </th>
                                    <td>{item.s_Id} </td>
                                    <td>{item.s_Fname} </td>
                                    <td>{item.s_Lname} </td>
                                    <td>{item.s_Batch} </td>
                                    <td>{item.c_Id} </td>
                                    {/* 
                                    <td>
                                        <Link to={`/update/${item.id}`}>
                                            <button>Edit</button>
                                        </Link>

                                        <button
                                            onClick={() =>
                                                deleteContact(item.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                        <Link to={`/view/${item.id}`}>
                                            <button>View</button>
                                        </Link>
                                    </td>
                                    */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
