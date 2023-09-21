import {Navigate, Outlet, Route, Routes, useParams} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Overview} from './components/Overview'
import {Projects} from './components/Projects'
import {Campaigns} from './components/Campaigns'
import {Documents} from './components/Documents'
import {Connections} from './components/Connections'
import {ProfileHeader} from './ProfileHeader'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setWorkspaceId } from '../../redux-store/workspaceActions'

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


const ProfilePage = () => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  useEffect(() => {
    dispatch(setWorkspaceId(workspaceId));
  }, [dispatch, workspaceId]);
  
  return (<Routes>
    <Route
      element={
        <>
          <ProfileHeader />
          <Outlet />
        </>
      }
    >
       <Route
        path=''
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>{workspaceId ? `Workspace ${workspaceId}` : 'Overview'}</PageTitle>
            <Overview />
          </>
        }
      />
      <Route
        path='overview'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Overview</PageTitle>
            <Overview />
          </>
        }
      />
      <Route
        path='projects'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Projects</PageTitle>
            <Projects />
          </>
        }
      />
      <Route
        path='campaigns'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Campaigns</PageTitle>
            <Campaigns />
          </>
        }
      />
      <Route
        path='documents'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Documents</PageTitle>
            <Documents />
          </>
        }
      />
      <Route
        path='connections'
        element={
          <>
            <PageTitle breadcrumbs={profileBreadCrumbs}>Connections</PageTitle>
            <Connections />
          </>
        }
      />
      {/*<Route index element={<Navigate to='/workspaces/configure/WS740491/overview' />} />*/}
    </Route>
  </Routes>
)}

export default ProfilePage
