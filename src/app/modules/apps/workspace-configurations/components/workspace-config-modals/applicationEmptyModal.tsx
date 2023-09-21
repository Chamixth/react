import React, { useState } from 'react'
import { CreateApplicationModal } from '../Application/Create-application/CreateApplicationPopup'
import { useIllustrationsPath } from '../../../../../../_metronic/helpers'
import { ApplicationModel } from '../../../../../models/application_model'

type Props = {
  workspaceId: string
  show: boolean
  handleCloseModal: () => void
  isUpdate:boolean
  application:ApplicationModel
  setNewApplicationFlowChart?: React.Dispatch<React.SetStateAction<ApplicationModel>>
  updateTemporaryOnChangesApplications?:any
}
 const ApplicationEmptyModal = ({workspaceId, show, handleCloseModal, isUpdate, application, setNewApplicationFlowChart,updateTemporaryOnChangesApplications}: Props) => {
  const [showCreateApplicationModal, setshowCreateApplicationModal] = useState<boolean>(false)

  return (
    <div className='card mb-10 '>
    <div className='card-body d-flex align-items-center py-8 content d-flex flex-column flex-column-fluid'>


    <div className="card-px text-center pt-20 pb-15 ">

      <h2 className="fs-2 fw-bold mb-0">Create a New Application</h2>

      <p className="text-gray-400 fs-4 fw-semibold py-4">Click on the below button to
        create an Application.</p>

      <a href="#"   onClick={() => setshowCreateApplicationModal(true)} className="btn btn-primary er fs-6 px-8 py-4" >Create Application</a>
    
      <CreateApplicationModal
            workspaceId={workspaceId}
            show={showCreateApplicationModal}
            handleCloseModal={()=>{setshowCreateApplicationModal(false)}}
            isUpdate={isUpdate}
            application={application}
            updateTemporaryOnChangesApplications={updateTemporaryOnChangesApplications}
          />
    </div>

    <div className="text-center pb-10 px-5">
    <img src={useIllustrationsPath("12.png")} alt='' style={{marginTop:"-60px"}} className='mw-150 mh-350px' />
    </div>

  </div>

</div>

  )
}
export {ApplicationEmptyModal}