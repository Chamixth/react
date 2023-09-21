import {useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {ApplicationModel} from '../../../../../../models/application_model'
import {useAuth0} from '@auth0/auth0-react'
import {RBAC} from '../../../../../../models/role_base_access_model'
import {createRole, updateRole} from '../../../../../../services/roleService'
import {KTIcon} from '../../../../../../../_metronic/helpers'
import Swal from 'sweetalert2'

type Props = {
  workspaceId: string
  show: boolean
  handleCloseModal: () => void
  roleModal: RBAC
  setUpRole: React.Dispatch<React.SetStateAction<RBAC>>
  setNewApplicationFlowChart?: React.Dispatch<React.SetStateAction<ApplicationModel>>
  updateTemporaryOnChangesRoles: any
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateUpdateRole = ({
  workspaceId,
  show,
  handleCloseModal,
  updateTemporaryOnChangesRoles,
  roleModal,
  setUpRole,
}: Props) => {
  const [data, setData] = useState<RBAC>({})
  const [hasError, setHasError] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessApplication, setIsSuccessApplication] = useState(false)
  const {user, isAuthenticated} = useAuth0()
  const [create, setCreate] = useState<boolean>(false)
  const [write, setWrite] = useState<boolean>(false)
  const [read, setRead] = useState<boolean>(false)
  const [del, setDel] = useState<boolean>(false)

  useEffect(() => {
    if (roleModal.roleId) {
      console.log("edit data",roleModal)
      setCheckBoxes()
      const updatedRoleModal = {...roleModal, access: []}
      setData(updatedRoleModal)
      setIsUpdate(true)
    } else {
      console.log("new data",roleModal)
      setData({...data, access:[]})
      setCreate(true)
      setRead(true)
      setDel(true)
      setWrite(true)
    }
  }, [show])

  const setCheckBoxes = () => {
    if (roleModal.access) {
      for (let item of roleModal.access) {
        switch (item) {
          case 'CREATE':
            setCreate(true)
            break
          case 'READ':
            setRead(true)
            break
          case 'UPDATE':
            setWrite(true)
            break
          case 'DELETE':
            setDel(true)
            break
          default:
            break
        }
      }
    }
  }

  //reset states on close
  const resetStates = () => {
    setData({})
    setIsSubmitting(false)
    setIsSuccessApplication(false)
    setHasError(false)
    setCreate(false)
    setRead(false)
    setWrite(false)
    setDel(false)
    setIsUpdate(false)
  }

  const handleClose = () => {
    handleCloseModal()
    setTimeout(resetStates, 1000)
  }

  const checkRoleValidation = (): boolean => {
    if (!data.role) {
      return false
    }
    return true
  }
  const setAccess = (): boolean => {
    // updateData({access: []})

    // const finalRoleModal = {...data, access: []}
    setData({...data, access:[]})

    if (data.access) {
      if (write) {
        data.access.push('UPDATE')
      }
      if (create) {
        data.access.push('CREATE')
      }
      if (del) {
        data.access.push('DELETE')
      }
      if (read) {
        data.access.push('READ')
      }
      console.log('kes',data.access)
      return true
    }
    console.log('kes',data.access)
    return false
  }

  const submit = async () => {
    if (!checkRoleValidation()) {
      setHasError(true)
      return Swal.fire({
        text: 'Role name is required!',

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
    } else {
      if (setAccess()) {
        let newRole: RBAC = data
        newRole.workspaceId = workspaceId
        setIsSubmitting(true)
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          if (isUpdate) {
            try {
              const updatedRole = await updateRole(newRole)
              if (updatedRole.roleId !== '') {
                setUpRole(updatedRole)
                setIsSuccessApplication(true)
              }
            } catch (error) {
              console.error('Error updating role:', error)
            }
          } else {
            const userId = user?.sub
            newRole.userId = userId
            const createdRole = await createRole(newRole)
            if (createdRole.roleId != '') {
              if (updateTemporaryOnChangesRoles) {
                updateTemporaryOnChangesRoles(createdRole)
              }
              console.log(`Role`, createdRole)
              setIsSuccessApplication(true)
            }
          }
        } catch (error) {
          console.error('Error creating workspace:', error)
          setIsSuccessApplication(false)
        } finally {
          setIsSubmitting(false)
        }
      }
    }
    // window.location.reload()
  }

  const updateData = (fieldsToUpdate: Partial<RBAC>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  return createPortal(
    <Modal
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-600px'
      show={show}
      onHide={handleClose}
    >
      {/*begin::Modal content*/}
      <div className='modal-content'>
        {/*begin::Modal header*/}
        <div className='modal-header'>
          {/*begin::Modal title*/}
          <h2 className='fw-bold'>{isUpdate?'Update':'Add a'} Role</h2>
          {/*end::Modal title*/}
          {/*begin::Close*/}
          <div
            className='btn btn-icon btn-sm btn-active-icon-primary'
            data-kt-roles-modal-action='close'
            onClick={handleClose}
          >
            <i className='ki-outline ki-cross fs-1' />
          </div>
          {/*end::Close*/}
        </div>
        {/*end::Modal header*/}
        {/*begin::Modal body*/}
        <div className='modal-body scroll-y mx-lg-5 my-7'>
          {/*begin::Form*/}
          <form id='kt_modal_add_role_form' className='form' action='#'>
            {/*begin::Scroll*/}
            <div
              className='d-flex flex-column scroll-y me-n7 pe-7'
              id='kt_modal_add_role_scroll'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_modal_add_role_header'
              data-kt-scroll-wrappers='#kt_modal_add_role_scroll'
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
                  value={data.role}
                  onChange={(e) =>
                    updateData({
                      role: e.target.value,
                    })
                  }
                />
                {/*end::Input*/}
              </div>
              {/*end::Input group*/}
              {/*begin::Permissions*/}
              <div className='fv-row'>
                {/*begin::Label*/}
                <label className='fs-5 fw-bold form-label mb-2 required'>Role Permissions</label>
                {/*end::Label*/}
                {/*begin::Description*/}
                <div className='fs-7 fw-semibold text-muted mb-5 '>
                  Select the access operations for user role
                </div>
                {/*end::Description*/}
                {/*begin::Wrapper*/}
                <div className='d-flex'>
                  {/*begin::Checkbox*/}
                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='user_management_read'
                      checked={read}
                      onChange={(e) => {
                        setRead(!read)
                      }}
                    />
                    <span className='form-check-label'>Read</span>
                  </label>
                  {/*end::Checkbox*/}
                  {/*begin::Checkbox*/}
                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='user_management_write'
                      checked={write}
                      onChange={(e) => {
                        setWrite(!write)
                      }}
                    />
                    <span className='form-check-label'>Write</span>
                  </label>
                  {/*end::Checkbox*/}
                  {/*begin::Checkbox*/}
                  <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='user_management_create'
                      checked={create}
                      onChange={(e) => {
                        setCreate(!create)
                      }}
                    />
                    <span className='form-check-label'>Create</span>
                  </label>
                  {/*end::Checkbox*/}
                  {/*begin::Checkbox*/}
                  <label className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='user_management_delete'
                      checked={del}
                      onChange={(e) => {
                        setDel(!del)
                      }}
                    />
                    <span className='form-check-label'>Delete</span>
                  </label>
                  {/*end::Checkbox*/}
                </div>
                {/*end::Wrapper*/}
              </div>
              {/*end::Permissions*/}
            </div>
            {/*end::Scroll*/}
            {/*begin::Actions*/}
            <div className='d-flex flex-sack justify-content-center pt-10'>
              {!isSuccessApplication && (
                <div className='me-2'>
                  <button
                    type='button'
                    className='btn btn-lg btn-primary me-3'
                    onClick={submit}
                    disabled={isSubmitting}
                  >
                    {!isSubmitting && <>{isUpdate ? 'Update Role' : 'Create Role'}</>}

                    {isSubmitting && (
                      <span className='indicatorprogress'>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                      </span>
                    )}
                  </button>
                </div>
              )}
              {isSuccessApplication && (
                <div>
                  <button
                    type='button'
                    className='btn btn-lg btn-primary me-3'
                    onClick={handleClose}
                  >
                    Done <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
                  </button>
                </div>
              )}
            </div>

            {/*end::Actions*/}
          </form>
          {/*end::Form*/}
        </div>
        {/*end::Modal body*/}
      </div>
      {/*end::Modal content*/}
    </Modal>,
    modalsRoot
  )
}

export {CreateUpdateRole}
