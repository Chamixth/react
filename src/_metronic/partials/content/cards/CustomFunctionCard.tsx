/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {Link, Route} from 'react-router-dom'
import {UsersList} from '../../../../app/modules/profile/components/UsersList'
import {toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../dropdown/Dropdown1'
import {CreateUpdateWorkspaceModal} from '../../../../app/modules/apps/workspace/components/modals/CreateUpdateWorkspace'
import {WorkspaceModel} from '../../../../app/models/workspace_model'
import {DeleteWorkspaceModal} from '../../../../app/modules/apps/workspace/components/modals/DeleteWorkspace'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {deleteWorkspace} from '../../../../app/services/workspaceService'
import {ApplicationModel, CustomFunction, Dto} from '../../../../app/models/application_model'
import CustomFunctionDetailPage from '../../../../app/modules/apps/application-configurations/components/customFunctions-configurations/customFunctionDetailPage'

type Props = {
  customFunction: CustomFunction
  updateTemporaryOnChangesCFs?: any
  applicationData: ApplicationModel
  dtos: Dto[]
}

const CustomFunctionCard: FC<Props> = ({customFunction, updateTemporaryOnChangesCFs, applicationData, dtos}) => {
  const [showDetailPage, setshowDetailPage] = useState<boolean>(false)
  const [showEditWorkspaceModal, setshowEditWorkspaceModal] = useState<boolean>(false)
  const [showDeleteWorkspaceModal, setshowDeleteWorkspaceModal] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>('')
  const [steps, setSteps] = useState<string[]>([])

  useEffect(() => {
    console.log("mek tma  awe hloo--"+customFunction.pcode)
    const description = customFunction.pcode?.toString()
    const parts = description?.split(/\d+\./).filter((part) => part.trim().length > 0) ?? []
    setSteps(parts)
  }, [customFunction])

  useEffect(() => {
    const inputString = customFunction.functionName?.toString()
    const parts = inputString?.split('_') ?? []
    setFirstName(parts[0])
  }, [customFunction.functionName])

  const handleDelete = (workspace: WorkspaceModel) => {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: '' + workspace.workspaceName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deletedApplication = await deleteWorkspace(workspace)
        if (deletedApplication['operation'] == 'Success') {
          Swal.fire('Deleted!', 'Application has been deleted.', 'success').then(() => {
            //setDApplication(application)
          })
        } else {
          Swal.fire('Error!', 'There was an error while deleting the application.', 'error')
        }
      }
    })
    // // Call the API to delete the application with the given appId
    // deleteApplication(workspaceId,appId,userId)
    //   .then(() => {
    //     // Update the state to remove the deleted application
    //     window.location.reload()

    //   })
    //   .catch((error) => {
    //     console.error('Error deleting application:', error);
    //   });
  }

  return (
    <>
      {/*begin::Card widget 10*/}
      <div className='card card-flush mb-lg-12'>
        {/*begin::Header*/}
        <div className='card-header pt-5'>
          {/*begin::Title*/}
          <div className='card-title d-flex flex-column'>
            {/*begin::Amount*/}
            <span className='fs-1hx fw-bold text-dark me-2 lh-1'                           style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '200px',
                          }}>{firstName}</span>
            {/*end::Amount*/}
            {/*begin::Subtitle*/}
            <span className='text-gray-400 pt-1 fw-semibold fs-8'>{customFunction.functionId}</span>
            {/*end::Subtitle*/}
          </div>
          {/*end::Title*/}
        </div>
        {/*end::Header*/}
        {/*begin::Card body*/}
        <div className='card-body d-flex align-items-end pt-0 px-0'>
          {/*begin::Wrapper*/}
          <div className='d-flex align-items-center flex-wrap justify-content-center'>
            {/*begin::Chart*/}
            <div className='d-flex me-7 me-xxl-10 mb-4'>
              {/* <div id="kt_card_widget_10_chart" className="min-h-auto" style={{height: '78px', width: '78px'}} data-kt-size={78} data-kt-line={11} /> */}
            </div>
            {/*end::Chart*/}
            {/*begin::Labels*/}
            {steps.map(
              (step, index) =>
                index <= 3 && (
                  <div className='d-flex flex-column flex-grow-1 px-10' key={index}>
                    <div className='d-flex fs-6 align-items-center'>
                      <div className='bullet w-8px h-6px rounded-2 bg-primary me-3' />
                      <div className='fs-6 fw-semibold text-gray-400 flex-shrink-0'>
                        <div
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '200px',
                          }}
                        >
                          {step}
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
            <CustomFunctionDetailPage
              showDetailPage={showDetailPage}
              handleCloseModal={() => setshowDetailPage(false)}
              customFunction={customFunction}
              functionName={firstName}
              pcode={steps}
              updateTemporaryOnChangesCFs={updateTemporaryOnChangesCFs}
              applicationData={applicationData}
              dtos={dtos} 
            />
            
            <div className='d-flex flex-sack justify-content-center pt-10'>
              <button
                type='button'
                className='btn btn-md btn-light-primary py-2 px-20 me-2'
                onClick={() => setshowDetailPage(true)}
              >
                More
              </button>
            </div>
            {/*end::Labels*/}
          </div>
          {/*end::Wrapper*/}
        </div>
        {/*end::Card body*/}
      </div>
    </>
  )
}

export {CustomFunctionCard}
