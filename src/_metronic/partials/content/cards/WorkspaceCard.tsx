/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState} from 'react'
import {Link} from 'react-router-dom'
import {UsersList} from '../../../../app/modules/profile/components/UsersList'
import {toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../dropdown/Dropdown1'
import {CreateUpdateWorkspaceModal} from '../../../../app/modules/apps/workspace/components/modals/CreateUpdateWorkspace'
import {WorkspaceModel} from '../../../../app/models/workspace_model'
import {DeleteWorkspaceModal} from '../../../../app/modules/apps/workspace/components/modals/DeleteWorkspace'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {deleteWorkspace} from '../../../../app/services/workspaceService'
import {useDispatch} from 'react-redux'
import {setWorkspaceData} from '../../../../app/redux-store/workspaceActions'
import { IconModel } from '../../../../app/modules/apps/workspace/core/IWorkspaceModels'

type Props = {
  icon: string
  badgeColor: string
  status: string
  statusColor: string
  title: string
  description: string
  gatewayType: any
  gatewayTypeName: string
  budget: string
  progress: number
  techstackIcon?: Array<IconModel>
  workspace?: WorkspaceModel
  workspacesData?: WorkspaceModel[]
  tes?: any
}

const WorkspaceCard: FC<Props> = ({
  icon,
  badgeColor,
  status,
  statusColor,
  title,
  description,
  gatewayType,
  gatewayTypeName,
  budget,
  progress,
  workspace,
  workspacesData,
  techstackIcon = undefined,
  tes,
}) => {
  const [showEditWorkspaceModal, setshowEditWorkspaceModal] = useState<boolean>(false)
  const [showDeleteWorkspaceModal, setshowDeleteWorkspaceModal] = useState<boolean>(false)
  const dispatch = useDispatch()
  const handleDelete = (workspace: WorkspaceModel) => {
    Swal.fire({
      text: 'Are you sure you want to delete ' + workspace.workspaceName + ' ?',

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
        const deletedApplication = await deleteWorkspace(workspace)
        if (deletedApplication['operation'] == 'Success') {
          // Filter out the deleted workspace from the array
          const updatedWorkspaces = (workspacesData || []).filter(
            (workspaces) => workspaces.workspaceId !== workspace.workspaceId
          )
          console.log(updatedWorkspaces, 'meka tham pennane')
          // Dispatch the updated workspace data to Redux
          dispatch(setWorkspaceData([...updatedWorkspaces]))

          Swal.fire({
            icon: 'success',
            text: 'You have deleted ' + workspace.workspaceName + '!.',
            buttonsStyling: !1,
            confirmButtonText: 'Ok, got it!',
            customClass: {confirmButton: 'btn fw-bold btn-primary'},
          }).then(() => {
            //setDeDto(dto)
          })
        } else {
          Swal.fire('Error!', 'There was an error while deleting the workspace.', 'error')
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
    <div className='card border border-2 border-gray-300 border-hover'>
      <div className='card-header border-0 pt-9 '>
        <div className='card-title m-0'>
          <div className='symbol symbol-50px w-50px bg-light'>
            <img src={icon} alt='card2' className='' />
          </div>
          <div className='fs-3 fw-bolder text-dark ms-6'>{title}</div>
        </div>
        <span className='nav-ite dropdown actionCard '>
          <a
            className='nav-link '
            href='#'
            id='navbarDropdown'
            role='button'
            data-bs-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <i className='ki-duotone ki-switch fs-1'>
              <i className='path1'></i>
              <i className='path2'></i>
              <i className='path3'></i>
              <i className='path4'></i>
            </i>
            {/*<i className="fas fa-sliders fs-3" ></i>*/}
          </a>
          <div
            className='dropdown-menu dropdown-menu-end animate slideIn'
            aria-labelledby='navbarDropdown'
          >
            <a
              className='dropdown-item pb-0'
              href='#'
              onClick={() => setshowEditWorkspaceModal(true)}
            >
              Edit Workspace
            </a>
            <div className='dropdown-divider'></div>

            <a
              className='dropdown-item pt-0'
              href='#'
              onClick={() => workspace && handleDelete(workspace)}
            >
              Delete Workspace
            </a>
          </div>
        </span>
      </div>

      {showEditWorkspaceModal && (
        <CreateUpdateWorkspaceModal
          show={showEditWorkspaceModal}
          handleCloseModal={() => setshowEditWorkspaceModal(false)}
          initialData={workspace}
          workspacesData={workspacesData}
        />
      )}

      <Link to={`/workspaces/configure/${workspace?.workspaceId}/manage/overview`}>
        <div className='card-body p-9 pt-8'>
          {/* <div className='fs-3 fw-bolder text-dark'>{title}</div> */}

          <p className='text-gray-400 fw-semibold fs-5 mt-1 mb-7'>{description}</p>
          <div className='d-flex flex-center flex-wrap'>
            <div className='row col-12 flex-stack mb-6'>
              <div
                style={{width: '45%'}}
                className='border border-gray-300 border-dashed rounded w-full py-3 px-4 mb-3'
              >
                <div className='d-flex'>
                  {gatewayType}

                  <div className='flex' style={{alignSelf: 'center'}}>
                    <div className='fs-6 text-gray-800 fw-bolder'>
                      {workspace?.gateway?.toLocaleLowerCase()||"N/A"}
                    </div>
                    <div className='fw-bold text-gray-400 fs-8'>Gateway</div>
                  </div>
                </div>
              </div>
              <div
                style={{width: '45%'}}
                className=' border border-gray-300 border-dashed rounded w-full py-3 px-4 mb-3'
              >
                <div className='d-flex'>
                  <span className='symbol symbol-40px me-3'>
                    <span className='symbol-label bg-light-info'>
                      <i className='ki-outline ki-abstract-26 fs-2 text-info'></i>
                    </span>
                  </span>
                  <div className='flex' style={{alignSelf: 'center'}}>
                    <div className='fs-6 text-gray-800 fw-bolder'>N/A</div>
                    <div className='fw-bold text-gray-400 fs-8'>Applications</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className='h-4px w-100 bg-light mb-7'
            data-bs-toggle='tooltip'
            title='This project completed'
          >
            <div
              className={`bg-${statusColor} rounded h-4px`}
              role='progressbar'
              style={{width: `${progress}%`}}
            ></div>
          </div>

          <UsersList techstackIcons={techstackIcon} />
        </div>
      </Link>
    </div>
  )
}

export {WorkspaceCard}
