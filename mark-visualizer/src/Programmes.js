import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { toast, Toast } from "react-toastify";
// import { Toast } from "react-toastify/dist/components";
import axios from "axios";
import "./Page.css";
import "./Sidebar.css";
import editIco from "./img/edit.png";
import delIco from "./img/delete.png";

export const Programmes = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get(
            "http://localhost:5002/programmes/get"
        );
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            axios.delete(`http://localhost:5002/programmes/remove/${id}`);
            // toast.success("Contact deleted sucessfully");
            alert("Sucessfully Deleted");
            setTimeout(() => loadData(), 500);
        }
    };

    const ico = {
        width: "36px",
        height: "auto",
        cursor: "pointer",
    };

    const text__style = {
        textDecoration: "none",
        color: "white",
    };

    return (
        <div className="student__page">
            {/* Side-Navbar */}
            <div className="sidebar">
                <Link to="/students" style={text__style}>
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
                <Link to="/prediction" style={text__style}>
                    <div
                        className="navbar__options"
                        onClick={(event) =>
                            (window.location.href = "http://127.0.0.1:5000/")
                        }
                    >
                        Prediction
                    </div>
                </Link>
            </div>

            <div className="page__container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>S.NO</th>
                            <th style={{ textAlign: "center" }}>Course ID</th>
                            <th style={{ textAlign: "center" }}>Course Name</th>
                            <th style={{ textAlign: "center" }}>Module ID</th>
                            <th style={{ textAlign: "center" }}>Module Name</th>
                            <th style={{ textAlign: "center" }}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row">{index + 1} </th>
                                    <td>{item.c_Id} </td>
                                    <td>{item.c_Name} </td>
                                    <td>{item.m_Code} </td>
                                    <td>{item.m_Name} </td>
                                    <td>
                                        {/* <Link
                                            to={`programmes/update/${item.id}`}
                                        >
                                            <img
                                                src={editIco}
                                                className="imgStyle"
                                                alt=""
                                            />
                                        </Link> */}

                                        <img
                                            className="imgStyle"
                                            src={delIco}
                                            onClick={() =>
                                                deleteContact(item.id)
                                            }
                                            alt=""
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Programmes;
