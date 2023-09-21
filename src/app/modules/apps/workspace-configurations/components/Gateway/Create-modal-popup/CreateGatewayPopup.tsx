/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
// import {ICreateWorkspaceData, defaultCreateAppData} from '../IWorkspaceModels'
// import {SuccessPopup} from './Configs/SuccessPopup'
// import {StepperComponent} from '../../../../../../_metronic/assets/ts/components'
// import {KTIcon} from '../../../../../../_metronic/helpers'
// import {WorkspaceModel} from '../../../../../models/workspace_model'
// import {WorkspaceModal} from '../workspaceModal'
// import {createApplication} from '../../../../../../services/applicationService'
// import { getRandomPhoto } from '../../../../../services/utilService'
import {KTIcon, toAbsoluteUrl, useIllustrationsPath} from '../../../../../../../_metronic/helpers'
import {Dto} from '../../../../../../models/application_model'
import {createDto, updateDto} from '../../../../../../services/dtoService'
import {PropagateLoader} from 'react-spinners'
import {Gateway} from '../../../../../../models/gateway_model'
import {registerApis} from '../../../../../../services/gatewayService'

type Props = {
  show: boolean
  handleCloseModal: () => void
  workspaceId?:string
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateGatewayModal = ({
  show,
  handleCloseModal,
  workspaceId
}: Props) => {
  const [data, setData] = useState<Gateway>({})
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessModel, setIsSuccessModel] = useState(false)

  const updateData = (fieldsToUpdate: Partial<Dto>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  //reset states on close
  const resetStates = () => {
    setData({})
    setIsSubmitting(false)
    setIsSuccessModel(false)
    setHasError(false)
  }

  // Close the popup and reset states
  const handleClose = () => {
    handleCloseModal()
    setTimeout(resetStates, 1000)
  }

  const submit = async () => {
    console.log('submit')
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const registeredApplication = await registerApis(workspaceId)
        console.log('Registered apis:', registeredApplication)
        if (registeredApplication['operation'] == 'Success') {
          setIsSuccessModel(true)
        } else {
          setHasError(true)
        }

      setData({})
    } catch (error) {
      console.error('Error creating model:', error)
      setIsSuccessModel(false)
    } finally {
      setIsSubmitting(false)
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
      <div className='modal-body py-lg-10 px-lg-10'>
        <div className='flex-row-fluid py-lg-5 px-lg-15'>
          {/*begin::Form */}
          <form className='mx-auto mw-600px w-100 ' noValidate>
            <div className='curent'>
              <div className='w-100'>
                <div className='pb-10 pb-lg-15 text-center loading-text-gateway-config'>
                  {/*begin::Title*/}
                  <h2 className='fw-bold text-dark'>Configure Gateway</h2>
                  {/*end::Title*/}
                  {/*begin::Notice*/}
                  <div className='text-muted fw-semibold fs-6'>
                    Please make sure you have configured all your API's in every application listed inside this workspace before configuring the gateway
                  </div>
                  {/*end::Notice*/}
                </div>
                {/*begin::Form Group */}
              </div>
            </div>
            <div className='text-center pb-10 '>
              <video
                src={
                  'https://cdnl.iconscout.com/lottie/premium/thumb/web-designer-5714905-4761463.mp4'
                }
                loop
                className='mw-100 h-170px h-sm-250px'
                autoPlay={true}
                controls={false}
              ></video>
              {/*<img src={"https://cdnl.iconscout.com/lottie/premium/thumb/web-designer-5714905-4761463.mp4"} alt="" className="mw-100 h-200px h-sm-275px" />*/}
            </div>

            <div className='d-flex flex-sack justify-content-center pt-5'>
              {!isSuccessModel && !isSubmitting && (
                <div className=''>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-danger me-8'
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Close
                  </button>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-primary '
                    onClick={submit}
                    disabled={isSubmitting}
                  >
                    Register Gateway
                  </button>
                </div>
              )}
              {isSubmitting && (
                <div className='sweet-loading'>
                  <div className='pb-10 pb-lg-15 text-center loading-text-gateway-config'>
                    {/*begin::Title*/}
                    <h5 className=' text-muted fs-7 fw-semibold mb-5'>
                      Configuring Gateway
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
                <button
                  type='button'
                  className='btn btn-lg btn-light-primary me-3'
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  {hasError ? 'Error' : 'Done'}
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

export {CreateGatewayModal}
