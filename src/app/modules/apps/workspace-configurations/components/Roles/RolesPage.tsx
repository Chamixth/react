import React, {useEffect, useState} from 'react'
import {RBAC} from '../../../../../models/role_base_access_model'
import {WorkspaceModel} from '../../../../../models/workspace_model'
import {RoleModal} from './components/RoleModal'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {CreateUpdateRole} from './components/CreateUpdateRole'
import {useAuth0} from '@auth0/auth0-react'
import {deleteRole, getAllRoles} from '../../../../../services/roleService'
import Swal from 'sweetalert2'
import { ViewRole } from './components/ViewRole'

type Props = {
  workspaceData: WorkspaceModel
}

const RolesPage: React.FC<Props> = (props) => {
  const [roles, setRoles] = useState<Array<RBAC>>([])
  const [value, setValue] = useState('')
  const [showCreateUpdateRoleModal, setShowCreateUpdateRoleModal] = useState(false)
  const [updateRole, setUpdateRole] = useState<RBAC>({})
  const {user, isAuthenticated} = useAuth0()
  const [dRole, setDRole] = useState<RBAC>({})
  const [upRole, setUpRole] = useState<RBAC>({})
  const [loading, setLoading] = useState<boolean>(true)

  const searchValue = (value: string) => {
    setValue(value)
    if (value) {
      const filteredApplications = roles.filter((role) =>
        role?.role?.toLowerCase().includes(value.toLowerCase())
      )
      setRoles(filteredApplications)
    } else {
      setRoles(roles)
    }
  }

  const updateTemporaryOnChangesRoles = (tempRole: RBAC) => {
    // Update the roles array with the new role
    setRoles((prevRoles) => {
      if (!prevRoles || prevRoles.length === 0) {
        // If there are no roles, update the updateRole state and return a new array with the tempRole
        setUpdateRole(tempRole)
        return [tempRole]
      }

      // Find the index of the role to update, if it exists
      const index = prevRoles.findIndex((role) => role.roleId === tempRole.roleId)

      console.log('update index', index)

      if (index !== -1) {
        // If the role already exists in the array, update it
        const updatedRoles = [...prevRoles]
        updatedRoles[index] = tempRole

        return updatedRoles
      } else {
        // If the role doesn't exist, add it as a new role
        return [...prevRoles, tempRole]
      }
    })
  }

  const handleDelete = (role: RBAC) => {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: '' + role.role + ':' + role.roleId,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deletedApi = await deleteRole(role)
          if (deletedApi['operation'] == 'Success') {
            Swal.fire('Deleted!', 'API has been deleted.', 'success').then(() => {
              setDRole(role)
            })
          } else {
            Swal.fire('Error!', 'There was an error while deleting the API.', 'error')
          }
        } catch (e) {
          Swal.fire('Error!', 'There was an error while deleting the API.', 'error')
        }
      }
    })
  }

  useEffect(() => {
    //--delete role from local
    console.log('delete obj', dRole.role)
    setRoles((prevRoles) => prevRoles.filter((item) => item.roleId !== dRole.roleId))
  }, [dRole])

  useEffect(() => {
    //-- update role locally
    console.log('update obj', upRole);
  
    setRoles((prevRoles) => {
      const updatedRoles = prevRoles.map((item) => {
        if (item.roleId === upRole.roleId) {
          // Update the specific role using the dRole object
          return upRole
        }
        return item;
      });
  
      return updatedRoles;
    });
  }, [upRole]);
  
  useEffect(() => {
    // Fetch the workspaces when the component mounts
    const userId = user?.sub
    getAllRoles(userId || '', props.workspaceData.workspaceId || '')
      .then((data) => {
        // Dispatch the action to set the data in Redux
        setRoles(data)

        setLoading(false) // Set loading to false after data is received
      })
      .catch((error) => {
        // Handle errors if needed
        console.error('Error fetching applications:', error)
        setLoading(false) // Set loading to false on error
      })
  }, [props.workspaceData])

  return (
    <div>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <span>
          <h3 className='fw-bolder my-2'>
            Manage Roles
            <span className='fs-6 text-gray-400 fw-bold ms-1'>({roles ? roles.length : '0'})</span>
          </h3>
          <ul className='breadcrumb fw-semibold fs-8 my-1'>
            <li className='breadcrumb-item text-muted'>
              <Link to={`/workspaces`}>
                <a href='#' className='text-muted text-hover-primary'>
                  Roles
                </a>
              </Link>
            </li>
            <li className='breadcrumb-item text-muted'>Roles</li>
          </ul>
        </span>
        <div className='d-flex flex-wrap my-2'>
          <div className='me-4'>
            <div className='d-flex align-items-center position-relative'>
              <i className='ki-outline ki-magnifier fs-3 position-absolute ms-3'></i>
              <input
                type='text'
                id='kt_filter_search'
                className='form-control form-control-sm border-body bg-body w-170px ps-10'
                placeholder='Search Roles'
                value={value}
                onChange={(e) => {
                  searchValue(e.target.value)
                }}
              />
            </div>
          </div>
          <CreateUpdateRole
            workspaceId={props.workspaceData.workspaceId ? props.workspaceData.workspaceId : ''}
            show={showCreateUpdateRoleModal}
            handleCloseModal={() => setShowCreateUpdateRoleModal(false)}
            updateTemporaryOnChangesRoles={updateTemporaryOnChangesRoles}
            roleModal={{}}
            setUpRole={setUpRole}
          />

          <a
            href='#'
            onClick={() => setShowCreateUpdateRoleModal(true)}
            className='btn btn-primary btn-sm'
          >
            New Role
          </a>
        </div>
      </div>
      {/*begin::Content*/}
      <div className='content d-flex flex-column flex-column-fluid'>
        {/*begin::Container*/}
        <div>
          {/*begin::Row*/}
          <div className='row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 g-xl-5'>
            {roles && (
              <>
                {roles.map((role,index) => (
                  <RoleModal
                  key={index}
                    roleModal={role}
                    setUpRole={setUpRole}
                    deleteModal={() => {
                      handleDelete(role)
                    }}
                  ></RoleModal>
                ))}
              </>
            )}
            {/*begin::Card*/}
            <div className='card h-md-100'>
              <div className='card-header'>
                {/*begin::Card title*/}
                <div className='card-title'>
                <div className='fw-bold fs-3 text-gray-600 text-hover-primary'>Add New Role</div>
                </div>
                {/*end::Card title*/}
              </div>
              {/*begin::Card body*/}
              <div className='card-body d-flex flex-center'>
                {/*begin::Button*/}
                <button
                  type='button'
                  className='btn btn-clear d-flex flex-column flex-center'
                  onClick={() => setShowCreateUpdateRoleModal(true)}
                >
                  {/*begin::Illustration*/}
                  <img
                    src={toAbsoluteUrl('/media/illustrations/sketchy-1/10.png')}
                    alt=''
                    className='mw-100 mh-150px mb-7'
                  />
                  {/*end::Illustration*/}
                  {/*begin::Label*/}
                  {/* <div className='fw-bold fs-3 text-gray-600 text-hover-primary'>Add New Role</div> */}
                  {/*end::Label*/}
                </button>
                {/*begin::Button*/}
              </div>
              {/*begin::Card body*/}
            </div>
            {/*begin::Card*/}
          </div>
          {/*end::Row*/}
          {/*end::Modals*/}
        </div>
        {/*end::Container*/}
      </div>
      {/*end::Content*/}
    </div>
  )
}

export default RolesPage
