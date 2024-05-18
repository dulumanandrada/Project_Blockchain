import React from 'react'
import SidebarMenu from '../components/SidebarMenu'
import "../css/Home.css"

const Home = () => {
    return (
        <div className='margin-menu'>
            <SidebarMenu/>
            <div className='welcome-text'>
                <h1>Welcome to Your Medical Records!</h1>
            </div>
        </div>
    )
}

export default Home;
// client/src/assets/doctors.jpg