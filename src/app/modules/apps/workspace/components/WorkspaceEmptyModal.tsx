import React, {useState} from 'react'
import {CreateUpdateWorkspaceModal} from './modals/CreateUpdateWorkspace'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'

export const WorkspaceEmptyModal = () => {
  // State to control the visibility of the Create Workspace modal
  const [showCreateWorkspaceModal, setshowCreateWorkspaceModal] = useState<boolean>(false)

  return (
    <div className='card mb-10'>
      <div className='card-body d-flex align-items-center py-8 content d-flex flex-column flex-column-fluid'>
        <div className='card-px text-center pt-15 pb-15'>
          <h2 className='fs-2x fw-bold mb-0'>Create a New Workspace</h2>
          <p className='text-gray-400 fs-4 fw-semibold py-7'>
            Click on the below button to
            <br />
            create a workspace.
          </p>

          <a
            href='#'
            onClick={() => setshowCreateWorkspaceModal(true)}
            className='btn btn-primary er fs-6 px-8 py-4'
            data-bs-target='#kt_modal_create_app'
          >
            Create Workspace
          </a>

          {/* CreateUpdateWorkspaceModal */}
          <CreateUpdateWorkspaceModal
            show={showCreateWorkspaceModal}
            handleCloseModal={() => setshowCreateWorkspaceModal(false)}
          />
        </div>

        <div className='text-center pb-15 px-5'>
          <img
          src={toAbsoluteUrl("/media/illustrations/dozzy-1/15.png")}
            alt=''
            className='mw-100 h-200px h-sm-325px'
          />
        </div>
      </div>
    </div>
  )
}
