import { useEffect, useState } from 'react'
import React from 'react'
import SidebarMenu from "../components/SidebarMenu"
import { useParams } from 'react-router-dom';

const RecordDetails = ({state}) => {
  const [patientDetails, setPatientDetails] = useState(null);
  const [error, setError] = useState('');
  const { address } = useParams();
  const [values, setValues] = useState({
    ic: '',
    name: '',
    diagnostic: '',
    loading: false,
    errorMessage: ''
  });

  useEffect(() => {
    const getDetails = async () => {
      try {
        const { contract } = state;
        const details = await contract.getPatientDetails(address);
        setPatientDetails(details);
        values.ic = details[0]
        values.name = details[1]
        values.diagnostic = details[2]
        setError('');
      } catch (err) {
        setError(err.message);
        setPatientDetails(null);
      }
    };

    getDetails();
  }, [state, address]);

  const saveEdit = async (event) => {
    event.preventDefault();
    try {
        const {contract} = state
        const transaction = await contract.editDetails(values.ic, values.name, values.diagnostic)
        await transaction.wait();
        alert("Patient has been edited.");
        window.location.reload();
    }
    catch(err) {
        setError(err.message)
        alert("Error. Couldn't edit.")
    }
}

  return (
    <div className='margin-menu'>
      <SidebarMenu />
      <div className='list-content'>
        <h1>Patient Details</h1>
        {error && <p style={{ color: 'red' }} className='error-content'>{error}</p>}
        {patientDetails && (
          <div>
            <p>IC: {patientDetails[0]}</p>
            <p>Name: {patientDetails[1]}</p>
            <p>Diagnostic: {patientDetails[2]}</p>
          </div>
        )}

        <div>
          <h1>Edit Patient Details</h1>
          <form className='form-register'>
                <div className="all-inputs">
                        <div className="form-outline">
                            <input type="text" id="form3Example3" className="form-control form-control-lg"
                                placeholder="Enter ic" 
                                value={values.ic}
                                onChange = {e => setValues({...values, ic: e.target.value})}/>
                            <label className="form-label" htmlFor="form3Example3"></label>
                        </div>
                        <div className="form-outline">
                        <input type="text" id="form3Example3" className="form-control form-control-lg"
                            placeholder="Enter name" 
                            value={values.name}
                            onChange = {e => setValues({...values, name: e.target.value})}/>
                        <label className="form-label" htmlFor="form3Example3"></label>
                        </div>
                        <div className="form-outline">
                        <input type="text" id="form3Example3" className="form-control form-control-lg"
                            placeholder="Enter diagnostic" 
                            value={values.diagnostic}
                            onChange = {e => setValues({...values, diagnostic: e.target.value})}/>
                        <label className="form-label" htmlFor="form3Example3"></label>
                        </div>
                </div>
                <div className=" d-flex flex-column text-center text-lg-start mt-4 ">
                <button onClick = {saveEdit} type="button" className="btn btn-info"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                    Save edit
                </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}

export default RecordDetails;


