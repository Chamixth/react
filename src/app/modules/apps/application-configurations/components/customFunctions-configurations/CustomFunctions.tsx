import {type} from 'os'
import React, {FC, useEffect, useState} from 'react'
import {ApplicationModel, CustomFunction, Dto} from '../../../../../models/application_model'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {deleteDto, getAllDtos} from '../../../../../services/dtoService'
import {CustomFunctionCard} from '../../../../../../_metronic/partials/content/cards/CustomFunctionCard'
import {CreateCusFuncModal} from './Create-customFunctions-modal/CreateCustomFunctionsModal'
import {getAllCustomFunctionsByAppId} from '../../../../../services/cbfgService'
import CodeEditor, {SelectionText} from '@uiw/react-textarea-code-editor'
import { useAuth0 } from '@auth0/auth0-react'

type Props = {
  applicationData: ApplicationModel
  dtos: Dto[]
}

const CustomFunctions: FC<Props> = ({applicationData, dtos}) => {
  const [showFieldModal, setshowFieldModal] = useState<boolean>(false)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [showUpdateDtoModal, setshowUpdateDtoModal] = useState<boolean>(false)
  const [showCreateCusFuncModal, setshowCreateCusFuncModal] = useState<boolean>(false)
  const [customFunctions, setCustomFuntions] = useState<Array<CustomFunction>>([])
  const [updateCF, setUpdateCF] = useState<CustomFunction>({})
  const [customFunction, setCustomFuntion] = useState<CustomFunction>({})
  const [loading, setLoading] = useState(true)
  const [code, setCode] = React.useState(`function add(a, b) {\n  return a + b;\n}`)
  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState)
  }
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const userId = user?.sub;
    // Fetch the workspaces when the component mounts
    getAllCustomFunctionsByAppId(userId || '',applicationData.appId, applicationData.workspaceId)
      .then((data) => {
        // Dispatch the action to set the data in Redux
        setCustomFuntions(data)
        setLoading(false) // Set loading to false after data is received
      })
      .catch((error) => {
        // Handle errors if needed
        console.error('Error fetching applications:', error)
        setLoading(false) // Set loading to false on error
      })
  }, [applicationData.appId, applicationData.workspaceId])

  // const updateTemporaryOnChangesCFs = (tempCF: CustomFunction) => {
  //   console.log('updateTemporaryOnChanges', tempCF.pcode)
  //   // Update the dto array with the new dto
  //   setCustomFuntions((prevCFs) => {
  //     console.log(prevCFs, 'meww')

  //     // Find the index of the dto to update, if it exists
  //     const index = prevCFs.findIndex(
  //       (customFunction) => customFunction.functionId === tempCF.functionId
  //     )
  //     console.log(index, 'updated index')

  //     if (index !== -1) {
  //       // If the dto already exists in the array, update it
  //       const updatedDto = [...prevCFs]
  //       updatedDto[index] = tempCF

  //       return updatedDto
  //     } else {
  //       // If the dto doesn't exist, add it as a new dto
  //       return [...prevCFs, tempCF]
  //     }
  //   })
  //   console.log("mewa aluth ewaaa--"+customFunctions.length)
  // }

  const updateTemporaryOnChangesCFs = (tempCF: CustomFunction) => {
    setCustomFuntions((prevCF) => {
      if (!prevCF || prevCF.length === 0) {
        setUpdateCF(tempCF)
        return [tempCF]
      }

      const index = prevCF.findIndex((customFunction) => customFunction.functionId === tempCF.functionId)

      if (index !== -1) {
        const updatedCustomFunctions = [...prevCF]
        updatedCustomFunctions[index] = tempCF
        return updatedCustomFunctions
      } else {
        return [...prevCF, tempCF]
      }
    })
    setUpdateCF(tempCF)
  }
  return (
    <>
      <div className='d-flex flex-wrap flex-stack pb-7'>
        {/*begin::Title*/}
        <div className='d-flex flex-wrap align-items-center my-1'>
          <h3 className='fw-bold me-5 my-1'>
            Custom Functions ({customFunctions ? customFunctions.length : 0})
          </h3>
        </div>
        {/*end::Title*/}
        {/*begin::Controls*/}
        <div className='d-flex flex-wrap my-1'>
          {/*begin::Actions*/}

          <div className='d-flex my-0 d-flex align-items-center'>
            <i className='ki-outline ki-magnifier fs-3 position-absolute ms-3' />
            <input
              type='text'
              id='kt_filter_search'
              className='form-control form-control-sm border-body bg-body w-150px ps-10 me-5'
              placeholder='Search'
            />
            {dtos && (
              <CreateCusFuncModal
                show={showCreateCusFuncModal}
                handleCloseModal={() => setshowCreateCusFuncModal(false)}
                applicationData={applicationData}
                dtos={dtos}
                updateTemporaryOnChangesCFs={updateTemporaryOnChangesCFs}
                customFuntion={applicationData}
              />
            )}
            <a
              href='#'
              onClick={() => setshowCreateCusFuncModal(true)}
              className='btn btn-sm btn-flex btn-primary'
              data-bs-target='#kt_modal_new_card'
            >
              Add Custom Function
            </a>
          </div>
          {/*end::Actions*/}
        </div>
        {/*end::Controls*/}
      </div>

      <div className='row g-6 g-xl-9 mb-5'>
        {/*begin::Add new card*/}
        <div className='col-md-6 col-xl-4'>
          {/*begin::Card*/}
          <div className='card'>
            {/*begin::Card body*/}
            <div className='card-body d-flex flex-center'>
              {/*begin::Button*/}
              <button
                type='button'
                onClick={() => setshowCreateCusFuncModal(true)}
                className='btn btn-clear d-flex flex-column flex-center'
     
              >
                {/*begin::Illustration*/}
                <img
                  src={toAbsoluteUrl('/media/illustrations/sketchy-1/4.png')}
                  alt=''
                  className='mw-100 mh-125px mb-5'
                />
                {/*end::Illustration*/}
                {/*begin::Label*/}
                <div className='fw-bold fs-5 text-gray-600 text-hover-primary'>
                  Add New Custom Function
                </div>
                {/*end::Label*/}
              </button>
              {/*begin::Button*/}
            </div>
            {/*begin::Card body*/}
          </div>
          {/*begin::Card*/}
        </div>
        {customFunctions &&
          customFunctions.map((customFunction, i) => (
            <div className='col-md-6 col-xl-4 '>
              <CustomFunctionCard
                customFunction={customFunction}
                updateTemporaryOnChangesCFs={updateTemporaryOnChangesCFs}
                applicationData={applicationData}
                dtos={dtos}
              />
            </div>
          ))}
      </div>
    </>
  )
}

export default CustomFunctions
