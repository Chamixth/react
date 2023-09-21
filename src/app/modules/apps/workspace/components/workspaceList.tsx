import {useState} from 'react'
import {useSelector} from 'react-redux'
import {WorkspaceModel} from '../../../../models/workspace_model'
import {RootState} from '../../../../redux-store/types'
import {CreateUpdateWorkspaceModal} from './modals/CreateUpdateWorkspace'
import {WorkspaceCard} from '../../../../../_metronic/partials/content/cards/WorkspaceCard'
import ReactPaginate from 'react-paginate'
import {getGatewayBgColor, getImageUrl, techstackIconList} from '../core/IWorkspaceModels'

export function WorkspaceList() {
  // State for showing the create workspace modal
  const [showCreateWorkspaceModal, setshowCreateWorkspaceModal] = useState<boolean>(false)

  // Get workspace data from Redux store
  const workspaceData = useSelector((state: RootState) => state.workspace.workspaceData)

  // State to store filtered workspace data
  const [WorkspaceData, setWorkspaceData] = useState<Array<WorkspaceModel>>([])

  // State for search input value
  const [value, setValue] = useState('')

  // Number of items to display per page
  const itemsPerPage = 6

  // Current page number
  const [currentPage, setCurrentPage] = useState(0)

  // Calculate the total number of pages based on workspace data
  const pageCount = Math.ceil((workspaceData?.length || 0) / itemsPerPage)

  // Function to handle page change in pagination
  const handlePageChange = ({selected}: {selected: number}) => {
    setCurrentPage(selected)
  }

  // Calculate the start and end index for pagination
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Function to filter workspace data based on search input
  const searchValue = (value: string) => {
    setValue(value)

    if (workspaceData) {
      if (value) {
        // Filter workspace data by workspaceName
        const filteredData = workspaceData?.filter((workspace: WorkspaceModel) => {
          return workspace.workspaceName?.toLowerCase().includes(value.toLowerCase())
        })
        setWorkspaceData(filteredData)
      } else {
        // If no search value, set workspace data to the original data
        setWorkspaceData(workspaceData)
      }
    }
  }
  return (
    <>
      {/* Header */}
      <div className='d-flex flex-wrap flex-stack mb-10'>
        <h3 className='fw-bolder my-2'>
          My Workspaces
          <span className='fs-6 text-gray-400 fw-bold ms-2'>Active</span>
        </h3>
        <div className='d-flex flex-wrap my-2'>
          {/* Dropdown for filtering workspace status */}
          <div className='me-4'>
            <select
              name='status'
              data-control='select2'
              data-hide-search='true'
              className='form-select form-select-sm form-select-white w-125px'
              defaultValue='Active'
            >
              <option value='Active'>Active</option>
              <option value='Approved'>In Progress</option>
              <option value='Declined'>To Do</option>
              <option value='In Progress'>Completed</option>
            </select>
          </div>

          {/* Search input */}
          <div className='me-4'>
            <div className='d-flex align-items-center position-relative'>
              <i className='ki-outline ki-magnifier fs-3 position-absolute ms-3'></i>
              <input
                type='text'
                id='kt_filter_search'
                className='form-control form-control-sm border-body bg-body w-170px ps-10'
                placeholder='Search Workspace'
                value={value}
                onChange={(e) => {
                  searchValue(e.target.value)
                }}
              />
            </div>
          </div>

          {/* Create Workspace Button */}
          <CreateUpdateWorkspaceModal
            show={showCreateWorkspaceModal}
            handleCloseModal={() => setshowCreateWorkspaceModal(false)}
            workspacesData={workspaceData || []}
          />
          <a
            href='#'
            onClick={() => setshowCreateWorkspaceModal(true)}
            className='btn btn-primary btn-sm'
            data-bs-target='#kt_modal_create_workspace'
          >
            New Workspace
          </a>
        </div>
      </div>

      {/* Workspace Cards */}
      <div className='row g-6 g-xl-9 mb-13 '>
        {workspaceData?.slice(startIndex, endIndex).map((workspace: WorkspaceModel) => (
          <div className='col-md-6 col-xl-4 ' key={workspace.workspaceId}>
            <WorkspaceCard
              workspace={workspace}
              workspacesData={workspaceData || []}
              icon={workspace.thumbImg || ''}
              badgeColor='info'
              status={workspace.status || 'null'}
              statusColor='primary'
              title={workspace.workspaceName || ''}
              description={`${workspace.workspaceName} workspace to create apps`}
              gatewayType={
                <span className='symbol symbol-80px me-2'>
                  <span className={`symbol-label ${getGatewayBgColor(workspace.gateway || '')}`}>
                    <img
                      src={getImageUrl(workspace.gateway || '')}
                      alt='Gateway Icon'
                      className='mw-100 p-3'
                    />
                  </span>
                </span>
              }
              gatewayTypeName={workspace.gateway || ''}
              budget='10'
              progress={50}
              techstackIcon={techstackIconList}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {
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
      }
    </>
  )
}
