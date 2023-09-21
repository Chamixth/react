/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {KTIcon, toAbsoluteUrl} from '../../../../../../../_metronic/helpers'
import {ApplicationModel, Dto, Relationship} from '../../../../../../models/application_model'
import {getAllDtosByWorkspaceId} from '../../../../../../services/dtoService'
import Relationships from '../../Relationships'
import {createRelationship, updateRelationship} from '../../../../../../services/relationshipService'
import { useAuth0 } from '@auth0/auth0-react'
import Swal from 'sweetalert2'
// import {ICreateWorkspaceData, defaultCreateAppData} from '../IWorkspaceModels'
// import {SuccessPopup} from './Configs/SuccessPopup'
// import {StepperComponent} from '../../../../../../_metronic/assets/ts/components'
// import {KTIcon} from '../../../../../../_metronic/helpers'
// import {WorkspaceModel} from '../../../../../models/workspace_model'
// import {WorkspaceModal} from '../workspaceModal'
// import {createApplication} from '../../../../../../services/applicationService'
// import { getRandomPhoto } from '../../../../../services/utilService'

// import { Dto} from '../../../../../../models/application_model'
// import { createDto, updateDto } from '../../../../../../services/dtoSevice'

type Props = {
  show: boolean
  handleCloseModal: () => void
  workspaceId?: string
  appId?: string
  dtos: Dto[]
  isUpdate: boolean
  relationship: Relationship
  updateTemporaryOnChangesRelationship: any
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateRelationshipModal = ({show, handleCloseModal, isUpdate, workspaceId, appId, dtos, updateTemporaryOnChangesRelationship, relationship}: Props) => {
  const [data, setData] = useState<Relationship>({})
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSuccessModel, setIsSuccessModel] = useState(false)
  // const [dtos1, setDtos1] = useState<Array<Dto>>([])
  // const [dtos2, setDtos2] = useState<Array<Dto>>([])
  const [selectedDto, setSelectedDto] = useState<Dto>({})
  const [selectedDto2, setSelectedDto2] = useState<Dto>({})
  const [loading, setLoading] = useState(true)
  const [baseType, setBaseType] = useState<string>('')
  const [secondaryType, setSecondaryType] = useState<string>('')
  const [selectedDtoPk, setSelectedDtoPk] = useState<string>('')
  const [selectedDto2Pk, setSelectedDto2Pk] = useState<string>('')
  const { user, isAuthenticated } = useAuth0();
  const [selectedBaseDto, setSelectedBaseDto] = useState<number>(-1)
  const [selectedSecDto, setSelectedSecDto] = useState<number>(-1)

  const updateData = (fieldsToUpdate: Partial<Relationship>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  // useEffect(() => {
  //   if (workspaceId) {
  //     getAllDtosByWorkspaceId(workspaceId)
  //       .then((data) => {
  //         // Dispatch the action to set the data in Redux
  //         setDtos(data)
  //         setDtos2(data)
  //         setLoading(false) // Set loading to false after data is received
  //       })
  //       .catch((error) => {
  //         // Handle errors if needed
  //         console.error('Error fetching applications:', error)
  //         setLoading(false) // Set loading to false on error
  //       })
  //   }
  // }, [workspaceId])
  //edit create workspace decider
  useEffect(() => {
    if (isUpdate) {
      // If initialData exists, it's an edit mode
      setData(relationship)
      setSelectedBaseDto(dtos.findIndex((dto) => dto.dtoId === relationship.baseDto))
      setSelectedDto(dtos[dtos.findIndex((dto) => dto.dtoId === relationship.baseDto)])
      setSelectedSecDto(dtos.findIndex((dto) => dto.dtoId === relationship.secondaryDto))
      setSelectedDto2(dtos[dtos.findIndex((dto) => dto.dtoId === relationship.secondaryDto)])
    } else {
      // If initialData is not provided, it's a create mode
      setData({});
    }

  }, [isUpdate]);

  const checkDtoValidation = (): boolean => {
    if (!data.baseDto || !data.baseRelationship || !data.secondaryDto || !data.secondaryRelationship) {
      return false
    }
    return true
  }

  // const setSubmitType = (data: string) => {
  //   if (data == 'hasOne') {
  //     setSecondaryType('has one')
  //   } else if (data == 'hasMany') {
  //     setType('has many')
  //   } else {
  //     setType('not selected')
  //   }
  //   updateData({baseRelationship: data})
  // }

  const setSubmitDto = (data: Dto) => {
    if (data === dtos[-1]) {
      return
    } else {
      setSelectedBaseDto(data[dtos.findIndex((dto) => dto.dtoId)])
      setSelectedDto(data)
      updateData({baseDto: data.dtoId})
    }
  }

  const setSubmitDto2 = (data: Dto) => {
    if (data === dtos[-1]) {
      return
    } else {
      setSelectedSecDto(data[dtos.findIndex((dto) => dto.dtoId)])
      setSelectedDto2(data)
      updateData({secondaryDto: data.dtoId})
    }
  }

  //reset states on close
  const resetStates = () => {
    setData({})
    setSelectedDto({})
    setSelectedDto2({})
    setSelectedDtoPk('')
    setSelectedDto2Pk('')
    setBaseType('')
    setSecondaryType('')
    setIsSubmitting(false)
    setIsSuccessModel(false)
    setHasError(false)
  }

  // Close the popup and reset states
  const handleClose = () => {
    resetStates()
    handleCloseModal()
    setTimeout(resetStates, 1000)
  }

  const submit = async () => {
    if (!checkDtoValidation()) {
      setHasError(true)
      return
    } else {
      let newRelationship: Relationship = data
      newRelationship.workspaceId = workspaceId
      newRelationship.appId = appId
      setIsSubmitting(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        if (isUpdate) {
          const updatedRelationship = await updateRelationship(data)
          if (updatedRelationship.relationshipId !== '') {
            if(updateTemporaryOnChangesRelationship){
              updateTemporaryOnChangesRelationship(updatedRelationship)
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
        } else {
          const userId = user?.sub;
          data.userId=userId
          const createdRelationship = await createRelationship(data)
          if (createdRelationship.relationshipId !== '') {
            if(updateTemporaryOnChangesRelationship){
              updateTemporaryOnChangesRelationship(createdRelationship)
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
        setHasError(true)
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
      dialogClassName='modal-dialog modal-dialog-centered mw-900px '
      backdrop='static'
      show={show}
      onHide={handleClose}
      //onEntered={loadStepper}
    >
      <div className='modal-header'>
      {isUpdate?<h2>Update Relationship</h2>:<h2>Create Relationship</h2>}
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
        {/* end::Close */}
      </div>
      <div className='modal-body py-lg-10 px-lg-10'>
        <div className='flex-row-fluid py-lg-5 px-lg-15'>
          {/*begin::Form */}
          <form className='mx-auto mw-900px w-100 ' noValidate>
            <div className='curent'>
              <div className='w-100'>
                <div className='row mb-10'>
                  {/* <!--begin::Col--> */}
                  <div className='col-md-12 fv-row'>
                    {/* <!--begin::Row--> */}
                    <div className='row fv-row d-flex justify-content-center'>
                      {/* <!--begin::Col--> */}
                      <div className='col-3'>
                        <label className='required fs-6 fw-semibold form-label mb-2'>
                          Base Relationship Type
                        </label>
                        <select
                          name='base-relationship'
                          className='form-select form-select-solid'
                          data-control='select2'
                          data-hide-search='true'
                          data-placeholder='relationshipType'
                          value={data.baseRelationship}
                          onChange={(e) => [
                            setBaseType(e.target.value),
                            updateData({baseRelationship: e.target.value}),
                          ]}
                        >
                          <option>Select a Base Relationship Type</option>
                          <option value='ONE'>One</option>
                          <option value='MANY'>Many</option>
                        </select>
                        {!data.baseRelationship && hasError && (
                      <div className='fv-plugins-message-container'>
                        <div
                          data-field='data-type'
                          data-validator='notEmpty'
                          className='fv-help-block'
                        >
                          Base Relationship is required
                        </div>
                      </div>
                    )}
                      </div>
                      <div className='col-3'>
                        {/* <!--begin::Label--> */}
                        <label className='required fs-6 fw-semibold form-label mb-2'>
                          Base Dto
                        </label>
                        {/* <!--end::Label--> */}
                        <select
                          name='baseDto'
                          className='form-select form-select-solid'
                          data-control='select2'
                          data-hide-search='true'
                          data-placeholder='Base Dto'
                          value={selectedBaseDto}
                          onChange={(e) => setSubmitDto(dtos[e.target.value])}
                        >
                          <option value={-1}>Select a base dto</option>
                          {dtos &&
                            dtos.map((dto, i) => {
                              return (
                                <option key={i} value={i}>
                                  {dto.dtoName}
                                </option>
                              )
                            })}
                        </select>
                        {selectedBaseDto === -1 && hasError && (
                      <div className='fv-plugins-message-container'>
                        <div
                          data-field='data-type'
                          data-validator='notEmpty'
                          className='fv-help-block'
                        >
                          Base Dto is required
                        </div>
                      </div>
                    )}
                      </div>
                      {/* <!--end::Col--> */}
                      {/* <!--begin::Col--> */}
                      <div className='col-3'>
                        <label className='required fs-6 fw-semibold form-label mb-2'>
                          S. Relationship Type
                        </label>
                        <select
                          name='secondary-relationship'
                          className='form-select form-select-solid'
                          data-control='select2'
                          data-hide-search='true'
                          data-placeholder='relationshipType'
                          value={data.secondaryRelationship}
                          onChange={(e) => [
                            setSecondaryType(e.target.value),
                            updateData({secondaryRelationship: e.target.value}),
                          ]}
                        >
                          <option>Select a Secondary Relationship Type</option>
                          <option value='HAS-ONE'>HAS-ONE</option>
                          <option value='HAS-MANY'>HAS-MANY</option>
                        </select>
                        {!data.secondaryRelationship && hasError && (
                      <div className='fv-plugins-message-container'>
                        <div
                          data-field='data-type'
                          data-validator='notEmpty'
                          className='fv-help-block'
                        >
                          Secondary Relationship is required
                        </div>
                      </div>
                    )}
                      </div>
                      {/* <!--end::Col--> */}
                      {/* <!--begin::Col--> */}
                      <div className='col-3'>
                        {/* <!--begin::Label--> */}
                        <label className='required fs-6 fw-semibold form-label mb-2'>
                          Secondary Dto
                        </label>
                        {/* <!--end::Label--> */}
                        <select
                          name='secondaryDto'
                          className='form-select form-select-solid'
                          data-control='select2'
                          data-hide-search='true'
                          data-placeholder='Secondary Dto'
                          value={selectedSecDto}
                          onChange={(e) => setSubmitDto2(dtos[e.target.value])}
                        >
                          <option value={-1}>Select a secondary dto</option>
                          {dtos &&
                            dtos.map((dto, i) => {
                              return (
                                <option key={i} value={i}>
                                  {dto.dtoName}
                                </option>
                              )
                            })}
                        </select>
                        {selectedSecDto  === -1 && hasError && (
                      <div className='fv-plugins-message-container'>
                        <div
                          data-field='input-type'
                          data-validator='notEmpty'
                          className='fv-help-block'
                        >
                          Secondary Dto is required
                        </div>
                      </div>
                    )}
                      </div>
                      {/* <!--end::Col--> */}
                    </div>
                    {/* <!--end::Row--> */}
                  </div>
                  {/* <!--end::Col--> */}
                  {/* <!--end::Col--> */}
                </div>
                <div className='row mb-10'>
                  {/* <!--begin::Col--> */}
                  <div className='col-md-12 fv-row'>
                    {/* <!--begin::Row--> */}
                    <div className='row fv-row'>
                      <div className='col-1 align-self-center'>
                        <div className='d-flex justify-content-center'>
                          <div className='badge badge-light-primary fs-8 fw-bold'>{baseType}</div>
                        </div>
                        {/* <hr style={{border: '1px dashed #000', width: '100%', margin: '10px 0'}} /> */}
                      </div>
                      {/* <!--begin::List Widget 3--> */}
                      <div className='col-4 px-0 draggable-zone'>
                        <div
                          className='card card-xl-stretch bg-light-success overflow-auto pb-5'
                          // style={{borderRadius: '0.625rem 0.625rem 0rem 0rem'}}
                        >
                          <div className='card-header border-0 d-flex justify-content-center'>
                            <h3 className='card-title fw-bold text-success draggable'>
                              {selectedDto.dtoName}
                            </h3>
                          </div>
                          {selectedDto.field ? (
                            selectedDto.field.map((field, index) => (
                              <div className='card-body px-4 pt-2 pb-2'>
                                <div className='d-flex align-items-center'>
                                  <span className='bullet bullet-vertical h-40px bg-success'></span>
                                  <div className='form-check form-check-custom form-check-solid mx-3'>
                                    {/* <input className='form-check-input' type='checkbox' value='' /> */}
                                  </div>
                                  <div className='flex-grow-1'>
                                    <div key={index}>
                                      {/* Render individual field properties here */}
                                      <a
                                        href='#'
                                        className='text-gray-800 text-hover-primary fw-bold fs-6'
                                      >
                                        {field.name}{' '}
                                        {/* Replace with the appropriate property of the field */}
                                      </a>
                                    </div>
                                  </div>

                                  {((baseType === 'ONE' && secondaryType === 'HAS-ONE') || (baseType === 'MANY' && secondaryType === 'HAS-MANY') || (baseType === 'ONE' && secondaryType === 'HAS-MANY')) && field.isUnique === true && (
                                    <span
                                      className='badge badge-light-success fs-8 fw-bold draggable-handle btn'
                                      onClick={() => {
                                        if (field.name) {
                                          setSelectedDtoPk(field.name)
                                          updateData({basepk: field.name})
                                        }
                                      }}
                                    >
                                      Select
                                    </span>
                                  )}
                                </div>
                                <div className='mt-3 separator separator-dashed border-success'></div>
                              </div>
                            ))
                          ) : (
                            <div className='card-body pt-2'>
                              <div className='d-flex align-items-center mb-8'>
                                <span className='bullet bullet-vertical h-40px bg-success'></span>
                                <div className='form-check form-check-custom form-check-solid mx-5'>
                                  {/* <input className='form-check-input' type='checkbox' value='' /> */}
                                </div>
                                <div className='flex-grow-1'>No fields available</div>
                                {/* <span className='badge badge-light-success fs-8 fw-bold'>New</span> */}
                              </div>
                            </div>
                          )}

                          {/* <!--end::Body--> */}
                        </div>
                        {
                          selectedDto2Pk !== '' && (
                            // selectedDto2.field
                            //   ?.filter((field) => field.name?.includes('Id'))
                            //   .map((field, index) => (
                            <div
                              className='card-body px-4 pt-2 pb-2 bg-light-warning pb-5'
                              style={{borderRadius: ' 0.625rem 0.625rem 0.625rem 0.625rem'}}
                              // key={index}
                            >
                              <div className='d-flex align-items-center'>
                                <span className='bullet bullet-vertical h-40px bg-warning'></span>
                                <div className='form-check form-check-custom form-check-solid mx-3'>
                                  {/* <input className='form-check-input' type='checkbox' value='' /> */}
                                </div>
                                <div className='flex-grow-1'>
                                  <div>
                                    {/* Render individual field properties here */}
                                    <a
                                      href='#'
                                      className='text-gray-800 text-hover-primary fw-bold fs-6'
                                    >
                                      {selectedDto2Pk}
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className='mt-3 separator separator-dashed border-warning'></div>
                            </div>
                          )
                          //  ))
                        }
                      </div>
                      <div className='col-3 align-self-center'>
                        <div className='d-flex justify-content-center'>
                          <div className='badge badge-light-primary fs-8 fw-bold'>
                            {secondaryType}
                          </div>
                        </div>
                        <hr style={{border: '1px dashed #000', width: '100%', margin: '10px 0'}} />
                      </div>
                      {/* <!--end:List Widget 3--> */}
                      {/* <!--begin::List Widget 3--> */}
                      <div className='col-4 px-0 draggable-zone'>
                        <div
                          className='card card-xl-stretch bg-light-warning overflow-auto pb-5'
                          // style={{borderRadius: '0.625rem 0.625rem 0rem 0rem'}}
                        >
                          {/* <!--begin::Header--> */}
                          <div className='card-header border-0 d-flex justify-content-center'>
                            <h3 className='card-title fw-bold text-warning draggable'>
                              {selectedDto2.dtoName}
                            </h3>
                          </div>
                          {/* <!--end::Header--> */}
                          {selectedDto2.field ? (
                            selectedDto2.field.map((field, index) => (
                              <div className='card-body px-4 pt-2 pb-2 bg-light-warning'>
                                <div className='d-flex align-items-center'>
                                  <span className='bullet bullet-vertical h-40px bg-warning'></span>
                                  <div className='form-check form-check-custom form-check-solid mx-3'>
                                    {/* <input className='form-check-input' type='checkbox' value='' /> */}
                                  </div>
                                  <div className='flex-grow-1'>
                                    <div key={index}>
                                      {/* Render individual field properties here */}
                                      <a
                                        href='#'
                                        className='text-gray-800 text-hover-primary fw-bold fs-6'
                                      >
                                        {field.name}{' '}
                                        {/* Replace with the appropriate property of the field */}
                                      </a>
                                    </div>
                                  </div>

                                  {((baseType === 'ONE' && secondaryType === 'HAS-ONE') || (baseType === 'MANY' && secondaryType === 'HAS-MANY') || (baseType === 'MANY' && secondaryType === 'HAS-ONE')) &&
                                    field.isUnique === true && (
                                      <span
                                        className='badge badge-light-warning fs-8 fw-bold draggable-handle btn'
                                        onClick={() => {
                                          if (field.name) {
                                            setSelectedDto2Pk(field.name)
                                            updateData({secondarypk: field.name})
                                          }
                                        }}
                                      >
                                        Select
                                      </span>
                                    )}
                                </div>
                                <div className='mt-3 separator separator-dashed border-warning'></div>
                              </div>
                            ))
                          ) : (
                            <div className='card-body pt-2'>
                              <div className='d-flex align-items-center mb-8'>
                                <span className='bullet bullet-vertical h-40px bg-warning'></span>
                                <div className='form-check form-check-custom form-check-solid mx-5'>
                                  {/* <input className='form-check-input' type='checkbox' value='' /> */}
                                </div>
                                <div className='flex-grow-1'>No fields available</div>
                                {/* <span className='badge badge-light-warning fs-8 fw-bold'>New</span> */}
                              </div>
                            </div>
                          )}
                        </div>
                        {
                          selectedDtoPk !== '' && (
                            // selectedDto2.field
                            //   ?.filter((field) => field.name?.includes('Id'))
                            //   .map((field, index) => (
                            <div
                              className='card-body px-4 pt-2 pb-2 bg-light-success pb-5'
                              style={{borderRadius: ' 0.625rem 0.625rem 0.625rem 0.625rem'}}
                              // key={index}
                            >
                              <div className='d-flex align-items-center'>
                                <span className='bullet bullet-vertical h-40px bg-success'></span>
                                <div className='form-check form-check-custom form-check-solid mx-3'>
                                  {/* <input className='form-check-input' type='checkbox' value='' /> */}
                                </div>
                                <div className='flex-grow-1'>
                                  <div>
                                    {/* Render individual field properties here */}
                                    <a
                                      href='#'
                                      className='text-gray-800 text-hover-primary fw-bold fs-6'
                                    >
                                      {selectedDtoPk}
                                    </a>
                                  </div>
                                </div>

                                {/* <span className='badge badge-light-success fs-8 fw-bold'>New</span> */}
                              </div>
                              <div className='mt-3 separator separator-dashed border-success'></div>
                            </div>
                          )
                          //  ))
                        }
                      </div>
                      {/* <!--end:List Widget 3--> */}
                    </div>
                    {/* <!--end::Row--> */}
                  </div>
                  {/* <!--end::Col--> */}
                  {/* <!--end::Col--> */}
                </div>
              </div>
            </div>
            {/* <div className="text-center pb-15 ">
            <img src={toAbsoluteUrl("/media/illustrations/sigma-1/17.png")} alt="" className="mw-100 h-200px h-sm-225px" />
          </div> */}

            <div className='d-flex flex-sack justify-content-center pt-10'>
              {!isSuccessModel && (
                <div className='me-2'>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-danger me-3'
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-primary me-3'
                    onClick={submit}
                    disabled={isSubmitting}
                  >
                    {!isSubmitting && (
                      <>{isUpdate ? 'Update Relationship' : 'Create Relationship'}</>
                    )}

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

export {CreateRelationshipModal}
function setType(arg0: string) {
  throw new Error('Function not implemented.')
}
