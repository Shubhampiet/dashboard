import React, { useEffect, useState } from 'react';

import { DateRange } from "react-date-range"

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


import { BsChevronDown } from 'react-icons/bs';
import { AiFillAndroid } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';
import { LiaLongArrowAltUpSolid } from 'react-icons/lia';
import { RiAppleFill } from 'react-icons/ri'
import { RiArrowUpSLine } from 'react-icons/ri';

import { statsURL } from '../assets/apiConfig'
import { dataURL } from '../assets/apiConfig'

import DashboardStats from './DashboardStats';


const DashboardMain = ({ handleState }) => {


  // dropdown
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(50)
  const [limit, setLimit] = useState(50)
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const itemsPerPage = [10, 50, 100, 500, 1000]

  const handleDropdownBtn = () => {
    toggleIsOpen()
    console.log(isOpen);
  }
  const handleSelectedItem = (number) => {
    toggleIsOpen()
    setSelectedValue(number)
    setLimit(number)
    setCurrentPage(1)
    // console.log(limit);
  }
  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  // Calender

  const [fromDate, setFromDate] = useState("2022-01-01")
  const [toDate, setToDate] = useState("2023-05-01")

  const [calenderVisibility, setCalendervisibility] = useState(false)
  const [dataFetch, setDataFetch] = useState(false)

  // changing date into required format
  function formatDateRequired(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // dateRange state
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  // handleChangeCalender
  const handleChangeCalender = (item) => {
    setState([item.selection])
    let fromDa = formatDateRequired(item.selection.startDate)
    let toDa = formatDateRequired(item.selection.endDate)

    setFromDate(fromDa)
    setToDate(toDa)
  }

  // handleCalenderClear
  const handleCalenderClear = () => {
    setFromDate(null)
    setToDate(null)
    setCalendervisibility(false)
  }

  // handleCalenderSet
  const handleCalenderSet = () => {
    setCalendervisibility(false)
    setDataFetch(!dataFetch)
  }


  // const [page, setPage] = useState(1)
  const [statsData, setStatsData] = useState([])
  const [tableData, setTableData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  const statsUrlWithParams = `${statsURL}?fromdate=${fromDate}&todate=${toDate}&page=${currentPage}&limit=${limit}`
  const dataUrlWithParams = `${dataURL}?fromdate=${fromDate}&todate=${toDate}&page=${currentPage}&limit=${limit}`

  const tableHeader = ["Date", "Day Installs", "Platforms", "Day UnInstalls", "Platform", "Churn Rate", "Churn Platform"]


  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    async function fetchStatsData() {
      try {
        const response = await fetch(statsUrlWithParams);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStatsData(data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    async function fetchData() {
      try {
        const response = await fetch(dataUrlWithParams);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const dataD = await response.json();
        setTableData(dataD.data.data);
        
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchStatsData();
    fetchData();
  }, [limit, currentPage, dataFetch]);

console.log("statsData",statsData);

  function formatDate(inputDate) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(inputDate);
    return date.toLocaleDateString('en-US', options);
  }

  const numberOfPages = pages.filter((pageNumber) => pageNumber <= Math.ceil(120 / limit))
console.log("nop",numberOfPages);
console.log("td",tableData.length);
  return (
    <div className="height-100vh">

      <div className="height-30vh">
        {statsData && <DashboardStats
          totalInstall={statsData.totalInstall}
          activeinstall={statsData.activeinstall}
          churn={statsData.churn}
          totaluninstall={statsData.totaluninstall}
          aliveappusers={statsData.aliveappusers}
          alivechurn={statsData.alivechurn}
          handleState={handleState}
        />}
      </div>

      <div className='dashboardMain bg-color-gray color-white height-65vh '>


        <div className="entries-duration d-flex ">
          <div className="entries d-flex">
            <p>Show</p>
            <div className="dropdown color-white">
              <button onClick={handleDropdownBtn}>
                {selectedValue} {isOpen ? <RiArrowUpSLine /> : <BsChevronDown />}
              </button>
              {isOpen &&
                <div className="selectedItems">
                  {itemsPerPage.map((number) => (
                    <a key={number} onClick={() => handleSelectedItem(number)} className='selectedItems-txt cursor-pointer'>{number}</a>
                  ))
                  }
                </div>
              }
            </div>
            <p>Entries</p>
          </div>


          <div className="duration cursor-pointer" >

            <span className="dateRange" onClick={() => { setCalendervisibility(!calenderVisibility) }}>
              <span>{fromDate}</span>   To <span>{toDate}</span>
            </span>

            {calenderVisibility && <div className='duration-calender-wrapper'>
              <DateRange
                className='duration-calender'
                editableDateInputs={true}
                onChange={handleChangeCalender}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
              <div className="calenderBtns">
                <button className='clearBtn' onClick={handleCalenderClear}>clear</button>
                <button className='setBtn' onClick={handleCalenderSet}>Set</button>
              </div>
            </div>
            }
          </div>

        </div>
        <div className="tableData">
          <table>
            <thead>
              <tr className='tableRow border'>
                {tableHeader.map((item, index) => (
                  <th key={index} className='tableHeader-content tableContent'>{item}</th>
                ))}
              </tr>
            </thead>
            <div className='overflow-scroll height-50vh'>

              {tableData && <tbody>
                {tableData.map((item, index) => (
                  <tr key={index} className='tableRow borderBottom'>
                    <td className='tableHeader-content tableContent'>{formatDate(item.created_At)}</td>
                    <td className='tableHeader-content tableContent'>{item.totalinstall}</td>
                    <td className='tableHeader-content tableContent '>
                      <div className="android-ios">
                        <div className='android-svg'><AiFillAndroid />{item.android_install}</div>
                        <div className='ios-svg'><RiAppleFill />{item.ios_install}</div>
                      </div>
                    </td>
                    <td className='tableHeader-content tableContent'>{item.totaluninstall}</td>
                    <td className='tableHeader-content tableContent'>
                      <div className="android-ios">
                        <div className='android-svg'><AiFillAndroid />{item.android_uninstall}</div>
                        <div className='ios-svg'><RiAppleFill />{item.ios_install}</div>
                      </div>
                    </td>
                    <td className='tableHeader-content tableContent'>{`${item.totalchurn}%`}</td>
                    <td className='tableHeader-content tableContent'>
                      <div className="android-ios">
                        <div className='android-svg'><AiFillAndroid />{item.android_churn}%</div>
                        <div className='ios-svg'><RiAppleFill />{item.ios_churn}%</div>
                      </div>
                    </td>
                  </tr>
                ))
                }
              </tbody>
              }
            </div>
          </table>
        </div>

        <div className="pagination-div">
          <div className="pagination">
            <div className="pagination-items">
              <button onClick={handlePrevPage} disabled={currentPage === 1}><AiOutlineLeft /></button>
              {numberOfPages.length <= 3 && (
                <>
                  {numberOfPages.map((pageNumber, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`pageNumbers ${pageNumber === currentPage ? 'bg-color-orange' : ''}`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </>
              )}
              {numberOfPages.length >= 4 && (
                <>
                  {currentPage < 3 &&
                    <> {numberOfPages.slice(0, 3).map((pageNumber, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`pageNumbers ${pageNumber === currentPage ? 'bg-color-orange' : ''}`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    </>}

                  {(currentPage > 2) && (currentPage < 5) &&
                    <> {numberOfPages.slice(2, 5).map((pageNumber, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`pageNumbers ${pageNumber === currentPage ? 'bg-color-orange' : ''}`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    </>}

                  {currentPage > 4 && currentPage < 7 &&
                    <> {numberOfPages.slice(4, 7).map((pageNumber, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`pageNumbers ${pageNumber === currentPage ? 'bg-color-orange' : ''}`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    </>}

                  {currentPage >= 7 &&
                    <> {numberOfPages.slice(6, 9).map((pageNumber, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`pageNumbers ${pageNumber === currentPage ? 'bg-color-orange' : ''}`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    </>}

                  {currentPage < 7 && <span>...</span>}

                  {numberOfPages.slice(-3).map((pageNumber, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`pageNumbers ${pageNumber === currentPage ? 'bg-color-orange fontWeight-bold' : ''}`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </>
              )
              }
              <button onClick={handleNextPage}><LiaLongArrowAltUpSolid className='bg-color-orange arrowUpBtn' /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardMain