import {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {createPortal} from 'react-dom'
import {API, ApplicationModel, Dto} from '../../../../../models/application_model'
import {CreateApiConfig} from './create-update-api-conifguration/create-api-popup'
import ApiTable from './ApiTable'
import {KTIcon} from '../../../../../../_metronic/helpers'
import { useEdges } from 'reactflow'
import CustomApiTable from './CustomApiTable'

type Props = {
  showApiConfig: boolean
  handleCloseModal: () => void
  apis: API[]
  dtos: Dto[]
  application:ApplicationModel
  setDAPI:React.Dispatch<React.SetStateAction<API>>
  setUpAPI:React.Dispatch<React.SetStateAction<API>>
  isCustom:boolean
}

const modalsRoot = document.getElementById('root-modals') || document.body

const ApiConfigurationPopUP = ({showApiConfig,dtos, isCustom, setUpAPI, handleCloseModal, apis, application, setDAPI}: Props) => {
  const [data, setData] = useState<API>({})
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessApi, setIsSuccessApi] = useState(false)
  const [showCreateApiModal, setShowCreateApiModal] = useState<boolean>(false)
  const [showUpdateApiModal, setShowUpdateApiModal] = useState<boolean>(false)
  const [updateField, setUpdateField] = useState<API>({})
  const [Index, setIndex] = useState<number>(-1)
  const [initData, setInitData] = useState<API>({})

  //reset states on close
  const resetStates = () => {
    setData({})
    setIsSubmitting(false)
    setIsSuccessApi(false)
    setHasError(false)
  }

  // Close the popup and reset states
  const handleClose = () => {
    handleCloseModal()
    setTimeout(resetStates, 1000)
  }

  const handleCloseCreateFieldModal = () => {
    setShowCreateApiModal(false)
  }

  return createPortal(
    <Modal
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered '
      backdrop='static'
      show={showApiConfig}
      fullscreen={true}
      onHide={handleClose}
      //onEntered={loadStepper}
    >
      <div className='card mb-5 mb-xl-8 px-15 py-8'>
        {/* <!--begin::Header--> */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>{isCustom?"Custom ":""}API Configurations </span>
            <span className='text-muted mt-1 fw-semibold fs-7'>{apis?.length} API's</span>
          </h3>
          <div className='d-flex align-items-center'>
            <div className='card-toolbar'>
              {/* <!--begin::Menu--> */}
              <CreateApiConfig
                show={showCreateApiModal}
                handleCloseModal={() => {
                  setShowCreateApiModal(false)
                  setInitData({})
                }}
                setUpApi={setUpAPI}
                dtos={dtos}
                application={application}
                initialData={initData}
              />
              {!isCustom && <a
                href='#'
                onClick={() => setShowCreateApiModal(true)}
                className='btn btn-sm btn-flex btn-light-primary'
       
              >
                <i className='ki-duotone ki-plus-square fs-3'>
                  <span className='path1'></span>
                  <span className='path2'></span>
                  <span className='path3'></span>
                </i>
                Add API Configuration
              </a>}
              {/* <!--end::Menu--> */}
            </div>
            <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
              <KTIcon className='fs-1' iconName='cross' />
            </div>
          </div>
        </div>
        {/* <!--end::Header--> */}
        {/* <!--begin::Body--> */}
        <div className='card-body py-3'>
          {/* <!--begin::Table container--> */}
          {!isCustom?<>
            <ApiTable 
          apis={apis}
           dtos={dtos} 
           setUpApi={setUpAPI}
           application={application}
            setDAPI={setDAPI} 
            setInitData={setInitData}
            setShowPanel={setShowCreateApiModal}
             />
          </>
          :<>
          <CustomApiTable 
          apis={apis}
           dtos={dtos} 
           application={application}
            setDAPI={setDAPI} 
            setInitData={setInitData}
            setShowPanel={setShowCreateApiModal}
            setUpApi={setUpAPI}
             />
          </>}
          {/* <!--end::Table container--> */}
        </div>
        {/* <!--begin::Body--> */}
      </div>
    </Modal>,
    modalsRoot
  )
}

export default ApiConfigurationPopUP
