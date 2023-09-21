import React, {useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {WorkspacePopup} from './configs/WorkspacePopup'
import {SuccessPopup} from './configs/SuccessPopup'
import {StepperComponent} from '../../../../../../_metronic/assets/ts/components'
import {KTIcon} from '../../../../../../_metronic/helpers'
import {WorkspaceModel} from '../../../../../models/workspace_model'
import {createWorkspace, updateWorkspace} from '../../../../../services/workspaceService'
import {getPhotoByTag} from '../../../../../services/utilService'
import {Link} from 'react-router-dom'
import {setWorkspaceData} from '../../../../../redux-store/workspaceActions'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../../../../redux-store/types'
import {createGateway} from '../../../../../services/gatewayService'
import {useAuth0} from '@auth0/auth0-react'

type Props = {
  show: boolean
  handleCloseModal: () => void
  initialData?: WorkspaceModel
  workspacesData?: WorkspaceModel[]
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateUpdateWorkspaceModal = ({
  show,
  handleCloseModal,
  initialData,
  workspacesData,
}: Props) => {
  const [data, setData] = useState<WorkspaceModel>({})
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessWorkspace, setIsSuccessWorkspace] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [workspaceId, setworkspaceId] = useState<string>('')
  const dispatch = useDispatch()
  const {user} = useAuth0()

  // Function to update workspace data
  const updateData = (fieldsToUpdate: Partial<WorkspaceModel>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  // Determine if it's an edit or create mode
  useEffect(() => {
    if (initialData) {
      // If initialData exists, it's an edit mode
      setIsEditMode(true)
      setData(initialData)
    } else {
      // If initialData is not provided, it's a create mode
      setIsEditMode(false)
      setData({})
    }
  }, [initialData])

  // Validate workspace data
  const checkWorkspaceValidation = (): boolean => {
    if (!data.workspaceName) {
      return false
    }
    return true
  }

  // Reset states on modal close
  const resetStates = () => {
    setData({})
    setIsSubmitting(false)
    setIsSuccessWorkspace(false)
    setHasError(false)
  }

  // Close the modal and reset states
  const handleClose = () => {
    handleCloseModal()
    setTimeout(resetStates, 1000)
  }

  // Submit workspace data
  const submit = async () => {
    if (!checkWorkspaceValidation()) {
      setHasError(true)
      return
    } else {
      setIsSubmitting(true)
      try {
        if (isEditMode) {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          const updatedWorkspace = await updateWorkspace(data)

          if (updatedWorkspace.workspaceId !== '') {
            // Find the index of the edited workspace in the array
            const editedWorkspaceIndex = (workspacesData || []).findIndex(
              (workspace) => workspace.workspaceId === updatedWorkspace.workspaceId
            )

            if (editedWorkspaceIndex !== -1) {
              // Create a new array with the updated workspace
              const updatedWorkspaceData = [...(workspacesData || [])]
              updatedWorkspaceData[editedWorkspaceIndex] = updatedWorkspace

              // Dispatch the updated workspace data to Redux
              dispatch(setWorkspaceData(updatedWorkspaceData))
              setIsSuccessWorkspace(true)
            }
          }
        } else {
          data.thumbImg = await getPhotoByTag(data.workspaceName || 'workspace').then((photo) => {
            return photo.urls.thumb
          })

          data.status = '0'
          const userId = user?.sub
          data.userId = userId

          await new Promise((resolve) => setTimeout(resolve, 2000))
          const createdWorkspace = await createWorkspace(data)

          if (createdWorkspace.workspaceId !== '') {
            setworkspaceId(createdWorkspace.workspaceId || '')

            // Dispatch the new workspace data to Redux
            dispatch(setWorkspaceData([...(workspacesData || []), createdWorkspace]))

            // Create a gateway for the workspace
            createGateway(createdWorkspace)
            setIsSuccessWorkspace(true)
          }
        }

        setData({})
      } catch (error) {
        console.error('Error creating workspace:', error)
        setIsSuccessWorkspace(false)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px '
      backdrop='static'
      show={show}
      onHide={handleClose}
    >
      <div className='modal-header'>
        <h2>{isEditMode ? 'Edit Workspace' : 'Create Workspace'}</h2>
        {/* Close button */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        <div className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'>
          {/* Content */}
          <div className='flex-row-fluid py-lg-5 px-lg-15'>
            <form className='mx-auto mw-600px w-100' noValidate>
              {/* WorkspacePopup */}
              {!isSuccessWorkspace && (
                <WorkspacePopup data={data} updateData={updateData} hasError={hasError} />
              )}
              {/* SuccessPopup */}
              {isSuccessWorkspace && <SuccessPopup isEdit={isEditMode} />}

              <div className='d-flex flex-sack justify-content-center pt-10'>
                {!isSuccessWorkspace && (
                  <div className='me-2'>
                    <button
                      type='button'
                      className='btn btn-lg btn-light-primary me-3'
                      onClick={submit}
                      disabled={isSubmitting}
                    >
                      {!isSubmitting && <>{isEditMode ? 'Update Workspace' : 'Create Workspace'}</>}

                      {isSubmitting && (
                        <span className='indicatorprogress'>
                          Please wait...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2' />
                        </span>
                      )}
                    </button>
                  </div>
                )}
                {isSuccessWorkspace && (
                  <div>
                    <Link
                      to={`/workspaces/configure/${
                        isEditMode ? initialData?.workspaceId : workspaceId
                      }/manage/overview`}
                    >
                      <button type='button' className='btn btn-lg btn-primary me-3'>
                        Go to Workspace <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>,
    modalsRoot
  )
}

export {CreateUpdateWorkspaceModal}
