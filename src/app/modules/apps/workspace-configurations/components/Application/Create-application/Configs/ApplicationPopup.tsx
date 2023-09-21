/* eslint-disable jsx-a11y/anchor-is-valid */

import {useEffect, useState} from 'react'
import { StepProps } from '../../IApplicationModels'

const ApplicationPopup = ({data, updateData, hasError}: StepProps) => {
  const [isGateway, setIsGateway] = useState(true)
  const [gatewayType, setGatewayType] = useState('TYK') // Default value is 'TYK'

  // useEffect(() => {
  //   // When the component loads, update the 'isGateway' and 'gatewayType' fields in the 'data' object
  //   if (isGateway) {
  //     updateData({isGateway: 'true', gatewayType: gatewayType})
  //   } else {
  //     updateData({isGateway: 'false', gatewayType: undefined})
  //   }
  // }, [isGateway, gatewayType, updateData])
  return (
    <div className='curent'>
      <div className='w-100'>
        <div className='pb-10 pb-lg-15'>
          {/*begin::Title*/}
          <h2 className='fw-bold text-dark'>Workspace Info</h2>
          {/*end::Title*/}
          {/*begin::Notice*/}
          <div className='text-muted fw-semibold fs-6'>
            If you need more info, please check out &nbsp;
            <a href='#' className='link-primary fw-bold'>
              Help Page
            </a>
            .
          </div>
          {/*end::Notice*/}
        </div>
        {/*begin::Form Group */}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Workspace Name</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          {/* <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='workspacename'
            placeholder=''
            value={data.workspaceName}
            onChange={(e) =>
              updateData({
                workspaceName: e.target.value,
              })
            }
          /> */}
          {/* {!data.workspaceName && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='workspacename' data-validator='notEmpty' className='fv-help-block'>
                workspace name is required
              </div>
            </div>
          )} */}
        </div>
        {/*end::Form Group */}
        {/*begin::Form Group */}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2 form-label'>
            <span className=''>Organization Name</span>
            {/*<i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>*/}
          </label>
          {/* <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='organization'
            placeholder=''
            value={data.Organization}
            onChange={(e) =>
              updateData({
                Organization: e.target.value,
              })
            }
          />
          {!data.Organization && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='organization' data-validator='notEmpty' className='fv-help-block'>
                organization name is required
              </div>
            </div>
          )} */}
        </div>
        {/*end::Form Group */}
        <div className='fv-row mb-10'>
          <div className='d-flex flex-stack'>
            {/* Label */}
            <div className='me-5'>
              <label className='fs-5 fw-semibold fw-semibold form-label'>
                Gateway Configuration?
              </label>
              <div className='fs-7 fw-semibold text-muted'>
                {' '}
                Does your workspace require a gateway configuration.
              </div>
            </div>
            {/* Switch */}
            <label className='form-check form-switch form-check-custom form-check-solid'>
              <input
                className='form-check-input'
                type='checkbox'
                checked={isGateway}
                onChange={(e) => {
                  setIsGateway(e.target.checked)
                }}
              />
              <span className='form-check-label fw-semibold text-muted'>Active Gateway</span>
            </label>
          </div>
        </div>
        {/*begin::Form Group */}
        {isGateway && (
          <div className='fv-row'>
            {/* begin::Label */}
            <label className='d-flex align-items-center fs-5 fw-semibold mb-4'>
              <span className='required'>Gateway Type</span>

              <i
                className='fas fa-exclamation-circle ms-2 fs-7'
                data-bs-toggle='tooltip'
                title='Select your app category'
              ></i>
            </label>
            {/* end::Label */}
            <div>
              {/*begin:Option */}
              <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  <span className='symbol symbol-50px me-6'>
                    <span className='symbol-label bg-light-primary'>
                      {/*<KTIcon iconName='compass' className='fs-1 text-primary' />*/}
                      <img src='./media/stock/gateways/tyk.png' alt='' className='mw-100 p-3' />
                    </span>
                  </span>

                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6'>Tyk API Gateway</span>
                    <span className='fs-7 text-muted'>
                      API Gateway for secure, scalable, and managed API solutions.
                    </span>
                  </span>
                </span>

                <span className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='TYK'
                    value='TYK'
                    // checked={data.gatewayType === 'TYK'}
                    onChange={(e) => setGatewayType(e.target.value)}
                  />
                </span>
              </label>
              {/*end::Option */}

              {/*begin:Option */}
              <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  <span className='symbol symbol-50px me-6'>
                    <span className='symbol-label bg-light-danger'>
                      {/*<KTIcon iconName='category' className='fs-1 text-danger' />*/}
                      <img src='./media/stock/gateways/wso2.png' alt='' className='mw-100 p-3' />
                    </span>
                  </span>

                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6'>WSO2 API Gateway</span>
                    <span className='fs-7 text-muted'>
                      Secure, scalable, and flexible API management and integration platform.
                    </span>
                  </span>
                </span>

                <span className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='WSO2'
                    value='WSO2'
                    // checked={data.gatewayType === 'WSO2'}
                    onChange={(e) => setGatewayType(e.target.value)}
                  />
                </span>
              </label>
              {/*end::Option */}

              {/*begin:Option */}
              <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  <span className='symbol symbol-50px me-6'>
                    <span className='symbol-label bg-light-success'>
                      {/*<KTIcon iconName='timer' className='fs-1 text-success' />*/}
                      <img src='./media/stock/gateways/kong.png' alt='' className='mw-100 p-3' />
                    </span>
                  </span>

                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6'>Kong API Gateway</span>
                    <span className='fs-7 text-muted'>
                      Scalable, Open-source API Gateway for Microservices and APIs.
                    </span>
                  </span>
                </span>

                <span className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='KONG'
                    value='KONG'
                    // checked={data.gatewayType === 'KONG'}
                    onChange={(e) => setGatewayType(e.target.value)}
                  />
                </span>
              </label>
              {/*end::Option */}

              {/*begin:Option */}
              <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  <span className='symbol symbol-50px me-6'>
                    <span className='symbol-label bg-light-warning'>
                      {/*<KTIcon iconName='timer' className='fs-1 text-success' />*/}
                      <img src='./media/stock/gateways/evogate.png' alt='' className='mw-100 p-3' />
                    </span>
                  </span>

                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6'>EvoGate API Gateway</span>
                    <span className='fs-7 text-muted'>
                      Centralizes, manages, secures, and routes API requests efficiently.
                    </span>
                  </span>
                </span>

                <span className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='EVOGATE'
                    value='EVOGATE'
                    // checked={data.gatewayType === 'EVOGATE'}
                    onChange={(e) => setGatewayType(e.target.value)}
                  />
                </span>
              </label>
              {/*end::Option */}
            </div>
          </div>
        )}
        {/*end::Form Group */}
      </div>
    </div>
  )
}

export {ApplicationPopup}
