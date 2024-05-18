import React from 'react'
import SidebarMenu from '../components/SidebarMenu'
import "../css/Home.css"
import { useState } from 'react'

const RegisterDoctor = ({state}) => {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        ic: '',
        name: '',
        qualification: '',
        loading: false,
        errorMessage: ''
    });

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const {contract} = state
            console.log(contract);
            const transaction = await contract.setDoctor(values.ic, values.name, values.qualification)
            await transaction.wait();
            alert("Doctor account created successfully.");
            window.location.reload();
        }
        catch(err) {
            setError(err.message)
            alert("Error. Account already exists.")
        }
        console.log('here');
    }

    return (
        <div className='margin-menu'>
            <SidebarMenu/>
            <div className='div-register-form'>
                <form className='form-register'>
                    <div className="d-flex flex-column align-items-center text-center justify-content-lg-start p-4">
                        <p className="fw-bold lead fw-normal mb-0 title">REGISTER DOCTOR</p>
                    </div>
                    <div className="text-success error-content">
                        {message && message}
                    </div>
                    <div className="text-danger error-content">
                        {error && error}
                    </div>

                    <div className="all-inputs">
                        <div className="form-outline">
                            <input type="text" id="form3Example3" className="form-control form-control-lg"
                                placeholder="Enter name" 
                                onChange = {e => setValues({...values, name: e.target.value})}/>
                            <label className="form-label" htmlFor="form3Example3"></label>
                        </div>
                        <div className="form-outline">
                            <input type="text" id="form3Example3" className="form-control form-control-lg"
                                placeholder="Enter ic" 
                                onChange = {e => setValues({...values, ic: e.target.value})}/>
                            <label className="form-label" htmlFor="form3Example3"></label>
                        </div>
                            <div className="form-outline">
                            <input type="text" id="form3Example4" className="form-control form-control-lg"
                                placeholder="Enter qualification" 
                                onChange = {e => setValues({...values, qualification: e.target.value})}/>
                            <label className="form-label" htmlFor="form3Example4"></label>
                            </div>
                    </div>

                    <div className=" d-flex flex-column text-center text-lg-start mt-4 ">
                    <button onClick = {handleRegister} type="button" className="btn btn-info"
                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                        Register
                    </button>
                    </div>
                </form>
             </div>
        </div>
    )
}

export default RegisterDoctor;