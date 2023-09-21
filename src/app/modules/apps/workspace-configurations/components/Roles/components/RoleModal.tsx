import {useState} from 'react'
import {RBAC} from '../../../../../../models/role_base_access_model'
import {CreateUpdateRole} from './CreateUpdateRole'
import {ViewRole} from './ViewRole'
import {Link, useLocation} from 'react-router-dom'

type Props = {
  roleModal: RBAC
  updateTemporaryOnChangesRoles?: any
  deleteModal: () => void
  setUpRole: React.Dispatch<React.SetStateAction<RBAC>>
}

const RoleModal = ({roleModal, updateTemporaryOnChangesRoles, deleteModal, setUpRole}: Props) => {
  const [showCreateUpdateRoleModal, setShowCreateUpdateRoleModal] = useState(false)
  const location = useLocation();

  return (
    <div>
      {/*begin::Card*/}
      <div className='card card-flush h-md-100'>
        {/*begin::Card header*/}
        <div className='card-header'>
          {/*begin::Card title*/}
          <div className='card-title'>
            <h2>{roleModal.role}</h2>
          </div>
          {/*end::Card title*/}
        </div>
        {/*end::Card header*/}
        {/*begin::Card body*/}

        <CreateUpdateRole
          workspaceId={roleModal.workspaceId || ''}
          show={showCreateUpdateRoleModal}
          handleCloseModal={() => setShowCreateUpdateRoleModal(false)}
          updateTemporaryOnChangesRoles={updateTemporaryOnChangesRoles}
          roleModal={roleModal}
          setUpRole={setUpRole}
        />
        <div className='card-body pt-1'>
          {/*begin::Users*/}
          <div className='fw-bold text-gray-600 mb-5'>
            Total access options with this role: {roleModal.access?.length}
          </div>
          {/*end::Users*/}
          {/*begin::Permissions*/}
          <div className='d-flex flex-column text-gray-600'>
            {roleModal.access?.map((accessItem, index) => (
              <div className='d-flex align-items-center py-2' key={index}>
                <span className='bullet bg-primary me-3' />
                {accessItem || 'error'}
              </div>
            ))}

            {/* <div className="d-flex align-items-center py-2">
                      <span className="bullet bg-primary me-3" />
                      <em>and 7 more...</em>
                    </div> */}
          </div>
          {/*end::Permissions*/}
        </div>
        {/*end::Card body*/}
        {/*begin::Card footer*/}
        <div className='card-footer flex-wrap pt-0'>
          <Link
            className={
              ` ` +
              (location.pathname ===`/workspaces/configure/${roleModal.workspaceId}/manage/roles/${roleModal.roleId}` && 'active')
            }
            to={`/workspaces/configure/${roleModal.workspaceId}/manage/roles/${roleModal.roleId}`}
          >
            <button type='button' className='btn btn-light btn-active-light-primary my-1'>
              View Role
            </button>
          </Link>

          <button
            type='button'
            className='btn btn-light btn-active-light-primary my-1 me-2'
            onClick={() => {
              setShowCreateUpdateRoleModal(true)
            }}
          >
            Edit Role
          </button>
          <button
            type='button'
            className='btn btn-light btn-active-danger my-1'
            onClick={deleteModal}
          >
            Delete Role
          </button>
        </div>
        {/*end::Card footer*/}
      </div>
      {/*end::Card*/}
    </div>
  )
}

export {RoleModal}
