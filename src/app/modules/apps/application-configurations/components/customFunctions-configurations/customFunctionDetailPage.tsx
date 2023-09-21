import {useEffect, useState} from 'react'
import {Modal, Nav, Tab} from 'react-bootstrap'
import {createPortal} from 'react-dom'
// import {Dto, Field} from '../../../../../../models/application_model'
// import {CreateFieldModal} from './Create-field/CreateFieldPopup'
// import {updateDtoField} from '../../../../../../services/dtoService'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {number} from 'yup'
import {ApplicationModel, CustomFunction, Dto} from '../../../../../models/application_model'
import {KTIcon, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
// import {KTIcon} from '../../../../../../../_metronic/helpers'
import CodeEditor from '@uiw/react-textarea-code-editor'
import {CreateCusFuncModal} from './Create-customFunctions-modal/CreateCustomFunctionsModal'

type Props = {
  showDetailPage: boolean
  handleCloseModal: () => void
  customFunction: CustomFunction
  functionName: string
  pcode: string[]
  updateTemporaryOnChangesCFs?: any
  applicationData: ApplicationModel
  dtos: Dto[]
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CustomFunctionDetailPage = ({
  showDetailPage,
  handleCloseModal,
  customFunction,
  functionName,
  pcode,
  updateTemporaryOnChangesCFs,
  applicationData,
  dtos,
}: Props) => {
  // const [data, setData] = useState<Field>({})
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessField, setIsSuccessField] = useState(false)
  const [showUpdateFieldModal, setShowUpdateFieldModal] = useState<boolean>(false)
  const [showCreateCusFuncModal, setshowCreateCusFuncModal] = useState<boolean>(false)
  // const [updateField, setUpdateField] = useState<Field>({})
  const [Index, setIndex] = useState<number>(-1)
  const [codeLines, setCodeLines] = useState<string>()

  useEffect(() => {
    const code = customFunction.code?.toString()
    const parts = code?.split(/\n/).filter((part) => part.trim().length > 0) ?? []
    setCodeLines(parts.join('\n')) // Join lines with line breaks
  }, [customFunction.code])

  //reset states on close
  const resetStates = () => {
    // setData({})
    setIsSubmitting(false)
    setIsSuccessField(false)
    setHasError(false)
  }

  // Close the popup and reset states
  const handleClose = () => {
    handleCloseModal()
    setTimeout(resetStates, 1000)
  }

  // const handleCloseCreateFieldModal = () => {
  //   setShowCreateFieldModal(false)
  // }

  //   const handleDelete = async (i: number) => {
  //     const updatedFields = [...(dto?.Field || [])];
  //     updatedFields.splice(i, 1);

  //     // Update the field in the database
  //     try {
  //       await updateDtoField(updatedFields, dto?.workspaceId, dto?.appId, dto?.dtoId);
  //       // Fetch the updated data from the database
  //     //   const updatedData = await fetchDataFromDatabase(); // Implement this function to fetch data
  //       // Update the state with the new data
  //     //   setUpdateField((prevDto) => ({
  //     //     ...prevDto,
  //     //     Field: updatedData,
  //     //   }));
  //     } catch (error) {
  //       console.error('Error updating field:', error);
  //     }
  //   };

  // const handleDelete = (i: number) => {
  //   Swal.fire({
  //     text: 'Are you sure you want to delete ?',

  //     icon: 'warning',

  //     showCancelButton: !0,
  //     buttonsStyling: !1,
  //     confirmButtonText: 'Yes, delete!',
  //     cancelButtonText: 'No, cancel',
  //     customClass: {
  //       confirmButton: 'btn fw-bold btn-danger',
  //       cancelButton: 'btn fw-bold btn-active-light-primary',
  //     },
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       const updatedFields = [...(dto?.field || [])]
  //       updatedFields.splice(i, 1)
  //       const deletedField = await updateDtoField(
  //         updatedFields,
  //         dto?.workspaceId,
  //         dto?.appId,
  //         dto?.dtoId
  //       )
  //       if (deletedField['operation'] == 'Success') {
  //         Swal.fire({
  //           icon: 'success',
  //           text: 'You have deleted !.',
  //           buttonsStyling: !1,
  //           confirmButtonText: 'Ok, got it!',
  //           customClass: {confirmButton: 'btn fw-bold btn-primary'},
  //         }).then(() => {
  //           setUpdateField((prevDto) => ({
  //             ...prevDto,
  //             Field: deletedField,
  //           }))
  //         })
  //       } else {
  //         Swal.fire('Error!', 'There was an error while deleting the field.', 'error')
  //       }
  //     }
  //   })
  // }

  return createPortal(
    <Modal
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered'
      backdrop='static'
      show={showDetailPage}
      fullscreen={true}
      onHide={handleClose}
      //onEntered={loadStepper}
    >
      <div className='card   px-15 py-8'>
        {/* <!--begin::Header--> */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>{functionName} - detail view</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>{customFunction.functionId}</span>
          </h3>
          <div className='d-flex align-items-center'>
            <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
              <KTIcon className='fs-1' iconName='cross' />
            </div>
          </div>
        </div>
        {/* <!--end::Header--> */}
        {/* <!--begin::Body--> */}

        <div className='contet d-flex flex-column flex-column-fluid' id='kt_content'>
          {/*begin::Container*/}
          <div className='' id='kt_content_container'>
            {/*begin::Invoice 2 main*/}
            <div className='card'>
              {/*begin::Body*/}
              <div className='card-body p-lg-10'>
                {/*begin::Layout*/}
                <div className='d-flex flex-column flex-xl-row'>
                  {/*begin::Content*/}
                  <div className='flex-lg-row-fluid col-8 me-xl-18  mb-xl-0'>
                    <div className='mt-n1'>
                      {/*begin::Top*/}
                      <CreateCusFuncModal
                        show={showCreateCusFuncModal}
                        handleCloseModal={() => setshowCreateCusFuncModal(false)}
                        applicationData={applicationData}
                        dtos={dtos}
                        updateTemporaryOnChangesCFs={updateTemporaryOnChangesCFs}
                        isUpdate={true}
                        customFuntion={customFunction}
                      />
                      <div className='d-flex flex-stack pb-10'>
                        {/*begin::Logo*/}
                        <a href='#'></a>
                        {/*end::Logo*/}
                        {/*begin::Action*/}
                        <a
                          href='#'
                          onClick={() => setshowCreateCusFuncModal(true)}
                          className='btn btn-sm btn-flex btn-primary'
                        >
                          Regenerate
                        </a>
                        {/*end::Action*/}
                      </div>
                      {/*end::Top*/}
                      <CodeEditor
                        value={codeLines}
                        language='go'
                        placeholder='Please enter Go code.'
                        onChange={(evn) => setCodeLines(evn.target.value)}
                        style={{
                          fontSize: 12,

                          backgroundColor: '#fff',
                          fontFamily:
                            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                      />
                    </div>
                  </div>
                  {/*end::Content*/}
                  {/*begin::Sidebar*/}
                  <div className='m-0 col-4' style={{height: 'fit-content'}}>
                    {/*begin::Invoice 2 sidebar*/}
                    <div className='d-print-none border border-dashed border-gray-300 card-rounded h-lg-100 min-w-md-350px p-9 bg-lighten'>
                      {/*begin::Labels*/}
                      <div className='mb-8'>
                        <span className='badge badge-light-success me-2'>Brief</span>
                        <span className='badge badge-light-warning'>Code Overview</span>
                      </div>
                      {/*end::Labels*/}
                      {/*begin::Title*/}
                      <h6 className='mb-8 fw-bolder text-gray-700 text-hover-primary'>
                        Code Summary
                      </h6>
                      {/*end::Title*/}
                      <div className='mb-6'>
                        {pcode.map((step, index) => (
                          <div
                            className='fs-6 fw-semibold text-gray-600 mb-3 border-bottom  pb-3'
                            key={index}
                          >
                            <span className='fw-bold'>{index + 1}</span>.{step}
                          </div>
                        ))}
                      </div>

                      <div className='mb-6'>
                        <div className='fw-semibold text-gray-600 fs-7'>Function Name</div>
                        <div className='fw-bold fs-6 text-gray-800'>
                          {functionName}
                          <a href='#' className='link-primary fs-8 ps-1'>
                            [{customFunction.functionId}]
                          </a>
                        </div>
                      </div>
                    </div>
                    {/*end::Invoice 2 sidebar*/}
                  </div>
                  {/*end::Sidebar*/}
                </div>
                {/*end::Layout*/}
              </div>
              {/*end::Body*/}
            </div>
            {/*end::Invoice 2 main*/}
          </div>
          {/*end::Container*/}
        </div>
      </div>
    </Modal>,
    modalsRoot
  )
}

export default CustomFunctionDetailPage
