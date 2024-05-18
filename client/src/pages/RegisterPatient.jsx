import React from 'react'
import SidebarMenu from '../components/SidebarMenu'
import "../css/Home.css"
import { useState } from 'react'
import {ethers} from "ethers"

const RegisterPatient = ({state}) => {
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        ic: '',
        name: '',
        diagnostic: '',
        loading: false,
        errorMessage: ''
    });

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const {contract} = state
            const transaction = await contract.setDetails(values.ic, values.name, values.diagnostic)
            await transaction.wait();
            alert("Patient account created successfully.");
            window.location.reload();
        }
        catch(err) {
            setError(err.message)
            alert("Error. Account already exists.")
        }
    }

    return (
        <div className='margin-menu'>
            <SidebarMenu/>
            <div className='div-register-form'>
            <form className='form-register'>
                <div className="d-flex flex-column align-items-center text-center justify-content-lg-start p-4">
                    <p className="fw-bold lead fw-normal mb-0 title">REGISTER PATIENT</p>
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
                                placeholder="Enter ic" 
                                onChange = {e => setValues({...values, ic: e.target.value})}/>
                            <label className="form-label" htmlFor="form3Example3"></label>
                        </div>
                        <div className="form-outline">
                        <input type="text" id="form3Example3" className="form-control form-control-lg"
                            placeholder="Enter name" 
                            onChange = {e => setValues({...values, name: e.target.value})}/>
                        <label className="form-label" htmlFor="form3Example3"></label>
                        </div>
                        <div className="form-outline">
                        <input type="text" id="form3Example3" className="form-control form-control-lg"
                            placeholder="Enter diagnostic" 
                            onChange = {e => setValues({...values, diagnostic: e.target.value})}/>
                        <label className="form-label" htmlFor="form3Example3"></label>
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

export default RegisterPatient;