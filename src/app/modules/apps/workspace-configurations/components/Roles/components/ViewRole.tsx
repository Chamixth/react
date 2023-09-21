import {useEffect, useState} from 'react'
import {useAuth0} from '@auth0/auth0-react'
import {DtoRBAC, RBAC} from '../../../../../../models/role_base_access_model'
import {createRole, getRole, updateRole} from '../../../../../../services/roleService'
import {getAllDtoRoles, updateDtoRole} from '../../../../../../services/dtoRoleService'
import {WorkspaceModel} from '../../../../../../models/workspace_model'
import {Link, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'

type Props = {
  workspaceData: WorkspaceModel
}

const ViewRole = ({workspaceData}: Props) => {
  const [data, setData] = useState<DtoRBAC>({})
  const [role, setRole] = useState<RBAC>({})
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>()
  const [dtoRoles, setDtoRoles] = useState<Array<DtoRBAC>>([])
  const [hasError, setHasError] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessApplication, setIsSuccessApplication] = useState(false)
  const {user, isAuthenticated} = useAuth0()
  const [create, setCreate] = useState<boolean>(false)
  const [write, setWrite] = useState<boolean>(false)
  const [read, setRead] = useState<boolean>(false)
  const [del, setDel] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  // State to track checked checkboxes
  const [checkedPermissions, setCheckedPermissions] = useState({})

  const {roleId} = useParams()
  const {workspaceId} = useParams()

  useEffect(() => {
    setLoading(true)
    const userId = user?.sub

    getRole(userId || '', workspaceId || '', roleId || '')
      .then((data) => {
        if (data != null) {
          setRole(data)
          getAllDtoRoles(userId || '', workspaceId || '', roleId || '')
            .then((data) => {
              setDtoRoles(data)
              setLoading(false)
            })
            .catch((error) => {
              console.error('Error fetching dto roles:', error)
              setLoading(false)
            })
        }
      })
      .catch((error) => {
        console.error('Error fetching role:', error)
        setLoading(false)
      })
  }, [workspaceData])

  // Function to update the permissions array for a dtoRole
  const updatePermissions = (roleIndex, newPermissions) => {
    setDtoRoles((prevRoles) => {
      const updatedRoles = [...prevRoles]
      updatedRoles[roleIndex].access = newPermissions
      return updatedRoles
    })
  }

  //--selecta all--
  const toggleSelectAll = (index) => {
    setDtoRoles((prevDtoRoles) => {
      const allPermissions = ['UPDATE', 'CREATE', 'DELETE','READ'] // List of all permissions
      const updatedDtoRoles = [...prevDtoRoles] // Create a copy of the array

      if (updatedDtoRoles[index].access?.length === allPermissions.length) {
        // If all permissions are already selected, unselect all
        updatedDtoRoles[index].access = []
      } else {
        // Otherwise, select all permissions
        updatedDtoRoles[index].access = [...allPermissions]
      }

      return updatedDtoRoles
    })
  }

  function isSelectAllChecked(roleIndex) {
    // Assuming you have an array of dtoRoles with each role having an 'access' array
    const allPermissions = ['UPDATE', 'CREATE', 'DELETE','READ'] // List of all permissions

    // Check if all permissions exist in the 'access' array of the specific dtoRole
    const dtoRole = dtoRoles[roleIndex]
    return allPermissions.every((permission) => dtoRole.access?.includes(permission))
  }

  const update = async (index) => {
    setIsSuccessApplication(false)
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const updatedDtoRole = await updateDtoRole(dtoRoles[index])
      if (updatedDtoRole.roleId !== '') {
        setIsSuccessApplication(true)
        setIsSubmitting(false)
      }
    } catch (error) {
      setHasError(true)
      setIsSubmitting(false)
      console.error(error)
    } finally {
      setSelectedRoleIndex(-1)
    }
  }

  useEffect(() => {
    if (hasError) {
      Swal.fire({
        text: 'Something went wrong while updating data. Please try again.',

        icon: 'warning',
        showCancelButton: !0,
        buttonsStyling: !1,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Close',
        customClass: {
          confirmButton: 'btn fw-bold btn-danger',
          cancelButton: 'btn fw-bold btn-active-light-primary',
        },
      })
    }
  }, [hasError])

  return (
    <>
      {loading && <>Loading...</>}
      {!loading && (
        <>
          <div className='d-flex flex-wrap flex-stack mb-6'>
            <h3 className='fw-bolder my-2 fs-4'>
              <Link to='#' onClick={() => window.history.back()}>
                <button className='btn btn-sm btn-icon btn-hover-color-primary w-40px h-30px'>
                  <i className='ki-duotone ki-black-left fs-2 text-gray-500'></i>
                </button>
              </Link>
              {role.role} <span className='fw-semibold my-2'>Role Access Configuration</span>
              {/* <span className='fs-6 text-gray-400 fw-bold ms-1'>Active</span> */}
            </h3>
          </div>
          <div className='card mb-5 mb-xl-10'>
            <div className='card-body pt-9 pb-0'>
              {/*begin::Form*/}
              <form id='kt_modal_update_role_form' className='form' action='#'>
                {/*begin::Scroll*/}
                <div
                  className='d-flex flex-column scroll-y me-n7 pe-7'
                  id='kt_modal_update_role_scroll'
                  data-kt-scroll='true'
                  data-kt-scroll-activate='{default: false, lg: true}'
                  data-kt-scroll-max-height='auto'
                  data-kt-scroll-dependencies='#kt_modal_update_role_header'
                  data-kt-scroll-wrappers='#kt_modal_update_role_scroll'
                  data-kt-scroll-offset='300px'
                >
                  {/*begin::Input group*/}
                  <div className='fv-row mb-10'>
                    {/*begin::Label*/}
                    <label className='fs-5 fw-bold form-label mb-2'>
                      <span className='required'>Role name</span>
                    </label>
                    {/*end::Label*/}
                    {/*begin::Input*/}
                    <input
                      className='form-control form-control-solid'
                      placeholder='Enter a role name'
                      name='role_name'
                      defaultValue={role.role}
                      disabled={true}
                    />
                    {/*end::Input*/}
                  </div>
                  {/*end::Input group*/}
                  {/*begin::Permissions*/}
                  <div className='fv-row'>
                    {/*begin::Label*/}
                    <label className='fs-5 fw-bold form-label mb-2 required'>
                      Role Permissions
                    </label>
                    {/*end::Label*/}
                    {/*begin::Table wrapper*/}
                    <div className='table-responsive'>
                      {/*begin::Table*/}
                      <table className='table align-middle table-row-dashed fs-6 gy-5'>
                        {/*begin::Table body*/}
                        <tbody className='text-gray-600 fw-semibold'>
                          {dtoRoles && (
                            <>
                              {dtoRoles.map((dtoRole, roleIndex) => (
                                <>
                                  {/*begin::Table row*/}
                                  <tr key={roleIndex}>
                                    {/*begin::Label*/}
                                    <td className='text-gray-800'>{dtoRole.dtoName} Management</td>
                                    {/*end::Label*/}
                                    {/*begin::Input group*/}
                                    <td>
                                      {/*begin::Wrapper*/}
                                      <div className='d-flex'>
                                        {/* Render checkboxes for each permission */}
                                        {['CREATE', 'READ', 'UPDATE', 'DELETE'].map(
                                          (permission, permIndex) => (
                                            <label
                                              className='form-check form-check-sm form-check-custom form-check-solid me-9'
                                              key={permIndex}
                                            >
                                              <input
                                                className='form-check-input me-2'
                                                type='checkbox'
                                                name={`permission_${permission}`}
                                                checked={
                                                  dtoRole.access
                                                    ? dtoRole.access.includes(permission)
                                                    : false
                                                }
                                                onChange={() => {
                                                  if (dtoRole.access) {
                                                    const newPermissions = [...dtoRole.access]
                                                    if (newPermissions.includes(permission)) {
                                                      // Permission exists, remove it
                                                      const index =
                                                        newPermissions.indexOf(permission)
                                                      if (index !== -1) {
                                                        newPermissions.splice(index, 1)
                                                      }
                                                    } else {
                                                      // Permission doesn't exist, add it
                                                      newPermissions.push(permission)
                                                    }
                                                    updatePermissions(roleIndex, newPermissions)
                                                  }
                                                }}
                                              />
                                              {permission}
                                            </label>
                                          )
                                        )}
                                      </div>
                                      {/*end::Wrapper*/}
                                    </td>
                                    {/*end::Input group*/}
                                    <td>
                                      <label className='form-check form-check-sm form-check-custom form-check-solid me-9'>
                                        <input
                                          className='form-check-input me-2'
                                          type='checkbox'
                                          name={`select_all`}
                                          checked={isSelectAllChecked(roleIndex)}
                                          onClick={() => {
                                            toggleSelectAll(roleIndex)
                                          }}
                                        />
                                        Select All
                                      </label>
                                    </td>
                                    <td>
                                      <button
                                        key={roleIndex}
                                        type='button'
                                        className='btn btn-primary btn-sm'
                                        onClick={() => {
                                          setSelectedRoleIndex(roleIndex)
                                          update(roleIndex)
                                        }}
                                      >
                                        {!isSubmitting && (
                                          <span className='indicator-label'>Edit</span>
                                        )}
                                        {isSubmitting && selectedRoleIndex != roleIndex && (
                                          <span className='indicator-label'>Edit</span>
                                        )}
                                        {isSubmitting && selectedRoleIndex === roleIndex && (
                                          <span className='indicator-label'>Please wait...</span>
                                        )}
                                      </button>
                                    </td>
                                  </tr>
                                  {/*end::Table row*/}
                                </>
                              ))}
                            </>
                          )}
                        </tbody>
                        {/*end::Table body*/}
                      </table>
                      {/*end::Table*/}
                    </div>
                    {/*end::Table wrapper*/}
                  </div>
                  {/*end::Permissions*/}
                </div>
                {/*end::Scroll*/}
                {/*begin::Actions*/}
                {/* <div className='text-center pt-15'>
                  <button
                    type='reset'
                    className='btn btn-light me-3'
                    data-kt-roles-modal-action='cancel'
                  >
                    Discard
                  </button>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    data-kt-roles-modal-action='submit'
                  >
                    <span className='indicator-label'>Submit</span>
                    <span className='indicator-progress'>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2' />
                    </span>
                  </button>
                </div> */}
                {/*end::Actions*/}
              </form>
              {/*end::Form*/}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export {ViewRole}
