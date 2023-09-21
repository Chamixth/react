/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {API, ApplicationModel, Dto} from '../../../../../../models/application_model'
import {KTIcon} from '../../../../../../../_metronic/helpers'
import {ApiPopUp} from './ApiPopup'
import {SuccessPopup} from './SuccessPopup'
import {Link} from 'react-router-dom'
import {createApi, updateApi} from '../../../../../../services/apiService'
import { useAuth0 } from '@auth0/auth0-react'

type Props = {
  show: boolean
  handleCloseModal: () => void
  initialData?: API
  dtos: Dto[]
  application: ApplicationModel
  setUpApi:React.Dispatch<React.SetStateAction<API>>
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateApiConfig = ({application, show, dtos, handleCloseModal, setUpApi, initialData}: Props) => {
  const [data, setData] = useState<API>({})
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessAPI, setIsSuccessAPI] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isCustom, setIsCustom] = useState(false)
  const { user, isAuthenticated } = useAuth0();

  const updateData = (fieldsToUpdate: Partial<API>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  //edit create workspace decider
  useEffect(() => {
    console.log("init data", initialData)


    //--check whether api is a custom api--
    if (initialData?.template=="CUSTOM"){
      setIsCustom(true)
    }

    if (initialData?.appId) {
      // If initialData exists, it's an edit mode
      setIsEditMode(true)
      setData(initialData)
    } else {
      // If initialData is not provided, it's a create mode
      setIsEditMode(false)
      setData({})
    }
  }, [initialData])

  const checkAPIValidation = (): boolean => {
    if (!data.apiName) {
      return false
    }
    if (!data.baseDto) {
      return false
    }
    if (!data.secondaryDto) {
      return false
    }
    if (!data.accessRole) {
      return false
    }
    return true
  }

  //reset states on close
  const resetStates = () => {
    setData({})
    setIsSubmitting(false)
    setIsSuccessAPI(false)
    setHasError(false)
    setIsCustom(false)
  }

  // Close the popup and reset states
  const handleClose = () => {
    handleCloseModal()
    setTimeout(resetStates, 1000)
  }

  const submit = async () => {
    if (!checkAPIValidation()) {
      setHasError(true)
      return
    } else {
      setIsSubmitting(true)
      try {
        if (isEditMode) {
          console.log(data, 'edit set eka')

          await new Promise((resolve) => setTimeout(resolve, 2000))
          const updatedApi = await updateApi(data)
          if (updatedApi.apiId) {
            setUpApi(updatedApi)
            setIsSuccessAPI(true)
          }
        } else {
          console.log(data, 'create set eka')

          // data.thumbImg=await getRandomPhoto().then((photo)=>{
          //   return photo.urls.thumb
          //   })

          data.workspaceId = application.workspaceId
          data.appId = application.appId
          data.appName = application.appName
          data.organizationId = localStorage.getItem("organizationId") || ""
          const userId = user?.sub;
          data.userId=userId

          await new Promise((resolve) => setTimeout(resolve, 2000))
          const createdApi = await createApi(data)
          console.log(createdApi.apiId)
          if (createdApi.apiId) {
            setUpApi(createdApi)
            setIsSuccessAPI(true)
          }
        }

        setData({})
      } catch (error) {
        console.error('Error creating workspace:', error)
        setIsSuccessAPI(false)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-600px'
      backdrop='static'
      show={show}
      onHide={handleClose}
      //onEntered={loadStepper}
    >
      <div className='modal-header'>
        <h2>{isEditMode ? 'Edit API' : 'Create API'}</h2>
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body py-lg-7 px-lg-7'>
        {/*begin::Stepper */}
        <div
          //ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          //id='kt_modal_create_app_stepper'
        >
          {/*begin::Content */}
          <div className='flex-row-fluid py-lg-5 px-lg-15'>
            {/*begin::Form */}
            <form className='mx-auto mw-600px w-100 ' noValidate>
              {!isSuccessAPI && (
                <ApiPopUp
                  data={data}
                  dtos={dtos}
                  updateData={updateData}
                  hasError={hasError}
                  isEdit={isEditMode}
                  isCustom={isCustom}
                />
              )}
              {isSuccessAPI && <SuccessPopup isEdit={isEditMode} />}

              {/*begin::Actions */}

              <div className='d-flex flex-sack justify-content-center pt-10'>
                {!isSuccessAPI && (
                  <div className='me-2'>
                    <button
                      type='button'
                      className='btn btn-lg btn-light-primary me-3'
                      onClick={submit}
                      disabled={isSubmitting}
                    >
                      {!isSubmitting && <>{isEditMode ? 'Update API' : 'Create API'}</>}

                      {isSubmitting && (
                        <span className='indicatorprogress'>
                          Please wait...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2' />
                        </span>
                      )}
                    </button>
                  </div>
                )}
                {isSuccessAPI && (
                  <div>
                    <button type='button' className='btn btn-lg btn-primary me-3' onClick={handleClose}>
                        Done <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0'  />
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>,
    modalsRoot
  )
}

export {CreateApiConfig}
