import {type} from 'os'
import React, {FC, useEffect, useState} from 'react'
import {Dto} from '../../../../../models/application_model'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import FieldConfigurationTable from './field-configuration-page/FieldConfigurationTable'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {deleteDto} from '../../../../../services/dtoService'
import {CreateDtoModal} from './Create-modal/CreateDtoPopup'

type Props = {
  dto: Dto
  firstCollapsed:boolean
  updateTemporaryOnChangesDtos:(tempDto: Dto)=>void
  setDeDto:React.Dispatch<React.SetStateAction<Dto>>
  setDtos:React.Dispatch<React.SetStateAction<Array<Dto>>>
}

const DtoRow: FC<Props> = ({dto, firstCollapsed, updateTemporaryOnChangesDtos, setDeDto, setDtos}) => {
  const [showFieldModal, setshowFieldModal] = useState<boolean>(false)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  // const [dtos, setDtos] = useState<Array<Dto>>([])
  // const [Dto, setDto] = useState<Dto>(dto)
  const [showUpdateDtoModal, setshowUpdateDtoModal] = useState<boolean>(false)
  const [updateDto, setUpdateDto] = useState<Dto>({})
  const [showCreateDtoModal, setshowCreateDtoModal] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState)
  }

  useEffect(()=>{
    if(firstCollapsed==true){
      setIsCollapsed(firstCollapsed)
      console.log("first collapsed")
    }
  },[firstCollapsed])

  // useEffect(() => {
  //   //--delete application from local
  //   setDtos((prevApplications) => prevApplications.filter((item) => item.appId !== deDto.appId))
  // }, [deDto])

  const handleDelete = (dto: Dto) => {
    Swal.fire({
      text: 'Are you sure you want to delete ' + dto.dtoName + ' ?',

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
        const deletedDto = await deleteDto(dto)
        if (deletedDto['operation'] == 'Success') {
          Swal.fire({
            icon: 'success',
            text: 'You have deleted ' + dto.dtoName + '!.',
            buttonsStyling: !1,
            confirmButtonText: 'Ok, got it!',
            customClass: {confirmButton: 'btn fw-bold btn-primary'},
          }).then(() => {
            setDeDto(dto)
          })
        } else {
          Swal.fire('Error!', 'There was an error while deleting the dto.', 'error')
        }
      }
    })
  }
  return (
    <>
      {/* <!--begin::Option--> */}
      <div className='py-0' data-kt-customer-payment-method='row'>
        {/* <!--begin::Header--> */}
        <div className='py-3 d-flex flex-stack flex-wrap '>
          {/* <!--begin::Toggle--> */}
          <div
            className={`d-flex align-items-center collapsible${isCollapsed ? ' rotate' : ''} `}
            data-bs-toggle='collapse'
            role='button'
            aria-expanded={isCollapsed ? 'false' : 'true'}
            aria-controls='kt_customer_view_payment_method_1'
            onClick={toggleCollapse}
          >
            {/* <!--begin::Arrow--> */}
            <div className={`me-3${isCollapsed ? ' rotate-90' : ''} `}>
              <i className='ki-duotone ki-right fs-3'></i>
            </div>
            {/* <!--end::Arrow--> */}
            {/* <!--begin::Logo--> */}
            <img
              src={toAbsoluteUrl('/media/stock/600x600/img-49.jpg')}
              className='w-40px me-4 rounded'
              alt='efwe'
            />
            {/* <!--end::Logo--> */}
            {/* <!--begin::Summary--> */}
            <div className='me-3'>
              <div className='d-flex align-items-center'>
                <div className='text-gray-800 fw-bold'>{dto?.dtoName}</div>
                <div className='badge badge-light-primary ms-5'>{dto?.dtoId}</div>
              </div>
              <div className='text-muted'>{dto?.field?.length} Attributes</div>
            </div>
            {/* <!--end::Summary--> */}
          </div>
          {/* <!--end::Toggle--> */}
          {/* <!--begin::Toolbar--> */}
          <div className='d-flex my-3 ms-9'>
            {/* <!--begin::Edit--> */}
            <CreateDtoModal
              show={showUpdateDtoModal}
              handleCloseModal={() => setshowUpdateDtoModal(false)}
              isUpdate={showUpdateDtoModal}
              dto={dto}
              updateTemporaryOnChangesDtos={updateTemporaryOnChangesDtos}
            />
            <a
              href='#'
              onClick={() => (setUpdateDto(dto), setshowUpdateDtoModal(true))}
              className='btn btn-icon btn-active-light-primary w-30px h-30px me-3'
              data-bs-target='#kt_modal_new_card'
            >
              <span data-bs-toggle='tooltip' data-bs-trigger='hover' title='Edit'>
                <i className='ki-duotone ki-pencil fs-3'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                </i>
              </span>
            </a>
            {/* <!--end::Edit--> */}
            {/* <!--begin::Delete--> */}
            <a
              href='#'
              onClick={() => handleDelete(dto)}
              className='btn btn-icon btn-active-light-primary w-30px h-30px me-3'
              data-bs-toggle='tooltip'
              title='Delete'
              data-kt-customer-payment-method='delete'
            >
              <i className='ki-duotone ki-trash fs-3'>
                <span className='path1'></span>
                <span className='path2'></span>
                <span className='path3'></span>
                <span className='path4'></span>
                <span className='path5'></span>
              </i>
            </a>
            {/* <!--end::Delete--> */}
            {/* <!--begin::More--> */}
            <FieldConfigurationTable
              showFieldConfig={showFieldModal}
              handleCloseModal={() => setshowFieldModal(false)}
              dto={dto}
              setDtos={setDtos}
            />
            <a
              href='#'
              onClick={() => setshowFieldModal(true)}
              className='btn btn-icon btn-active-light-primary w-30px h-30px'
            >
              <i className='ki-duotone ki-setting-3 fs-3'>
                <span className='path1'></span>
                <span className='path2'></span>
                <span className='path3'></span>
                <span className='path4'></span>
                <span className='path5'></span>
              </i>
            </a>

            {/* <!--end::More--> */}
          </div>
          {/* <!--end::Toolbar--> */}
        </div>
        {/* <!--end::Header--> */}
        {/* <!--begin::Body--> */}
        <div
          id='kt_customer_view_payment_method_1'
          className={`collapse${isCollapsed ? ' show' : ''} fs-6 ps-10`}
          data-bs-parent='#kt_customer_view_payment_method'
        >
          {/* <!--begin::Details--> */}
          <div className='d-flex flex-wrap py-5'>
            {/* <!--begin::Col--> */}
            <div className='card-body pt-0 pb-5 table-responsive'>
              <table className='table align-middle table-row-dashed gy-5'>
                <thead className='border-bottom border-gray-200 fs-7 fw-bold'>
                  <tr className='text-start text-muted text-uppercase gs-0'>
                    <th className='min-w-100px'>Name</th>
                    <th className='min-w-100px'>DataType</th>
                    <th className='min-w-100px'>InputType</th>
                    <th className='min-w-100px'>IsRequired</th>
                    <th className='min-w-100px'>IsEncrypted</th>
                    <th className='min-w-100px'>IsUnique</th>
                  </tr>
                </thead>
                <tbody className='fs-6 fw-semibold text-gray-600'>
                  {dto?.field?.map((field, i) => (
                    <tr key={i}>
                      <td className='mb-1'>{field.name}</td>
                      <td>
                        <span className='badge badge-light-success'>{field.dataType}</span>
                      </td>
                      <td>{field.inputType?.toString()}</td>
                      <td>{field.isRequired?.toString()}</td>
                      <td>{field.isEncrypted?.toString()}</td>
                      <td>{field.isUnique?.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <!--end::Col--> */}
          </div>
          {/* <!--end::Details--> */}
        </div>
        {/* <!--end::Body--> */}
      </div>
      <div className='separator separator-dashed'></div>
    </>
  )
}

export default DtoRow
