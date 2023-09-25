import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {WorkspaceOverview} from './components/Overview'
import {Projects} from './components/Projects'
import {Documents} from './components/Documents'
import {Connections} from './components/Connections'
import {WorkspaceConfigHeader} from './WorkspaceConfigHeader'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {getWorkspaceById, setWorkspaceId} from '../../../redux-store/workspaceActions'
import {RootState} from '../../../redux-store/types'
import {Applications} from './components/Applications'
import Relationships from './components/Relationships'
import Dtos from '../application-configurations/components/model-configurations/Dtos'
import {Gateway} from './components/Gateway'
import {FrontendDetails} from './components/Front-End/Frontend-Details'
import Authentication from './components/authentication_configuration/Authentication'

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

const WorkspaceConfigurationPage = () => {
  const dispatch = useDispatch()
  const {workspaceId} = useParams()
  useEffect(() => {
    dispatch(setWorkspaceId(workspaceId))
  }, [dispatch, workspaceId])
  // Access the workspace data and workspace ID from the Redux store

  const workspaceData = useSelector((state: RootState) => state.workspace.workspaceData)
  const Workspace = getWorkspaceById({workspace: {workspaceData, workspaceId}})
  console.log(Workspace)

  if (!Workspace) {
    return <div>Loading...</div> // Or display a loading state here
  }

  return (
    <Routes>
      <Route
        element={
          <>
            <WorkspaceConfigHeader workspaceData={Workspace} />
            <Outlet />
          </>
        }
      >
        <Route
          path=''
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>{Workspace.workspaceName}</PageTitle>
              <WorkspaceOverview workspaceId={Workspace.workspaceId} />
            </>
          }
        />
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>{Workspace.workspaceName}</PageTitle>
              <WorkspaceOverview workspaceId={Workspace.workspaceId} />
            </>
          }
        />
        <Route
          path='applications'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Applications</PageTitle>
              <Applications workspaceId={Workspace.workspaceId} />
            </>
          }
        />
        <Route
          path='relationships'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Relationships</PageTitle>
              {/* <Relationships workspaceId={Workspace.workspaceId} /> */}
              {/* <CreateRelationshipD workspaceId={Workspace.workspaceId} /> */}
            </>
          }
        />
        <Route
          path='auth'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Authentication</PageTitle>
              <Authentication workspaceId={Workspace.workspaceId} />
            </>
          }
        />
        <Route
          path='gateway'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Gateway</PageTitle>
              <Gateway workspaceData={Workspace} />
            </>
          }
        />
        <Route
          path='frontend'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Frontend</PageTitle>
              <FrontendDetails workspaceData={Workspace} />
            </>
          }
        />
        <Route
          path='logger'
          element={
            <>
              <PageTitle breadcrumbs={profileBreadCrumbs}>Frontend</PageTitle>
              {/* <FrontendDetails workspaceData={Workspace} /> */}
            </>
          }
        />
        {/*<Route index element={<Navigate to={'/workspaces/configure/'+workspaceId+'/overview'} />} />*/}
      </Route>
    </Routes>
  )
}

export default WorkspaceConfigurationPage
