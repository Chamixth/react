import React, { useState } from 'react'
import { useIllustrationsPath } from '../../../../../../_metronic/helpers'
import { CreateDtoModal } from './Create-modal/CreateDtoPopup'
import { Dto } from '../../../../../models/application_model'

type Props = {
  show: boolean
  handleCloseModal: () => void
  dto: Dto
  isUpdate?: boolean
  setDtos:React.Dispatch<React.SetStateAction<Dto[]>>
  setUpdateDto:React.Dispatch<React.SetStateAction<Dto>>
}
export const DtoEmptyModal = ({show, handleCloseModal, dto, isUpdate, setDtos, setUpdateDto}: Props) => {
  const [showCreateDtoModal, setshowCreateDtoModal] = useState<boolean>(false)

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

    if (index !== -1) {
      // If the dto already exists in the array, update it
      const updatedDto = [...prevDtos];
      updatedDto[index] = tempDto;
    console.log(prevDtos,"tahike")
      
      return updatedDto;
    } else {
    console.log(prevDtos,"tahike",tempDto)

      // If the dto doesn't exist, add it as a new dto
      return [...prevDtos, tempDto];
      
    }
    })
    
    setUpdateDto(tempDto)
  }

  return (
    <div className='card mb-10 '>
      <div className='card-body d-flex align-items-center py-8 content d-flex flex-column flex-column-fluid'>


<div className="card-px text-center pt-10 pb-15 ">

  <h2 className="fs-2 fw-bold mb-0">Create a New Object</h2>

  <p className="text-gray-400 fs-4 fw-semibold py-4">Click on the below button to
    create an Object.</p>

  <button  onClick={() => setshowCreateDtoModal(true)} className="btn btn-primary er fs-6 px-8 py-4" >Create Object</button>

  <CreateDtoModal
   show={showCreateDtoModal}
   handleCloseModal={() => setshowCreateDtoModal(false)}
   dto={dto}
   updateTemporaryOnChangesDtos={updateTemporaryOnChangesDtos}
   />
</div>

<div className="text-center pb-1 px-5">
<img src={useIllustrationsPath("4.png")} alt='' style={{marginTop:"-70px"}} className='mw-150 mh-350px' />
</div>

</div>

</div>

  )
}
