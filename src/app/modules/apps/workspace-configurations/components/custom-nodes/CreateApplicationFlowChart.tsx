import {Handle, Position} from 'reactflow'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import React, {FC, useState} from 'react'
import {updateApplication} from '../../../../../services/applicationService'
import {ApplicationModel} from '../../../../../models/application_model'
import {CreateApplicationModal} from '../Application/Create-application/CreateApplicationPopup'

const handleStyle = {left: 0}
type Props = {
  workspaceId: string
  setnewApplication: React.Dispatch<React.SetStateAction<ApplicationModel>>
}

export function CreateApplicationFlowChart({setnewApplication, workspaceId}: Props) {
  const [showCreateApplicationModal, setshowCreateApplicationModal] = useState<boolean>(false)
  const [showUpdateApplicationModal, setshowUpdateApplicationModal] = useState<boolean>(false)
  const [updateApplication, setUpdateApplication] = useState<ApplicationModel>({})
  return (
    <>
      <Handle type='target' position={Position.Left} style={handleStyle} />

      <div
        className='card h-md-100 w-350px'
        dir='ltr'
        style={{backgroundColor: '#9167FC', transform: 'scale(0.68)'}}
      >
        <CreateApplicationModal
          workspaceId={workspaceId}
          show={showCreateApplicationModal || showUpdateApplicationModal}
          handleCloseModal={() => (
            setshowCreateApplicationModal(false), setshowUpdateApplicationModal(false)
          )}
          isUpdate={showUpdateApplicationModal}
          application={updateApplication}
          setNewApplicationFlowChart={setnewApplication}
        />

        <a
          href='#'
          onClick={() => setshowCreateApplicationModal(true)}
          className='btn btn-light-primary'
        >
          Create New Application
        </a>
      </div>
    </>
  )
}
