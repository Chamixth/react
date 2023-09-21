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
import { Dto} from '../../../../../../models/application_model'
import { createDto, updateDto } from '../../../../../../services/dtoService'
import { useAuth0 } from '@auth0/auth0-react'
import Swal from 'sweetalert2'

type Props = {
  show: boolean
  handleCloseModal: () => void
  dto: Dto
  isUpdate?: boolean
  updateTemporaryOnChangesDtos?:any

}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateDtoModal = ({show, handleCloseModal, dto, isUpdate,updateTemporaryOnChangesDtos}: Props) => {
  const [data, setData] = useState<Dto>({})
  const [createCruds, setCreateCruds] = useState<boolean>(true)
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSuccessModel, setIsSuccessModel] = useState(false)
  const { user, isAuthenticated } = useAuth0();

  const updateData = (fieldsToUpdate: Partial<Dto>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }
    //edit create workspace decider
    useEffect(() => {
      if (isUpdate) {
        // If initialData exists, it's an edit mode
        setData(dto)
        setCreateCruds(dto.createCruds?true:false)
      } else {
        // If initialData is not provided, it's a create mode
        setData({});
      }
  
    }, [isUpdate]);

    //create cruds toggle--
    useEffect(() => {
      updateData({
        createCruds:createCruds
      }) 
    }, [createCruds]);

  const checkDtoValidation = (): boolean => {
    if (!data.dtoName) {
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
    let newDto: Dto = data
    newDto.workspaceId = dto?.workspaceId
    newDto.appId = dto?.appId
    newDto.appName=dto?.appName
    newDto.createCruds=createCruds

    console.log("create cruds"+createCruds)

      setIsSubmitting(true)
      try {
        console.log('data',newDto)
        // data.thumbImg=await getRandomPhoto().then((photo)=>{
        //   return photo.urls.thumb
        //   })

        await new Promise((resolve) => setTimeout(resolve, 2000))

        if (isUpdate) {
          const updatedModel = await updateDto(newDto)
          if (updatedModel.dtoId !== '') {
            if (updateTemporaryOnChangesDtos) {
              updateTemporaryOnChangesDtos(updatedModel);
            }
            setIsSuccessModel(true)
          }else{
            Swal.fire({
              text: 'Something went wrong. Please try again!',
    
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
            setHasError(true)
          }
        }else{
          newDto.field = []
          const userId = user?.sub;
          newDto.userId=userId
          
          const createdModel = await createDto(newDto)
          if (createdModel.dtoId !== '') {
            if (updateTemporaryOnChangesDtos) {
              updateTemporaryOnChangesDtos(createdModel);
            }
            setIsSuccessModel(true)
          }else{
            Swal.fire({
              text: 'Something went wrong. Please try again!',
    
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
            setHasError(true)
          }

        }
        setData({})
      } catch (error) {
        Swal.fire({
          text: 'Something went wrong. Please try again!',

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
        {isUpdate?<h2>Update Dto</h2>:<h2>Create Object</h2>}
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
              <div className='pb-10 pb-lg-15 text-center'>
                {/*begin::Title*/}
                <h2 className='fw-bold text-dark'>Object Info</h2>
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
                  <span className='required'>Object Name</span>
                  <i
                    className='fas fa-exclamation-circle ms-2 fs-7'
                    data-bs-toggle='tooltip'
                    title='Specify your unique app name'
                  ></i>
                </label>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  name='dtoname'
                  placeholder=''
                  value={data.dtoName}
                  onChange={(e) =>
                    updateData({
                      dtoName: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase(),
                    })
                  }
                />
                {!data.dtoName && hasError && (
                  <div className='fv-plugins-message-container'>
                    <div
                      data-field='dtoname'
                      data-validator='notEmpty'
                      className='fv-help-block'
                    >
                      object name is required
                    </div>
                  </div>
                )}
              </div>
              <div className='d-flex flex-stack mb-6'>
              {/* <!--begin::Label--> */}
              <div className='me-5'>
                <label className='fs-6 fw-semibold form-label'>
                  Create CRUD Operations?
                </label>
                <div className='fs-7 fw-semibold text-muted'>
                  Do you want create, edit, or delete operations for this Object
                </div>
              </div>
              {/* <!--end::Label--> */}
              {/* <!--begin::Switch--> */}
              <label className='form-check form-switch form-check-custom form-check-solid'>
                <input 
                className='form-check-input' 
                type='checkbox' value='1' 
                checked={createCruds}
                onChange={()=>setCreateCruds(!createCruds)}
                />
                {createCruds
                ?<span className='form-check-label fw-semibold text-muted'>Yes I want To</span>
                :<span className='form-check-label fw-semibold text-muted'>No I don't   </span>}
              </label>
              {/* <!--end::Switch--> */}
            </div>
            </div>
          </div>
          <div className="text-center pb-10 ">
            <img src={useIllustrationsPath('17.png')} alt="" className="mw-100 h-200px h-sm-275px" />
          </div>

          <div className='d-flex flex-sack justify-content-center pt-5'>
            {!isSuccessModel && (
              <div className=''>
                <button
                    type='button'
                    className='btn btn-lg btn-light-danger me-8'
                    onClick={handleClose}
                    disabled={isSubmitting}
                >Cancel</button>
                <button
                  type='button'
                  className='btn btn-lg btn-light-primary '
                  onClick={submit}
                  disabled={isSubmitting}
                >
                  {!isSubmitting  && <>{isUpdate ? 'Update Object' : 'Create Object'}</>}

                  {isSubmitting && (
                    <span className='indicatorprogress'>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2' />
                    </span>
                  )}
                </button>
              </div>
            )}
            {isSuccessModel &&
                  <button
                    type='button'
                    className='btn btn-lg btn-light-primary me-3'
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Done
                  </button>
                }
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

export {CreateDtoModal}
