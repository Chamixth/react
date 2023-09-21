import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {createPortal} from 'react-dom'
import Swal from 'sweetalert2'
import {Auth0Config} from '../../../../../../models/auth_model'
import {
  createAuth0,
  getAuth0ByWorkspaceId,
  updateAuth0,
  deleteAuth0,
} from '../../../../../../services/authServices/auth0Service'
import {PropagateLoader} from 'react-spinners'
import { useAuth0 } from '@auth0/auth0-react'

type Props = {
  workspaceId: string
  authType: string
  handleCloseModal: () => void
}

const AuthConfig = ({workspaceId, authType, handleCloseModal}: Props) => {
  const [auth0Data, setAuth0Data] = useState<Auth0Config>({})
  const [auth0Configured, setAuth0Configured] = useState<boolean>(false)
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessModel, setIsSuccessModel] = useState(false)
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (authType === 'auth0') {
      const userId = user?.sub;
      const fetchAuth0Data = async () => {
        try {
          const data = await getAuth0ByWorkspaceId(workspaceId,userId ||'')
          setAuth0Data(data)
          if (auth0Data.auth0Domain != undefined || auth0Data.auth0Domain != '') {
            setAuth0Configured(true)
          }
        } catch (error) {
          console.error('Error fetching gateway data:', error)
        }
      }

      fetchAuth0Data()
    }
  }, [workspaceId])

  const resetStates = () => {
    setIsSuccessModel(false)
    setIsSubmitting(false)
    setHasError(false)
  }

  const handleClose = () => {
    handleCloseModal()
    setTimeout(resetStates, 1000)
  }

  const handleDelete = (data: Auth0Config) => {
    Swal.fire({
      text: 'Are you sure you want to remove authentication configuration of ' + workspaceId + ' ?',

      icon: 'warning',
      showCancelButton: !0,
      buttonsStyling: !1,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No, cancel',
      customClass: {
        confirmButton: 'btn fw-bold btn-danger',
        cancelButton: 'btn fw-bold btn-active-light-primary',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deletedAuth = await deleteAuth0(data)
        if (deletedAuth['operation'] == 'Success') {
          Swal.fire({
            icon: 'success',
            text: 'You have removed authentication configuration of ' + workspaceId + '!.',
            buttonsStyling: !1,
            confirmButtonText: 'Ok, got it!',
            customClass: {confirmButton: 'btn fw-bold btn-primary'},
          }).then(() => {
            setAuth0Configured(false)
            setAuth0Data({})
            window.location.reload()
          })
        } else {
          Swal.fire('Error!', 'There was an error while deleting the dto.', 'error')
        }
      }
    })
  }

  const submit = async () => {
    if (authType === 'auth0') {
      let auth0: Auth0Config = auth0Data
      auth0.workspaceId = workspaceId
      auth0.auth0RedirectUrl = 'http://localhost:4200'
      setIsSubmitting(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        if (auth0Configured) {
          auth0.auth0Id = auth0Data.auth0Id
          const updatedAuth0 = await updateAuth0(auth0)
          if (updatedAuth0.workspaceId !== '') {
            // if (updateTemporaryOnChangesDtos) {
            //   updateTemporaryOnChangesDtos(updatedModel);
            // }
            setIsSuccessModel(true)
          }
        } else {
          const userId = user?.sub;
          auth0.userId=userId
          auth0.auth0Id = ''
          const createdAuth0 = await createAuth0(auth0)
          if (createdAuth0.workspaceId !== '') {
            // if (updateTemporaryOnChangesDtos) {
            //   updateTemporaryOnChangesDtos(createdModel);
            // }
            setIsSuccessModel(true)
            setAuth0Configured(true)
          }
        }
      } catch (error) {
        console.error('Error creating model:', error)
        setIsSuccessModel(false)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      Swal.fire({
        text: 'Please Configure the above Authentication Details',

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
    }
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0 cursor-pointer'>
        <div className='card-title m-0'>
          <button
            className='btn btn-sm btn-icon btn-hover-color-primary h-30px ms-0'
            onClick={() => handleClose()}
          >
            <i className='ki-duotone ki-black-left fs-2 text-gray-500'></i>
          </button>
          {authType === 'aresauth' && <h3 className='fw-bolder m-0'>Aresauth Configuration</h3>}
          {authType === 'auth0' && <h3 className='fw-bolder m-0'>Auth0 Configuration</h3>}
          {authType === 'okta' && <h3 className='fw-bolder m-0'>Okta Configuration</h3>}
          {authType === 'casdoor' && <h3 className='fw-bolder m-0'>Casdoor Configuration</h3>}
        </div>
      </div>

      <div className='card-body border-top p-9'>
        {authType === 'auth0' && (
          <div id='auth0' className='collapse show px-15 py-3'>
            <div className='fv-row mb-9'>
              <label htmlFor='domain' className='form-label fs-6 fw-bolder mb-3'>
                Domain
              </label>
              <input
                type='string'
                className='form-control form-control-lg form-control-solid '
                id='domain'
                placeholder='Enter domain'
                value={auth0Data.auth0Domain}
                onChange={(e) => {
                  if (e.target.value != '') {
                    setAuth0Data((data) => {
                      return {
                        ...data,
                        auth0Domain: e.target.value,
                      }
                    })
                  } else {
                    setAuth0Data((data) => {
                      return {
                        ...data,
                        auth0Domain: undefined,
                      }
                    })
                  }
                }}
              />
            </div>

            <div className='fv-row mb-9'>
              <label htmlFor='clientId' className='form-label fs-6 fw-bolder mb-3'>
                Client ID
              </label>
              <input
                type='string'
                className='form-control form-control-lg form-control-solid '
                id='clientId'
                placeholder='Enter client Id'
                value={auth0Data.auth0ClientId}
                onChange={(e) => {
                  if (e.target.value != '') {
                    setAuth0Data((data) => {
                      return {
                        ...data,
                        auth0ClientId: e.target.value,
                      }
                    })
                  } else {
                    setAuth0Data((data) => {
                      return {
                        ...data,
                        auth0ClientId: undefined,
                      }
                    })
                  }
                }}
              />
            </div>

            <div className='fv-row mb-9'>
              <label htmlFor='redirectUri' className='form-label fs-6 fw-bolder mb-3'>
                Redirect URI
              </label>
              <input
                type='string'
                className='form-control form-control-lg form-control-solid '
                id='redirectUriL'
                placeholder='Enter Redirect Uri'
                value={'http://localhost:4200'}
                disabled={true}
                // onChange={(e) => {
                //   if (e.target.value != '') {
                //     setAuth0Data((data) => {
                //       return {
                //         ...data,
                //         auth0RedirectUrl: e.target.value,
                //       }
                //     })
                //   } else {
                //     setAuth0Data((data) => {
                //       return {
                //         ...data,
                //         auth0RedirectUrl: undefined,
                //       }
                //     })
                //   }
                // }}
              />
            </div>
          </div>
        )}
        {/*button*/}
        <div className='d-flex flex-sack justify-content-center pb-5'>
          {!isSuccessModel && !isSubmitting && (
            <div className=''>
              {auth0Configured && (
                <button
                  type='button'
                  className='btn btn-lg btn-light-danger me-8'
                  onClick={() => handleDelete(auth0Data)}
                >
                  Remove Configuration
                </button>
              )}
              <button type='button' className='btn btn-lg btn-light-primary me-8' onClick={submit}>
                {auth0Configured ? 'Reconfigure' : 'Configure'}
              </button>
            </div>
          )}
          {isSubmitting && (
            <div className='sweet-loading'>
              <div className='pb-10 pb-lg-15 text-center loading-text-gateway-config'>
                <h5 className=' text-muted fs-7 fw-semibold mb-5'>
                  Configuring authentication
                  <span className='dot-one'> .</span>
                  <span className='dot-two'> .</span>
                  <span className='dot-three'> .</span>
                </h5>
                <PropagateLoader
                  color='#7239EA'
                  cssOverride={{}}
                  loading={true}
                  size={8}
                  speedMultiplier={0.75}
                />
              </div>
            </div>
          )}
          {isSuccessModel && (
            <div>
              <button type='button' className='btn btn-lg btn-primary me-3' onClick={resetStates}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthConfig
