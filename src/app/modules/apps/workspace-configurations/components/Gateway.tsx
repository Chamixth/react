/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Card5} from '../../../../../_metronic/partials/content/cards/Card5'
import { GatewayDetails } from './Gateway/GatewayDetails'
import { Link } from 'react-router-dom'
import { WorkspaceModel } from '../../../../models/workspace_model'

type Props = {
  workspaceData: WorkspaceModel
}

export function Gateway(props:Props) {
  return (
    <>
      {/*<div className='d-flex flex-wrap flex-stack mb-6'>
            <span>
              <h3 className='fw-bolder my-2'>
                My Applications
               
              </h3>
              <ul className='breadcrumb fw-semibold fs-8 my-1'>
                <li className='breadcrumb-item text-muted'>
                  <Link to={`/workspaces`}>
                    <a href='#' className='text-muted text-hover-primary'>
                      Workspaces
                    </a>
                  </Link>
                </li>
                <li className='breadcrumb-item text-muted'>Applications</li>
              </ul>
            </span>
            <div className='d-flex flex-wrap my-2'>
              <div className='me-4'>
                <div className='d-flex align-items-center position-relative'>
                  <i className='ki-outline ki-magnifier fs-3 position-absolute ms-3'></i>
                  <input
                    type='text'
                    id='kt_filter_search'
                    className='form-control form-control-sm border-body bg-body w-170px ps-10'
                    placeholder='Search Application'
                  />
                </div>
              </div>
           
            </div>
          </div>*/}

    <GatewayDetails workspaceData={props.workspaceData} />
  
    </>
  )
}
