import React, { useEffect, useState } from 'react'
import "../assets/css/common.css"
import logo from "../assets/images/logo.png"
import { RxDashboard } from 'react-icons/rx';
import { BiUserPlus } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import { FiVideo } from 'react-icons/fi';
import { MdOutlineReportProblem } from 'react-icons/md';
import { CgDisplayFlex } from 'react-icons/cg';
import { FiInfo } from 'react-icons/fi';
import { AiOutlineFileText } from 'react-icons/ai';
import { MdOutlineNotifications } from 'react-icons/md';
import DashboardMain from './DashboardMain';


const LeftHandler = () => {
    const [ActiveDiv, setAvtiveDiv] = useState(false)
    const [lHVisibility, setLHVisibility] = useState(false)
    const handleClick = () => {
        setLHVisibility(false)
        setAvtiveDiv(true)
    }
    const handleState = () => {
        setLHVisibility(true)
        const leftHandler = document.querySelector('.LeftHandler');
        leftHandler.classList.toggle('lhVisible');
    }
    useEffect(() => {
        console.log("useEffect");
    }, [lHVisibility])
    console.log(lHVisibility);
    return (
        <div className="leftHandlerOuter-wrapper d-flex bg-color-black position-relative" >

            <div className={`bg-color-gray LeftHandler lhVisible lhTransform ${lHVisibility ? "display-block" : "dashboard-slide"}`}>
                <div className="logo">
                    <img src={logo} alt="" />
                </div>

                <div className="items">
                    <div onClick={handleClick} className={`d-flex dashboard-slide f-gap-15 item cursor-pointer ${ActiveDiv ? "bg-color-orange" : " "}`}>
                        <span className='items-icons color-white'><RxDashboard /></span>
                        <span className='items-text color-white'>Dashboard</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><FaRegUser /></span>
                        <span className='items-text color-white'>Wow Users</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><FiVideo /></span>
                        <span className='items-text color-white'>Video Clips</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><MdOutlineReportProblem /></span>
                        <span className='items-text color-white'>Reported Content</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><CgDisplayFlex /></span>
                        <span className='items-text color-white'>Category</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><FiInfo /></span>
                        <span className='items-text color-white'>Info Page</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><AiOutlineFileText /></span>
                        <span className='items-text color-white'>FAQ</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><MdOutlineNotifications /></span>
                        <span className='items-text color-white'>Push Notification</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><BiUserPlus /></span>
                        <span className='items-text color-white'>Internal User</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><BiUserPlus /></span>
                        <span className='items-text color-white'>Explict Content</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><BiUserPlus /></span>
                        <span className='items-text color-white'>Feedback Messages</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><BiUserPlus /></span>
                        <span className='items-text color-white'>KYC</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><BiUserPlus /></span>
                        <span className='items-text color-white'>Coin Withdrawal Request</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><BiUserPlus /></span>
                        <span className='items-text color-white'>Coin Purchased</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><BiUserPlus /></span>
                        <span className='items-text color-white'>Coin Transfer History</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><BiUserPlus /></span>
                        <span className='items-text color-white'>Coin Earning History</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><BiUserPlus /></span>
                        <span className='items-text color-white'>Free Coin Earning</span>
                    </div>
                    <div className="d-flex f-gap-15 item cursor-pointer">
                        <span className='items-icons color-white'><BiUserPlus /></span>
                        <span className='items-text color-white'>Users Deleted</span>
                    </div>
                </div>
            </div>
            <div className="dashboard-wrapper">
                <DashboardMain handleState={handleState} />
            </div>
        </div>
    )
}

export default LeftHandler