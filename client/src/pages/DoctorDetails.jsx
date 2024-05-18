import { useEffect, useState } from 'react'
import React from 'react'
import SidebarMenu from "../components/SidebarMenu"
import { useParams } from 'react-router-dom';

const DoctorDetails = ({state}) => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [error, setError] = useState('');
  const { address } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const { contract } = state;
        console.log(contract);
        const details = await contract.getDoctorDetails(address);
        console.log(details);
        setDoctorDetails(details);
        setError('');
      } catch (err) {
        setError(err.message);
        setDoctorDetails(null);
      }
    };

    getDetails();
  }, [state, address]);

  return (
    <div className='margin-menu'>
      <SidebarMenu />
      <div className='list-content'>
        <h1>Doctor Details</h1>
        {error && <p style={{ color: 'red' }} className='error-content'>{error}</p>}
        {doctorDetails && (
          <div>
            <p>IC: {doctorDetails[0]}</p>
            <p>Name: {doctorDetails[1]}</p>
            <p>Qualification: {doctorDetails[2]}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorDetails;


