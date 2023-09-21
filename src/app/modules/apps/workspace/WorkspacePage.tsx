import {useEffect, useState} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {getAllWorkspacesByUserId} from '../../../services/workspaceService'
import {setWorkspaceData} from '../../../redux-store/workspaceActions'
import {connect, useDispatch, useSelector} from 'react-redux'
import {WorkspaceList} from './components/workspaceList'
import {RootState} from '../../../redux-store/types'
import WorkspaceConfigurationPage from '../workspace-configurations/WorkspaceConfigurationPage'
import ApplicationConfigurationPage from '../application-configurations/ApplicationConfigurationPage'
import {WorkspaceEmptyModal} from './components/WorkspaceEmptyModal'
import {useAuth0} from '@auth0/auth0-react'
import { useGLoading } from '../../../../_metronic/layout/core/LoadingProvider'
import { ViewRole } from '../workspace-configurations/components/Roles/components/ViewRole'

const workspaceBreadCrumbs: Array<PageLink> = [
  {
    title: 'CGaaS',
    path: '/workspaces',
    isSeparator: false,
    isActive: false,
  },
]

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Workspaces',
    path: 'workspaces',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]
const WorkspacePage = ({setWorkspaceData, workspaceData}) => {
  const {user, isAuthenticated} = useAuth0()
  const { setLoading } = useGLoading();

  useEffect(() => {
    const userId = user?.sub

    // Fetch the workspaces when the component mounts
    async function fetchWorkspaces() {
      try {
        setLoading(true);
        const workspaces = await getAllWorkspacesByUserId(userId || '')
        setWorkspaceData(workspaces)    
        setLoading(false);


      } catch (error) {
        console.error('Error fetching workspaces:', error)
      }
    }

    fetchWorkspaces()
  }, [setWorkspaceData, user])

  const workspaceName = useSelector((state: RootState) => state.workspace.workspaceName)

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path=''
          element={
            <>
              <PageTitle breadcrumbs={workspaceBreadCrumbs}>Workspaces</PageTitle>
              {workspaceData ? <WorkspaceList /> : <WorkspaceEmptyModal />}
            </>
          }
        />
        <Route
          path='configure/:workspaceId/manage/*'
          element={
            <>
              <PageTitle breadcrumbs={workspaceBreadCrumbs}>{workspaceName}</PageTitle>
              <WorkspaceConfigurationPage />
            </>
          }
        />
        <Route
          path='configure/:workspaceId/view/:applicationId/*'
          element={
            <>
              <PageTitle breadcrumbs={workspaceBreadCrumbs}>AppConfig</PageTitle>
              <ApplicationConfigurationPage />
            </>
          }
        />
        <Route
          path='configure/:workspaceId/view/:applicationId/*'
          element={
            <>
              <PageTitle breadcrumbs={workspaceBreadCrumbs}>AppConfig</PageTitle>
              <ApplicationConfigurationPage />
            </>
          }
        />
         <Route
          path='configure/:workspaceId/manage/roles/:roleId'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>DtoRoles</PageTitle>
              <ViewRole workspaceData={workspaceData} />
            </>
          }
        />
       
      </Route>
    </Routes>
  )
}

const mapStateToProps = (state) => {
  return {
    workspaceData: state.workspace.workspaceData, // Access workspaceData from the Redux store
  }
}

export default connect(mapStateToProps, {setWorkspaceData})(WorkspacePage)
