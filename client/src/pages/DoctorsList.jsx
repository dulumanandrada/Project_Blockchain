import { useEffect, useState } from 'react'
import React from 'react'
import SidebarMenu from "../components/SidebarMenu"
import { Link } from 'react-router-dom';

const DoctorsList = ({state}) => {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([])
    const [error, setError] = useState("");

    const getInitialProps = async () => {
        try {
            const { contract } = state;
            const allRecords = await contract.getDoctors();
            setItems(allRecords); 
        } catch (err) {
            console.error(err);
            setError("Failed to fetch records");
        }
    };

    return (
        <>
            <div className='margin-menu'>
                <SidebarMenu />
                <div className="content-a">
                    <div className="div-btn">
                        <button onClick = {getInitialProps} type="button" className="btn btn-success"
                            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                            Show list
                        </button>
                    </div>
                    <div className="list-content">
                        <div>
                            {items.length > 0 ? (
                                <ul>
                                    {items.map((item, index) => (
                                        <li key={index}>
                                            Doctor: {item} | <Link to={`details/${item}`}>Details</Link> 
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No doctors found.</p>
                            )}
                        </div>
                        <div className="text-danger error-content">
                            {error && error}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorsList;


