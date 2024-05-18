import { useEffect, useState } from 'react'
import React from 'react'
import SidebarMenu from "../components/SidebarMenu"
import { Link } from 'react-router-dom';

const RecordsList = ({state}) => {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([])
    const [error, setError] = useState("");

    const getInitialProps = async () => {
        try {
            const { contract } = state;
            const allRecords = await contract.getPatients();
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
                <div className='content-a'>
                    <div className='div-btn'>
                        <button onClick = {getInitialProps} type="button" className="btn btn-success"
                            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                            Show list
                        </button>
                    </div>
                    
                    <div className='list-content'>
                        {items.length > 0 ? (
                            <ul>
                                {items.map((item, index) => (
                                    <li key={index}>
                                        Patient: {item} | <Link to={`details/${item}`}>Details</Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No records found.</p>
                        )}
                    </div>
                    <div className="text-danger error-content">
                        {error && error}
                    </div>
                </div>
            </div>
        </>
    );
}

export default RecordsList;


