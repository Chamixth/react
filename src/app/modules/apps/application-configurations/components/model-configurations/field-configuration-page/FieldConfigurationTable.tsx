import {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {createPortal} from 'react-dom'
import {Dto, Field} from '../../../../../../models/application_model'
import {CreateFieldModal} from './Create-field/CreateFieldPopup'
import {updateDtoField} from '../../../../../../services/dtoService'
import Swal from 'sweetalert2'
import {KTIcon} from '../../../../../../../_metronic/helpers'

type Props = {
  showFieldConfig: boolean
  handleCloseModal: () => void
  dto: Dto
  setDtos: React.Dispatch<React.SetStateAction<Array<Dto>>>
}

const modalsRoot = document.getElementById('root-modals') || document.body

const FieldConfigurationTable = ({showFieldConfig, handleCloseModal, dto, setDtos}: Props) => {
  const [data, setData] = useState<Field>({})
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessField, setIsSuccessField] = useState(false)
  const [showCreateFieldModal, setShowCreateFieldModal] = useState<boolean>(false)
  const [showUpdateFieldModal, setShowUpdateFieldModal] = useState<boolean>(false)
  const [updateField, setUpdateField] = useState<Field>({})
  const [Index, setIndex] = useState<number>(-1)

  //reset states on close
  const resetStates = () => {
    setData({})
    setIsSubmitting(false)
    setIsSuccessField(false)
    setHasError(false)
  }

  // Close the popup and reset states
  const handleClose = () => {
    handleCloseModal()
    setTimeout(resetStates, 1000)
  }

  const handleCloseCreateFieldModal = () => {
    setShowCreateFieldModal(false)
  }

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

  const handleDelete = (i: number) => {
    Swal.fire({
      text: 'Are you sure you want to delete ?',

      icon: 'warning',

      showCancelButton: !0,
      buttonsStyling: !1,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel',
      customClass: {
        confirmButton: 'btn fw-bold btn-danger',
        cancelButton: 'btn fw-bold btn-active-light-primary',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedFields = [...(dto?.field || [])]
        updatedFields.splice(i, 1)
        const deletedField = await updateDtoField(
          updatedFields,
          dto?.workspaceId,
          dto?.appId,
          dto?.dtoId
        )
        if (deletedField['operation'] == 'Success') {
          Swal.fire({
            icon: 'success',
            text: 'You have deleted !.',
            buttonsStyling: !1,
            confirmButtonText: 'Ok, got it!',
            customClass: {confirmButton: 'btn fw-bold btn-primary'},
          }).then(() => {
            setDtos((prevDtos) => {
              if (!prevDtos || prevDtos.length === 0) {
                return [dto]
              }
              const index = prevDtos.findIndex((Dto) => Dto.dtoId === dto?.dtoId)
              console.log(index, 'updated index')
              if (index !== -1) {
                const updatedDto = [...prevDtos]
                updatedDto[index].field = updatedFields
                console.log(updatedDto, 'updatedDto')
                return updatedDto
              } else {
                return [...prevDtos]
              }
            })
          })
        } else {
          Swal.fire('Error!', 'There was an error while deleting the field.', 'error')
        }
      }
    })
  }

  return createPortal(
    <Modal
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-1000px'
      backdrop='static'
      show={showFieldConfig}
      onHide={handleClose}
      //onEntered={loadStepper}
    >
      <div className='card  px-15 py-8'>
        {/* <!--begin::Header--> */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Entities of {dto?.dtoName}</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>{dto?.field?.length} entities</span>
          </h3>
          <div className='card-toolbar' >
            {/* <!--begin::Menu--> */}
            <CreateFieldModal
              showCreatefield={showCreateFieldModal || showUpdateFieldModal}
              handleCloseModal={() => (
                setShowCreateFieldModal(false), setShowUpdateFieldModal(false)
              )}
              dto={dto}
              isUpdate={showUpdateFieldModal}
              index={Index}
            />
            <a
              href='#'
              onClick={() => setShowCreateFieldModal(true)}
              className='btn btn-sm btn-flex btn-light-primary'
      
            >
              <i className='ki-duotone ki-plus-square fs-3'>
                <span className='path1'></span>
                <span className='path2'></span>
                <span className='path3'></span>
              </i>
              Add Field
            </a>
            <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
              <KTIcon className='fs-1' iconName='cross' />
            </div>
            {/* <!--end::Menu--> */}
          </div>
        </div>
        {/* <!--end::Header--> */}
        {/* <!--begin::Body--> */}
        <div className='card-body py-3 py-7'>
          {/* <!--begin::Table container--> */}
          <div className='table-responsive'>
            {/* <!--begin::Table--> */}
            <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              {/* <!--begin::Table head--> */}
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='w-60px'>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        value='1'
                        data-kt-check='true'
                        data-kt-check-target='.widget-13-check'
                      />
                    </div>
                  </th>
                  <th className='min-w-140px'>Name</th>
                  <th className='min-w-140px'>Data Type</th>
                  <th className='min-w-140px'>Input Type</th>
                  <th className='min-w-120px'>Is Required</th>
                  <th className='min-w-120px'>Is Encrypted</th>
                  <th className='min-w-120px'>Is Unique</th>
                  <th className='min-w-50px text-end'>Actions</th>
                </tr>
              </thead>
              {/* <!--end::Table head--> */}
              {/* <!--begin::Table body--> */}
              <tbody className='fs-6 fw-semibold text-gray-600'>
                {dto?.field?.map((field, i) => (
                  <tr key={i}>
                    <td>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>
                        <input
                          className='form-check-input widget-13-check'
                          type='checkbox'
                          value='1'
                        />
                      </div>
                    </td>
                    <td className='text-gray-600 text-hover-primary mb-1'>{field.name}</td>
                    <td>
                      <span className='badge badge-light-success'>{field.dataType}</span>
                    </td>
                    <td>{field.inputType}</td>
                    <td>{field.isRequired?.toString()}</td>
                    <td>{field.isEncrypted?.toString()}</td>
                    <td>{field.isUnique?.toString()}</td>
                    <td className='text-end'>
                      {/*<a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-5'
                      >
                        <i className='ki-duotone ki-switch fs-2'>
                          <span className='path1'></span>
                          <span className='path2'></span>
                        </i>
                      </a>*/}
                      <a
                        href='#'
                        onClick={() => (
                          setUpdateField(field), setShowUpdateFieldModal(true), setIndex(i)
                        )}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-5'
                      >
                        <i className='ki-duotone ki-pencil fs-2'>
                          <span className='path1'></span>
                          <span className='path2'></span>
                        </i>
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                        onClick={() => handleDelete(i)}
                      >
                        <i className='ki-duotone ki-trash fs-2'>
                          <span className='path1'></span>
                          <span className='path2'></span>
                          <span className='path3'></span>
                          <span className='path4'></span>
                          <span className='path5'></span>
                        </i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* <!--end::Table body--> */}
            </table>
            <div className='d-flex flex-sack justify-content-center pt-5'>
              <div className='me-2'>
                <button
                  type='button'
                  className='btn btn-lg btn-light-danger me-3'
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Close
                </button>
              </div>
            </div>
            {/* <!--end::Table--> */}
          </div>
          {/* <!--end::Table container--> */}
        </div>
        {/* <!--begin::Body--> */}
      </div>
    </Modal>,
    modalsRoot
  )
}

export default FieldConfigurationTable
