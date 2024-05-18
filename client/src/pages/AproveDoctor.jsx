import { useEffect, useState } from 'react'
import React from 'react'
import SidebarMenu from "../components/SidebarMenu"
import { useParams } from 'react-router-dom';

const AproveDoctor = ({state}) => {
    const [error, setError] = useState("");
    const [values, setValues] = useState({
        doctorAddr: '',
        loading: false,
        errorMessage: ''
    });
    const aproveDoctor = async () => {
        try {
            const { contract } = state;
            await contract.givePermission(values.doctorAddr);
            alert("Permission Granted Successfully!");
        } catch (err) {
            console.error(err);
            setError("Failed to allow permission to doctor.");
        }
    };

    const revokeDoctor = async () => {
        try {
            const { contract } = state;
            await contract.RevokePermission(values.doctorAddr);
            alert("Permission revoked Successfully!");
        } catch (err) {
            console.error(err);
            setError("Failed to revoke permission to doctor.");
        }
    };
    return (
        <div className='margin-menu'>
            <SidebarMenu />
            <div className='div-register-form'>
                <form className='form-register'>
                    <div className="d-flex flex-column align-items-center text-center justify-content-lg-start p-4">
                        <p className="fw-bold lead fw-normal mb-0 title">Give permission to doctor</p>
                    </div>
                    <div className="text-danger error-content">
                        {error && error}
                    </div>

                    <div className="all-inputs">
                        <div className="form-outline">
                            <input type="text" id="form3Example3" className="form-control form-control-lg"
                                placeholder="Enter doctor address" 
                                onChange = {e => setValues({...values, doctorAddr: e.target.value})}/>
                            <label className="form-label" htmlFor="form3Example3"></label>
                        </div>
                    </div>
                    <div className="allow-btns">
                        <div className=" d-flex flex-column text-center text-lg-start mt-4 ">
                            <button onClick = {aproveDoctor} type="button" className="btn btn-info"
                                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                                Allow doctor
                            </button>
                        </div>
                        <div className=" d-flex flex-column text-center text-lg-start mt-4">
                            <button onClick = {revokeDoctor} type="button" className="btn btn-warning"
                                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                                Revoke doctor
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AproveDoctor;


