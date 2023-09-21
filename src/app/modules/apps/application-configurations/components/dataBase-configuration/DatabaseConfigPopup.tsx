import {useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {ApplicationModel, Dto} from '../../../../../models/application_model'
import {createDto, updateDto} from '../../../../../services/dtoService'
import {KTIcon, toAbsoluteUrl, useIllustrationsPath} from '../../../../../../_metronic/helpers'
import { updateApplication } from '../../../../../services/applicationService'
import { useAuth0 } from '@auth0/auth0-react'

type Props = {
  show: boolean
  handleCloseModal: () => void
  updateTemporaryOnChangesApp?: any
  applicationData: ApplicationModel
}

const modalsRoot = document.getElementById('root-modals') || document.body

const DatabaseConfigPopup = ({show, handleCloseModal, applicationData, updateTemporaryOnChangesApp}: Props) => {
  console.log(applicationData,"methana ballo")
  const [data, setData] = useState<ApplicationModel>({})
  const [createCruds, setCreateCruds] = useState<boolean>(true)
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSuccessModel, setIsSuccessModel] = useState(false)
  const { user, isAuthenticated } = useAuth0();

  const updateData = (linkToUpdate: Partial<ApplicationModel>) => {
    const updatedData = {...data, ...linkToUpdate}
    setData(updatedData)
  }

  // edit create workspace decider
  useEffect(() => {
    setData(applicationData)
  },[show]);


  const checkDtoValidation = (): boolean => {
    if (!data.databaseUrl) {
      return false
    }
    return true
  }

  //reset states on close
  const resetStates = () => {
    setData({})
    setIsSubmitting(false)
    setIsSuccessModel(false)
    setHasError(false)
    setCreateCruds(true)
  }

  // Close the popup and reset states
  const handleClose = () => {
    handleCloseModal()
    setTimeout(resetStates, 1000)
  }

    const submit = async () => {
      if (!checkDtoValidation()) {
        setHasError(true)
        return
      } else {
      console.log('submit')
      let newApp: ApplicationModel = data
      newApp.workspaceId = applicationData?.workspaceId
      newApp.appId = applicationData?.appId
      newApp.appName=applicationData?.appName
      newApp.database=applicationData?.database
      const userId = user?.sub;
      data.userId=userId

        setIsSubmitting(true)
        try {
          console.log('data',newApp)
          await new Promise((resolve) => setTimeout(resolve, 2000))
            const updatedApplication = await updateApplication(newApp)
            if (updatedApplication.databaseUrl !== '') {
              if (updateTemporaryOnChangesApp) {
                updateTemporaryOnChangesApp(updatedApplication);
              }
              setIsSuccessModel(true)

          }
          setData({})
        } catch (error) {
          console.error('Error creating model:', error)
          setIsSuccessModel(false)
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
      dialogClassName='modal-dialog modal-dialog-centered mw-700px '
      backdrop='static'
      show={show}
      onHide={handleClose}
      //onEntered={loadStepper}
    >
      <div className='modal-header'>
        <h2>Database configure</h2>
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
        {/* end::Close */}
      </div>
      <div className='modal-body py-lg-10 px-lg-10'>
        <div className='flex-row-fluid py-lg-5 px-lg-15'>
          {/*begin::Form */}
          <form className='mx-auto mw-600px w-100 ' noValidate>
            <div className='curent'>
              <div className='w-100'>
                <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed mb-10 p-6'>
                  {/*begin::Icon*/}
                  <i className='ki-duotone ki-information fs-2tx text-warning me-4'>
                    <span className='path1' />
                    <span className='path2' />
                    <span className='path3' />
                  </i>
                  {/*end::Icon*/}
                  {/*begin::Wrapper*/}
                  <div className='d-flex flex-stack flex-grow-1'>
                    {/*begin::Content*/}
                    <div className='fw-semibold'>
                      <h4 className='text-gray-900 fw-bold'>Please Note!</h4>
                      <div className='fs-6 text-gray-700'>
                        Updating your database URL may afftect to your 
                        <a href='#'> Application</a>
                      </div>
                    </div>
                    {/*end::Content*/}
                  </div>
                  {/*end::Wrapper*/}
                </div>
                {/*begin::Form Group */}
                <div className='fv-row mb-10'>
                  <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                    <span className='required'>Database url</span>
                    <i
                      className='fas fa-exclamation-circle ms-2 fs-7'
                      data-bs-toggle='tooltip'
                      title='Specify your unique app name'
                    ></i>
                  </label>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    name='dburl'
                    placeholder=''
                    value={data.databaseUrl}
                    onChange={(e) =>
                      updateData({
                        databaseUrl: e.target.value,
                      })
                    }
                  />
                  {!data.databaseUrl && hasError && (
                    <div className='fv-plugins-message-container'>
                      <div data-field='dburl' data-validator='notEmpty' className='fv-help-block'>
                        database Url is required
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='text-center pb-10 '>
              <img
                src={toAbsoluteUrl('/media/illustrations/sketchy-1/16.png')}
                alt=''
                className='mw-100 h-200px h-sm-275px'
              />
            </div>

            <div className='d-flex flex-sack justify-content-center pt-5'>
              {!isSuccessModel && (
                <div className=''>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-danger me-8'
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-primary '
                    onClick={submit}
                    disabled={isSubmitting}
                  >
                    {!isSubmitting && 'Configure'}

                    {isSubmitting && (
                      <span className='indicatorprogress'>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                      </span>
                    )}
                  </button>
                </div>
              )}
              {isSuccessModel && (
                <button
                  type='button'
                  className='btn btn-lg btn-light-primary me-3'
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Done
                </button>
              )}
            </div>
            {/* <!--begin::Illustration--> */}
            {/* <!--end::Illustration--> */}
          </form>
        </div>
      </div>
    </Modal>,
    modalsRoot
  )
}

export {DatabaseConfigPopup}
