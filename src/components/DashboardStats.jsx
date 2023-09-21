import React from 'react'
import '../assets/css/common.css'
import { RiInstallFill } from 'react-icons/ri'
import { PiCameraRotateFill } from 'react-icons/pi'
import { RiExchangeBoxFill } from 'react-icons/ri'
import { RiUninstallFill } from 'react-icons/ri'
import { FaUserCheck } from 'react-icons/fa'
import { RiExchangeFill } from 'react-icons/ri'
import { FaBars } from 'react-icons/fa'

const DashboardStats = (props) => {
 
  return (
    <div className='dashboardStats-items d-flex color-white flex-wrap bg-color-gray'>
      <div className="hem">
        <FaBars onClick={props.handleState}/>
      </div>
      <div className="dashboardStats-item d-flex">
        <div className="stats-icon">
          <RiInstallFill />
        </div>
        <div className="stats-text d-flex  f-column">
          <span className="stats-value">{props.totalInstall}</span>
          <span className="stats-title">App Installs</span>
        </div>
      </div>
      <div className="dashboardStats-item d-flex">
        <div className="stats-icon">
          <PiCameraRotateFill />
        </div>
        <div className="stats-text d-flex  f-column">
          <span className="stats-value">{props.activeinstall}</span>
          <span className="stats-title">Active Installs</span>
        </div>
      </div>
      <div className="dashboardStats-item d-flex">
        <div className="stats-icon">
          <RiExchangeBoxFill />
        </div>
        <div className="stats-text d-flex  f-column">
          <span className="stats-value">{props.churn}</span>
          <span className="stats-title">Churn Rate</span>
        </div>
      </div>
      <div className="dashboardStats-item d-flex">
        <div className="stats-icon">
          <RiUninstallFill />
        </div>
        <div className="stats-text d-flex  f-column">
          <span className="stats-value">{props.totaluninstall}</span>
          <span className="stats-title">App Un-Installed</span>
        </div>
      </div>
      <div className="dashboardStats-item d-flex">
        <div className="stats-icon">
          <FaUserCheck />
        </div>
        <div className="stats-text d-flex  f-column">
          <span className="stats-value">{props.aliveappusers}</span>
          <span className="stats-title">Alive Apps Users</span>
        </div>
      </div>
      <div className="dashboardStats-item d-flex">
        <div className="stats-icon">
          <RiExchangeFill />
        </div>
        <div className="stats-text d-flex  f-column">
          <span className="stats-value">{props.alivechurn}</span>
          <span className="stats-title">Alive Churn Rate</span>
        </div>
      </div>
    </div>
  )
}

export default DashboardStats