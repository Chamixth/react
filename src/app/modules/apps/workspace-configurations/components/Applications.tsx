import {FC, useEffect, useState} from 'react'
import {API, ApplicationModel, CustomFunction, Dao, Dto} from '../../../../models/application_model'
import {Application} from './Application/ApplicationModel'
import {CreateApplicationModal} from './Application/Create-application/CreateApplicationPopup'
import {
  deleteApplication,
  getAllApplicationsByWorkspaceId,
} from '../../../../services/applicationService'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Link} from 'react-router-dom'
import {ApplicationCard} from '../../../../../_metronic/partials/content/cards/ApplicationCard'
import {ApplicationEmptyModal} from './workspace-config-modals/applicationEmptyModal'
import ReactPaginate from 'react-paginate'
import { useAuth0 } from '@auth0/auth0-react'

type Props = {
  workspaceId: string
}

const MySwal = withReactContent(Swal)

const Applications: FC<Props> = ({workspaceId}) => {
  const [showCreateApplicationModal, setshowCreateApplicationModal] = useState<boolean>(false)
  const [showUpdateApplicationModal, setshowUpdateApplicationModal] = useState<boolean>(false)
  const [showDeleteApplicationModal, setshowDeletepplicationModal] = useState<boolean>(false)
  const [updateApplication, setUpdateApplication] = useState<ApplicationModel>({})
  const [value, setValue] = useState('');

  const [applications, setApplications] = useState<Array<ApplicationModel>>([])
  const [allApplications, setAllApplications] = useState<Array<ApplicationModel>>([])
  const [loading, setLoading] = useState(true)

  const [dApplication, setDApplication] = useState<ApplicationModel>({})

  const itemsPerPage = 6
  const [currentPage, setCurrentPage] = useState(0)
  const pageCount = Math.ceil((applications?.length || 0) / itemsPerPage)

  const handlePageChange = ({selected}: {selected: number}) => {
    setCurrentPage(selected)
  }
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    // Fetch the workspaces when the component mounts
    const userId = user?.sub;
    getAllApplicationsByWorkspaceId(workspaceId, userId||'')
      .then((data) => {
        // Dispatch the action to set the data in Redux
        setApplications(data)
        setAllApplications(data)

        setLoading(false) // Set loading to false after data is received
      })
      .catch((error) => {
        // Handle errors if needed
        console.error('Error fetching applications:', error)
        setLoading(false) // Set loading to false on error
      })
  }, [workspaceId])

  useEffect(() => { 
    
  }, [applications])

  useEffect(() => {
    //--delete application from local
    setApplications((prevApplications) =>
      prevApplications.filter((item) => item.appId !== dApplication.appId)
    )
  }, [dApplication])

  // if (!applications) {
  //   return <p>Loading appl...</p>
  // }

  const updateTemporaryOnChangesApplications = (tempApplication: ApplicationModel) => {
    // Update the applications array with the new application
    setApplications((prevApplications) => {
      if (!prevApplications || prevApplications.length === 0) {
        // If there are no applications, update the updateApplication state
        setUpdateApplication(tempApplication)
        return [tempApplication] // Create a new array with the tempApplication
      }

      // Find the index of the application to update, if it exists
      const index = prevApplications.findIndex((app) => app.appId === tempApplication.appId)

      if (index !== -1) {
        // If the application already exists in the array, update it
        const updatedApplications = [...prevApplications]
        updatedApplications[index] = tempApplication
        return updatedApplications
      } else {
        // If the application doesn't exist, add it as a new application
        return [...prevApplications, tempApplication]
      }
    })
    setUpdateApplication(tempApplication)
  }

  const searchValue = (value: string) => {
    setValue(value)
    if (value) {
      const filteredApplications = applications.filter((application) =>
        application?.appName?.toLowerCase().includes(value.toLowerCase())
      )
      setApplications(filteredApplications)
    }
    else{
      setApplications(allApplications);
    }
  }

  const handleDelete = (application: ApplicationModel) => {
    Swal.fire({
      text: 'Are you sure you want to delete ' + application.appName + ' ?',
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
        const deletedApplication = await deleteApplication(application)
        if (deletedApplication['operation'] == 'Success') {
          Swal.fire({
            icon: 'success',
            text: 'You have deleted ' + application.appName + '!.',
            buttonsStyling: !1,
            confirmButtonText: 'Ok, got it!',
            customClass: {confirmButton: 'btn fw-bold btn-primary'},
          }).then(() => {
            setDApplication(application)
          })
        } else {
          Swal.fire('Error!', 'There was an error while deleting the application.', 'error')
        }
      }
    })
  }

  const sampleDto: Array<Dto> = []
  const sampleDao: Array<Dao> = []
  const sampleApi: Array<API> = []
  const sampleCustomFunctions: Array<CustomFunction> = []

  // Render loading indicator or the data
  if (loading) {
    return <div>Loading...</div> // You can use any loading indicator or UI here
  }

  // Render the data once it's received
  return (
    <>
      {applications && (
        <>
          <div className='d-flex flex-wrap flex-stack mb-6'>
            <span>
              <h3 className='fw-bolder my-2'>
                My Applications
                <span className='fs-6 text-gray-400 fw-bold ms-1'>
                  ({applications ? applications.length : '0'})
                </span>
              </h3>
              <ul className='breadcrumb fw-semibold fs-8 my-1'>
                <li className='breadcrumb-item text-muted'>
                  <Link to={`/workspaces`}>
                    <a href='#' className='text-muted text-hover-primary'>
                      Workspaces
                    </a>
                  </Link>
                </li>
                <li className='breadcrumb-item text-muted'>Applications</li>
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
                    placeholder='Search Application'
                    value={value}
                    onChange={(e) => {
                      searchValue(e.target.value)}}
                  />
                </div>
              </div>
              <CreateApplicationModal
                workspaceId={workspaceId}
                show={showCreateApplicationModal || showUpdateApplicationModal}
                handleCloseModal={() => (
                  setshowCreateApplicationModal(false), setshowUpdateApplicationModal(false)
                )}
                isUpdate={showUpdateApplicationModal}
                application={updateApplication}
                updateTemporaryOnChangesApplications={updateTemporaryOnChangesApplications}
              />

              <a
                href='#'
                onClick={() => setshowCreateApplicationModal(true)}
                className='btn btn-primary btn-sm'
              >
                New Application
              </a>
            </div>
          </div>
  
          <div className='row g-6 g-xl-9 mb-5'>
            {applications.slice(startIndex, endIndex).map((app) => (
              <div className='col-md-6 col-xl-4'>
                {/*<ApplicationCard 
          className='card-xl-stretch mb-xl-8' color='danger'
          />*/}
                <Application
                  button={
                    <a
                      href='#'
                      onClick={() => (
                        setUpdateApplication(app), setshowUpdateApplicationModal(true)
                      )}
                      className='dropdown-item pb-0'
                    >
                     Edit Application
                    </a>
                  }
                  deleteButton={
                    <a
                      href='#'
                      onClick={() => handleDelete(app)}
                      className='dropdown-item pt-0'
                    >
                      Delete Application
                    </a>
                  }
                  application={app}
                  dto={sampleDto}
                  dao={sampleDao}
                  customFunctions={sampleCustomFunctions}
                  api={sampleApi}
                />
              </div>
            ))}
          </div>
          <ReactPaginate
            previousLabel={'<< Previous'}
            nextLabel={'Next >>'}
            breakLabel={'...'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            pageCount={pageCount}
            marginPagesDisplayed={5}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </>
      )}
      {!applications && (
        <ApplicationEmptyModal
          workspaceId={workspaceId}
          show={showCreateApplicationModal}
          handleCloseModal={() => (
            setshowCreateApplicationModal(false)
          )}
          isUpdate={showUpdateApplicationModal}
          application={updateApplication}
          updateTemporaryOnChangesApplications={updateTemporaryOnChangesApplications}
        />
      )}
    </>
  )
}

export {Applications}
