import {type} from 'os'
import React, {FC, useEffect, useState} from 'react'
import {ApplicationModel, Dto} from '../../../../../models/application_model'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import FieldConfigurationTable from './field-configuration-page/FieldConfigurationTable'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {deleteDto, getAllDtos} from '../../../../../services/dtoService'
import {CreateDtoModal} from './Create-modal/CreateDtoPopup'
import DtoRow from './DtoRow'
import { DtoEmptyModal } from './DtoEmptyModal'

type Props = {
  applicationData: ApplicationModel
  dtos:Dto[]
  setDtos:React.Dispatch<React.SetStateAction<Dto[]>>
}

const Dtos: FC<Props> = ({applicationData, dtos, setDtos}) => {
  const [showFieldModal, setshowFieldModal] = useState<boolean>(false)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [deDto, setDeDto] = useState<Dto>({})
  const [showUpdateDtoModal, setshowUpdateDtoModal] = useState<boolean>(false)
  const [updateDto, setUpdateDto] = useState<Dto>({})
  const [showCreateDtoModal, setshowCreateDtoModal] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState)
  }
  
  useEffect(() => {
    //--delete application from local
    setDtos((prevDtos) => prevDtos?.filter((item) => item.dtoId !== deDto.dtoId))
    console.log("after delete - "+dtos)
  }, [deDto])

  const updateTemporaryOnChangesDtos = (tempDto: Dto) => {
    console.log('updateTemporaryOnChanges', tempDto)
    // Update the dto array with the new dto
    setDtos((prevDtos) => {
      console.log(prevDtos,"meww")
    if (!prevDtos || prevDtos.length === 0) {
      // If there are no dto, update the updatedto state
      setUpdateDto(tempDto);
      return [tempDto]; // Create a new array with the tempDto
    }

    // Find the index of the dto to update, if it exists
    const index = prevDtos.findIndex((dto) => dto.dtoId === tempDto.dtoId);
    console.log(index,"updated index")

    if (index !== -1) {
      // If the dto already exists in the array, update it
      const updatedDto = [...prevDtos];
      updatedDto[index] = tempDto;
      
      return updatedDto;
    } else {

      // If the dto doesn't exist, add it as a new dto
      return [...prevDtos, tempDto];
      
    }
    })
    
    setUpdateDto(tempDto)
  }

  return (
    <>
      {/* <!--begin::Card--> */}
      <div className='card pt-4 mb-6 mb-xl-9'>
        {/* <!--begin::Card header--> */}
        <div className='card-header border-0'>
          {/* <!--begin::Card title--> */}
          <div className='card-title'>
            <h2 className='fw-bold mb-0'>Application Object's</h2>
          </div>
          {/* <!--end::Card title--> */}
          {/* <!--begin::Card toolbar--> */}
          <div className='card-toolbar'>
            <CreateDtoModal
              show={showCreateDtoModal}
              handleCloseModal={() => setshowCreateDtoModal(false)}
              dto={applicationData}
              updateTemporaryOnChangesDtos={updateTemporaryOnChangesDtos}
            />
            <a
              href='#'
              onClick={() => setshowCreateDtoModal(true)}
              className='btn btn-sm btn-flex btn-light-primary'
              data-bs-target='#kt_modal_new_card'
            >
              <i className='ki-duotone ki-plus-square fs-3'>
                <span className='path1'></span>
                <span className='path2'></span>
                <span className='path3'></span>
              </i>
              Add Object
            </a>
          </div>
          {/* <!--end::Card toolbar--> */}
        </div>
        {/* <!--end::Card header--> */}
        {/* <!--begin::Card body--> */}
        {(!dtos || dtos.length === 0) &&<DtoEmptyModal
         show={showCreateDtoModal}
         handleCloseModal={() => setshowCreateDtoModal(false)}
         dto={applicationData}
         setDtos={setDtos}
         setUpdateDto={setUpdateDto}
         
         
        />}
        <div id='kt_customer_view_payment_method' className='card-body pt-0'>
          {dtos &&
            dtos.map((dto, i) => {
              return <DtoRow 
              key={i} 
              dto={dto} 
              firstCollapsed={i === 0} 
              updateTemporaryOnChangesDtos={updateTemporaryOnChangesDtos} 
              setDeDto={setDeDto}
              setDtos={setDtos}
              />;
            })}
        </div>
      </div>
    </>
  )
}

export default Dtos
