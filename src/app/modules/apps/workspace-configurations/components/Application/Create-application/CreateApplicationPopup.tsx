/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
// import {defaultCreateAppData, ICreateAppData} from './IAppModels'
// import {StepperComponent} from '../../../assets/ts/components'
// import {KTIcon} from '../../../helpers'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'
import {Step4} from './steps/Step4'
import {Step5} from './steps/Step5'
import {ApplicationPopup} from './Configs/ApplicationPopup'
import {SuccessPopup} from './Configs/SuccessPopup'
import {KTIcon} from '../../../../../../../_metronic/helpers'
import {StepperComponent} from '../../../../../../../_metronic/assets/ts/components'
import {IAppBasic, IAppDatabase, ICreateAppData, defaultCreateAppData} from '../IApplicationModels'
import {ApplicationModel} from '../../../../../../models/application_model'
import {createApplication, updateApplication} from '../../../../../../services/applicationService'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

type Props = {
  workspaceId: string
  show: boolean
  handleCloseModal: () => void
  isUpdate:boolean
  application:ApplicationModel
  setNewApplicationFlowChart?: React.Dispatch<React.SetStateAction<ApplicationModel>>
  updateTemporaryOnChangesApplications?:any
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateApplicationModal = ({workspaceId, show, handleCloseModal, isUpdate, application, setNewApplicationFlowChart,updateTemporaryOnChangesApplications}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [data, setData] = useState<ApplicationModel>({})
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessApplication, setIsSuccessApplication] = useState(false)
  const [newAppId,setApplicationData] = useState<string>('')
  const { user, isAuthenticated } = useAuth0();

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const updateData = (fieldsToUpdate: Partial<ApplicationModel>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

    //edit create workspace decider
    useEffect(() => {
      if (isUpdate) {
        // If initialData exists, it's an edit mode
        setData(application)
      } else {
        // If initialData is not provided, it's a create mode
        setData({});
      }
  
    }, [isUpdate]);

  const checkAppBasic = (): boolean => {
    if (!data.appName) {
      return false
    }
    return true
  }

  const checkAppDataBase = (): boolean => {
    if (!data.database) {
      return false
    }

    return true
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()
  }

  const nextStep = () => {
    setHasError(false)
    if (!stepper.current) {
      return
    }

    if (stepper.current.getCurrentStepIndex() === 1) {
      if (!checkAppBasic()) {
        setHasError(true)
        return
      }
    }

    if (stepper.current.getCurrentStepIndex() === 3) {
      if (!checkAppDataBase()) {
        setHasError(true)
        return
      }
    }

    stepper.current.goNext()
  }

  const checkApplicationValidation = (): boolean => {
    if (!data.appName) {
      return false
    }
    return true
  }

    //reset states on close
    const resetStates = () => {
      setData({});
      setIsSubmitting(false)
      setIsSuccessApplication(false)
      setHasError(false);
    };
  
  const handleClose = ()=>{
    handleCloseModal();
    setTimeout(resetStates, 1000);
  }

  const submit = async () => {
    let newApplication: ApplicationModel = data
    newApplication.workspaceId = workspaceId

    if (!checkApplicationValidation()) {
      setHasError(true)
      return
    } else {
      setIsSubmitting(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        if (isUpdate){
          const updatedApplictation = await updateApplication(newApplication)
          if (updatedApplictation.appId!='') {
            setApplicationData(application.appId?application.appId:'')
            if (updateTemporaryOnChangesApplications) {
              updateTemporaryOnChangesApplications(newApplication);
            }
            setIsSuccessApplication(true)
          }
          
          
        }else {
          const userId = user?.sub;
          newApplication.userId=userId

          const createdApplication = await createApplication(newApplication)
          if (createdApplication.appId != '') {
            const newApplication = createdApplication
            setApplicationData(createdApplication.appId?createdApplication.appId:'')
            if (updateTemporaryOnChangesApplications) {
              updateTemporaryOnChangesApplications(newApplication);
            }
            console.log(`Application`,application)
            setIsSuccessApplication(true)
            if (setNewApplicationFlowChart!==undefined){
              console.log("new app"+newApplication.appId)
              setNewApplicationFlowChart(newApplication)
              
            }
           
          }
        }
        setData({})
      } catch (error) {
        console.error('Error creating workspace:', error)
        setIsSuccessApplication(false)
      } finally {
        setIsSubmitting(false)
      }
    }
    // window.location.reload()
  }

  return createPortal(
    <Modal
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={handleClose}
      onEntered={loadStepper}
    >
      <div className='modal-header'>
        {isUpdate && (
          <h2>Update Application</h2>
        )}
        {!isUpdate && (
          <h2>Create Application</h2>
        )}
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        {<>
                {/*begin::Stepper */}
                <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          {/* begin::Aside*/}
          <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px'>
            {/* begin::Nav*/}
            <div className='stepper-nav ps-lg-10'>
              {/* begin::Step 1*/}
              <div className='stepper-item current' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>1</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Details</h3>

                    <div className='stepper-desc'>Name your App</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-60px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 1*/}


              {/* begin::Step 3*/}
              <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>2</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Database</h3>

                    <div className='stepper-desc'>Select the app database type</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-60px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 3*/}

          

              {/* begin::Step 5*/}
              <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>3</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Completed</h3>

                    <div className='stepper-desc'>Review and Submit</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}
              </div>
              {/* end::Step 5*/}
            </div>
            {/* end::Nav*/}
          </div>
          {/* begin::Aside*/}

          {/*begin::Content */}
          <div className='flex-row-fluid py-lg-5 px-lg-15'>
            {/*begin::Form */}
            <form noValidate id='kt_modal_create_app_form'>
              <Step1 data={data} updateData={updateData} hasError={hasError} />
              {/*<Step2 data={data} updateData={updateData} hasError={hasError} />*/}
              <Step3 data={data} updateData={updateData} hasError={hasError} />
              {/*<Step4 data={data} updateData={updateData} hasError={hasError} />*/}
              {!isSuccessApplication&&<Step5 />}
              {isSuccessApplication && (
          <>
          <SuccessPopup isUpdate={isUpdate} />

           <Link
             to={`/workspaces/configure/${workspaceId}/view/${newAppId}`}
           >
             <div className='d-flex flex-center'>
             <button type='button' className='btn btn-lg btn-primary me-3 mb-1'>
               Go to Application <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
             </button>
             </div>
           
           </Link>
       </>
        )}
              {/*begin::Actions */}
          {!isSuccessApplication&&    <div className='d-flex flex-stack pt-10'>
               <div className='me-2'>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-primary me-3'
                    data-kt-stepper-action='previous'
                    onClick={prevStep}
                  >
                    <KTIcon iconName='arrow-left' className='fs-3 me-1' /> Previous
                  </button>
                </div>
                <div>
                  <div className='me-2' >
                  <button
                    type='button'
                    className='btn btn-lg btn-primary'
                    data-kt-stepper-action='submit'
                    onClick={submit}
                  >
                    {!isSubmitting && <>Submit <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' /></>}

                    {isSubmitting && (
                      <span className='indicatorprogress'>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                      </span>
                    )}
                  </button>
                </div>
                  <button
                    type='button'
                    className='btn btn-lg btn-primary'
                    data-kt-stepper-action='next'
                    onClick={nextStep}
                  >
                    Next Step <KTIcon iconName='arrow-right' className='fs-3 ms-1 me-0' />
                  </button>
                </div>
              </div>}
              {/*end::Actions */}
            </form>
            {/*end::Form */}
          </div>
          {/*end::Content */}
        </div>
        {/* end::Stepper */}
        </>}
      

     
      </div>
    </Modal>,
    modalsRoot
  )
}

export {CreateApplicationModal}
