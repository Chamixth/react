/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {KTIcon} from '../../../../../../_metronic/helpers'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {
  IUpdateEmail,
  updateEmail,
  IUpdatePassword,
  updatePassword,
} from '../../../../accounts/components/settings/SettingsModel'
import Swal from 'sweetalert2'

import {Gateway} from '../../../../../models/gateway_model'
import {WorkspaceModel} from '../../../../../models/workspace_model'
import {
  createGateway,
  getGatewayByWorkspaceId,
  registerApis,
  updateGateway,
} from '../../../../../services/gatewayService'
import {CreateGatewayModal} from './Create-modal-popup/CreateGatewayPopup'

type Props = {
  workspaceData: WorkspaceModel
}

const passwordFormValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  newPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
})

const GatewayDetails: React.FC<Props> = (props) => {
  //get gateway details
  const [gatewayData, setGatewayData] = useState<Gateway>({})

  const [showGatewayTypeForm, setShowGatewayForm] = useState<boolean>(false)
  const [showGatewayUrlForm, setShowGatewayUrlForm] = useState<boolean>(false)
  const [showWebUrlForm, setShowWebUrlForm] = useState<boolean>(false)
  const [showAuthorizationForm, setShowAuthorizationForm] = useState<boolean>(false)
  const [showSuccessConfigModal, setShowSuccessConfigModal] = useState<boolean>(false)

  const [loading1, setLoading1] = useState(false)
  const [isGateway, setIsGateway] = useState(false)
  const [isWebUrl, setIsWebUrl] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [isGatewayUrl, setIsGatewayUrl] = useState(false)

  //get gateway by workspace id
  useEffect(() => {
    // Fetch gateway data based on workspace ID
    const fetchGatewayData = async () => {
      try {
        const data = await getGatewayByWorkspaceId(props.workspaceData.workspaceId || '',props.workspaceData.userId || '')
        setGatewayData(data)
        console.log(gatewayData, 'mmeka')
      } catch (error) {
        console.error('Error fetching gateway data:', error)
      }
    }

    fetchGatewayData()
  }, [props.workspaceData.workspaceId])

  const gatewayUpdateFormik = useFormik<Gateway>({
    initialValues: {
      ...gatewayData,
    },
    onSubmit: async (values) => {
      console.log(gatewayData, 'nedha', values)
      setLoading1(true)
      try {
        const mergedValues = {
          ...gatewayData, // Current form values
          ...values, // Existing gateway data
        }
        console.log(mergedValues, 'seem')
        if (!gatewayData) {
          // Create a new gateway if it doesn't exist
          await createGateway(mergedValues)
        } else {
          // Update existing gateway
          await updateGateway(mergedValues)
        }
        setGatewayData(mergedValues)
        console.log('Submitted Data:', values)

        if (isGateway) {
          setIsGateway(false)
          setLoading1(false)
          setShowGatewayForm(false)
        }else if (isWebUrl){
          setIsWebUrl(false)
          setLoading1(false)
          setShowWebUrlForm(false)
        }else if (isAuth){
          setIsAuth(false)
          setLoading1(false)
          setShowAuthorizationForm(false)
        }else if (isGatewayUrl){
          setIsGatewayUrl(false)
          setLoading1(false)
          setShowGatewayUrlForm(false)
        }
        gatewayUpdateFormik.setValues({})
      } catch (error) {
        console.error('Error updating gateway data:', error)
        setLoading1(false)
      }
    },
  })

  const registerApisOnCompletion = async () => {
    if (
      gatewayData.webUrl=="" ||
      gatewayData.gatewayType=="" ||
      gatewayData.gatewayUrl=="" ||
      gatewayData.authorization==""
    ) {
      console.log('huk')
      Swal.fire({
        text: 'Please Configure the above Gateway Details',

        icon: 'warning',
        showCancelButton: !0,
        buttonsStyling: !1,
        confirmButtonText: 'Ok Sure',
        cancelButtonText: 'Close',
        customClass: {
          confirmButton: 'btn fw-bold btn-danger',
          cancelButton: 'btn fw-bold btn-active-light-primary',
        },
      })
    } else {
      setShowSuccessConfigModal(true)
    }

    //const registeredApplication = await registerApis(gatewayData?.workspaceId)
    //console.log("Registered apis:", registeredApplication)
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#gatewayused'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Gateway Details</h3>
        </div>
      </div>

      <div id='gatewayused' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='d-flex flex-wrap align-items-center'>
            <div id='kt_gateway' className={' ' + (showGatewayTypeForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Gateway Type</div>
              <div className='fw-bold text-gray-600'>
                {gatewayData?.gateway} - {gatewayData?.gatewayType}
              </div>
            </div>

            <div
              id='kt_gateway_edit'
              className={'flex-row-fluid ' + (!showGatewayTypeForm && 'd-none')}
            >
              <form
                onSubmit={gatewayUpdateFormik.handleSubmit}
                id='kt_change_gateway'
                className='form'
                noValidate
              >
                <div className='row mb-6'>
                  <div className='col-lg-6 mb-4 mb-lg-0'>
                    <div className='fv-row mb-0'>
                      <label className='form-label fs-6 fw-bolder mb-3'>Select Gateway</label>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select example'
                        value={gatewayData?.gateway}
                        onChange={(e) => {
                          if (e.target.value!=""){
                            setGatewayData((data) => {
                              return {
                                ...data, // Spread the existing properties of data
                                gateway: e.target.value, // Update the 'gateway' property
                              }
                            })
                          } else {
                            setGatewayData((data) => {
                              return {
                                ...data, // Spread the existing properties of data
                                gateway: undefined, // Update the 'gateway' property
                              }
                            })
                          }
                          // updateGateway(gatewayData)
                        }}
                      >
                        <option>Select Gateway</option>
                        <option value='TYK'>TYK</option>
                        <option value='WSO2'>WSO2</option>
                        <option value='EVOGATE'>EVOGATE</option>
                        <option value='KONG'>KONG</option>
                      </select>
                      {gatewayUpdateFormik.touched.gateway && gatewayUpdateFormik.errors.gateway && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{gatewayUpdateFormik.errors.gateway}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='fv-row mb-0'>
                      <label className='form-label fs-6 fw-bolder mb-3'>Gateway Type</label>
                      <select
                        className='form-select form-select-solid'
                        aria-label='Select Gateway Type'
                        value={gatewayData?.gatewayType}
                        onChange={(e) => {
                          if (e.target.value!=""){
                            setGatewayData((data) => {
                              return {
                                ...data, // Spread the existing properties of data
                                gatewayType: e.target.value, // Update the 'gateway' property
                              }
                            })
                          } else {
                            setGatewayData((data) => {
                              return {
                                ...data, // Spread the existing properties of data
                                gatewayType: undefined, // Update the 'gateway' property
                              }
                            })
                          }
                          
                          // updateGateway(gatewayData)
                        }}
                      >
                        <option>Select Gateway Type</option>
                        <option value='CLOUD'>Cloud</option>
                        <option value='OPENSOURCE'>Open Source</option>
                      </select>
                      {gatewayUpdateFormik.touched.gatewayType &&
                        gatewayUpdateFormik.errors.gatewayType && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              {gatewayUpdateFormik.errors.gatewayType}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className='d-flex'>
                  <button
                    id='kt_signin_submit'
                    type='submit'
                    className='btn btn-primary  me-2 px-6'
                    onClick={()=>{setIsGateway(true)}}
                  >
                    {!isGateway && 'Update Gateway Details'}
                    {isGateway && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    id='kt_signin_cancel'
                    type='button'
                    onClick={() => {
                      setShowGatewayForm(false)
                    }}
                    className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div
              id='kt_signin_email_button'
              className={'ms-auto ' + (showGatewayTypeForm && 'd-none')}
            >
              <button
                onClick={() => {
                  setShowGatewayForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Change Gateway
              </button>
            </div>
          </div>

          <div className='separator separator-dashed my-6'></div>

          {/*//=============GATEWAY URL===============//*/}
          <div className='d-flex flex-wrap align-items-center '>
            <div id='kt_gatewayUrl' className={' ' + (showGatewayUrlForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Gateway Domain</div>
              <div className='fw-bold text-gray-600'>{gatewayData?.gatewayUrl}</div>
            </div>

            <div
              id='kt_gatewayUrl_edit'
              className={'flex-row-fluid ' + (!showGatewayUrlForm && 'd-none')}
            >
              <form
                onSubmit={gatewayUpdateFormik.handleSubmit}
                id='kt_signin_change_gatewayUrl'
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <div className='col-lg-12'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='gatewayUrl' className='form-label fs-6 fw-bolder mb-3'>
                        Gateway Url
                      </label>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid '
                        id='gatewayUrl'
                        placeholder='https://www.gatewayurl.com/account'
                        value={gatewayData?.gatewayUrl}
                        onChange={(e) => {
                          if (e.target.value!=""){
                            setGatewayData((data) => {
                              return {
                                ...data, // Spread the existing properties of data
                                gatewayUrl: e.target.value, // Update the 'gateway' property
                              }
                            })
                          } else {
                            setGatewayData((data) => {
                              return {
                                ...data, // Spread the existing properties of data
                                gatewayUrl: undefined, // Update the 'gateway' property
                              }
                            })
                          }
                          
                          // updateGateway(gatewayData)
                        }}
                      />
                      {gatewayUpdateFormik.touched.gatewayUrl &&
                        gatewayUpdateFormik.errors.gatewayUrl && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              {gatewayUpdateFormik.errors.gatewayUrl}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className='form-text mb-5'>{/*Gateway url is required*/}</div>

                <div className='d-flex'>
                  <button
                    id='kt_gatewayUrl_submit'
                    type='submit'
                    className='btn btn-primary me-2 px-6'
                    onClick={()=>{setIsGatewayUrl(true)}}
                  >
                    {!isGatewayUrl && 'Update Gateway Url'}
                    {isGatewayUrl && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowGatewayUrlForm(false)
                    }}
                    id='kt_gatewayUrl_cancel'
                    type='button'
                    className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div
              id='kt_signin_gatewayUrl_button'
              className={'ms-auto ' + (showGatewayUrlForm && 'd-none')}
            >
              <button
                onClick={() => {
                  setShowGatewayUrlForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Change Gateway Url
              </button>
            </div>
          </div>

          <div className='separator separator-dashed my-6'></div>

          {/*//=============WEB URL===============//*/}

          <div className='d-flex flex-wrap align-items-center '>
            <div id='kt_webUrl' className={' ' + (showWebUrlForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Application Domain</div>
              <div className='fw-bold text-gray-600'>{gatewayData?.webUrl}</div>
            </div>

            <div id='kt_webUrl_edit' className={'flex-row-fluid ' + (!showWebUrlForm && 'd-none')}>
              <form
                onSubmit={gatewayUpdateFormik.handleSubmit}
                id='kt_signin_change_webUrl'
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <div className='col-lg-12'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='webUrl' className='form-label fs-6 fw-bolder mb-3'>
                        Web Url
                      </label>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid '
                        id='webUrl'
                        placeholder='https://www.webUrl.com/account'
                        value={gatewayData?.webUrl}
                        onChange={(e) => {
                          if (e.target.value!=""){
                            setGatewayData((data) => {
                              return {
                                ...data, // Spread the existing properties of data
                                webUrl: e.target.value, // Update the 'gateway' property
                              }
                            })
                          } else {
                            setGatewayData((data) => {
                              return {
                                ...data, // Spread the existing properties of data
                                webUrl: undefined, // Update the 'gateway' property
                              }
                            })
                          }
                          
                          // updateGateway(gatewayData)
                        }}
                      />
                      {gatewayUpdateFormik.touched.webUrl && gatewayUpdateFormik.errors.webUrl && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>{gatewayUpdateFormik.errors.webUrl}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='form-text mb-5'>{/*Web url is required*/}</div>

                <div className='d-flex'>
                  <button id='kt_webUrl_submit' type='submit' className='btn btn-primary me-2 px-6'
                  onClick={()=>{setIsWebUrl(true)}}>
                    {!isWebUrl && 'Update Web Url'}
                    {isWebUrl && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowWebUrlForm(false)
                    }}
                    id='kt_webUrl_cancel'
                    type='button'
                    className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div id='kt_signin_webUrl_button' className={'ms-auto ' + (showWebUrlForm && 'd-none')}>
              <button
                onClick={() => {
                  setShowWebUrlForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Change Web Url
              </button>
            </div>
          </div>

          <div className='separator separator-dashed my-6'></div>

          {/*//=============AUTHORIZATION===============//*/}
          <div className='d-flex flex-wrap align-items-center '>
            <div id='kt_authorization' className={' ' + (showAuthorizationForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'> Gateway Access Key</div>
              <div className='fw-bold text-gray-600'>{gatewayData?.authorization}</div>
            </div>

            <div
              id='kt_authorization_edit'
              className={'flex-row-fluid ' + (!showAuthorizationForm && 'd-none')}
            >
              <form
                onSubmit={gatewayUpdateFormik.handleSubmit}
                id='kt_signin_change_authorization'
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <div className='col-lg-12'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='authorization' className='form-label fs-6 fw-bolder mb-3'>
                        Gateway Access Key
                      </label>
                      <input
                        type='string'
                        className='form-control form-control-lg form-control-solid '
                        id='authorization'
                        placeholder='xxxxxxxxxxxxxxxxxxxxxxxxxx'
                        value={gatewayData?.authorization}
                        onChange={(e) => {
                          if (e.target.value!=""){
                            setGatewayData((data) => {
                              return {
                                ...data, // Spread the existing properties of data
                                authorization: e.target.value, // Update the 'gateway' property
                              }
                            })
                          } else {
                            setGatewayData((data) => {
                              return {
                                ...data, // Spread the existing properties of data
                                authorization: undefined, // Update the 'gateway' property
                              }
                            })
                          }
                          
                          // updateGateway(gatewayData)
                        }}
                      />
                      {gatewayUpdateFormik.touched.authorization &&
                        gatewayUpdateFormik.errors.authorization && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              {gatewayUpdateFormik.errors.authorization}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className='form-text mb-5'>{/*Web url is required*/}</div>

                <div className='d-flex'>
                  <button
                    id='kt_authorization_submit'
                    type='submit'
                    className='btn btn-primary me-2 px-6'
                    onClick={()=>{setIsAuth(true)}}
                  >
                    {!isAuth && 'Update Authorization Key'}
                    {isAuth && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowAuthorizationForm(false)
                    }}
                    id='kt_authorization_cancel'
                    type='button'
                    className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div
              id='kt_signin_authorization_button'
              className={'ms-auto ' + (showAuthorizationForm && 'd-none')}
            >
              <button
                onClick={() => {
                  setShowAuthorizationForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Change Gateway Access Key
              </button>
            </div>
          </div>

          <div
            className={`notice d-flex  rounded  border border-dashed p-6 mt-10 ${
              gatewayData?.gateway &&
              gatewayData.webUrl &&
              gatewayData.gatewayType &&
              gatewayData.gatewayUrl &&
              gatewayData.authorization
                ? 'bg-light-success border-success'
                : 'bg-light-danger border-danger'
            }`}
          >
            <KTIcon
              iconName='key'
              className={`fs-2tx  me-4  ${
                gatewayData?.gateway &&
                gatewayData.webUrl &&
                gatewayData.gatewayType &&
                gatewayData.gatewayUrl &&
                gatewayData.authorization
                  ? 'text-success'
                  : 'text-danger'
              }`}
            />

            <div className='d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap'>
              <div className='mb-3 mb-md-0 fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>Save Gateway Configuration</h4>
                <div className='fs-6 text-gray-600 pe-7'>
                  A dedicated gateway for your enterprise applications is just one click away
                </div>
              </div>
              <a
                href='#'
                onClick={() => {
                  registerApisOnCompletion()
                }}
                className={`btn  px-6 ${
                  gatewayData?.gateway &&
                  gatewayData.webUrl &&
                  gatewayData.gatewayType &&
                  gatewayData.gatewayUrl &&
                  gatewayData.authorization
                    ? 'btn-success'
                    : 'btn-danger'
                } align-self-center text-nowrap`}
             
              >
                Configure
              </a>
            </div>
          </div>
        </div>
      </div>
      <CreateGatewayModal
        show={showSuccessConfigModal}
        handleCloseModal={() => setShowSuccessConfigModal(false)}
        workspaceId={gatewayData.workspaceId}
      />
    </div>
  )
}

export {GatewayDetails}
