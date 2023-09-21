/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {KTIcon} from '../../../helpers'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'

type Props = {
    className: string
    color: string
  }
  

const ApplicationCard: React.FC<Props> = ({className, color}) => {


  return (
    <div className={`card ${className}`}>
    {/* begin::Body */}
    <div className='card-body p-0'>
      {/* begin::Header */}
      <div className={`px-9 pt-4 card-rounded h-200px w-100 bg-${color}`}>
        {/* begin::Heading */}
        <div className='d-flex flex-stack'>
          <h3 className='m-0 text-white text-center fw-bold fs-3'></h3>
          <div className='ms-1'>
            {/* begin::Menu */}
            <button
              type='button'
              className={`btn btn-sm btn-icon btn-color-white btn-active-white btn-active-color-${color} border-0 me-n3`}
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='top-end'
            >
              <KTIcon iconName='category' className='fs-2' />
            </button>
            <Dropdown1 />
            {/* end::Menu */}
          </div>
        </div>
        {/* end::Heading */}
        {/* begin::Balance */}
        <div className='d-flex text-center flex-column text-white pt-0'>
          <span className='fw-bold fs-2 pt-1'>$37,562.00</span>
          <span className='fw-semibold fs-7'>You Balance</span>
        </div>
        {/* end::Balance */}
      </div>
      {/* end::Header */}
      <div className='card-p mt-n20 position-relative'>
          {/* begin::Row */}
          <div className='row g-0 flex-nowrap'>
            {/* begin::Col */}
            <div className='col bg-light-warning px-6 py-3 rounded-2 me-4 mb-7'>
                <div className='d-flex justify-content-between align-items-end'>
                <a href='#' className='text-warning fw-semibold fs-2 my-0'>
               10 
              </a> 
              <KTIcon iconName='chart-simple' className='fs-2x text-warning d-blk my-1' />
           
              </div>
              <a href='#' className='text-warning fw-semibold fs-7'>
                datatransfer
              </a>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-primary px-6 py-3 rounded-2 mb-7'>
            <div className='d-flex justify-content-between align-items-end'>
            <a href='#' className='text-primary fw-semibold fs-2 my-0'>
                234
              </a>
              <KTIcon iconName='plus' className='fs-2x text-primary d-blk my-1' />
             
              </div>
              <a href='#' className='text-primary fw-semibold fs-7'>
                datatransfer
              </a>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
          {/* begin::Row */}
           <div className='row g-0 flex-nowrap'>
            {/* begin::Col */}
            <div className='col bg-light-danger px-6 py-3 rounded-2 me-4 mb-7'>
                <div className='d-flex justify-content-between align-items-end'>
                <a href='#' className='text-danger fw-semibold fs-2 my-0'>
               10 
              </a> 
              <KTIcon iconName='chart-simple' className='fs-2x text-danger d-blk my-1' />
           
              </div>
              <a href='#' className='text-danger fw-semibold fs-7'>
                datatransfer
              </a>
            </div>
            {/* end::Col */}
            {/* begin::Col */}
            <div className='col bg-light-success px-6 py-3 rounded-2 mb-7'>
            <div className='d-flex justify-content-between align-items-end'>
            <a href='#' className='text-success fw-semibold fs-2 my-0'>
                234
              </a>
              <KTIcon iconName='plus' className='fs-2x text-success d-blk my-1' />
             
              </div>
              <a href='#' className='text-success fw-semibold fs-7'>
                datatransfer
              </a>
            </div>
            {/* end::Col */}
          </div>
          {/* end::Row */}
        </div>
    </div>
    {/* end::Body */}
  </div>




  )
}


export {ApplicationCard}
