/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useAuth0} from '@auth0/auth0-react'

import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, useAuth} from '../modules/auth'
import {App} from '../App'
import {AuthPage} from '../modules/auth/AuthPage'
import SplashScreenComponent from '../../_metronic/assets/ts/components/_SplashScreenComponent'
import {RootState} from '../redux-store/types'

const {PUBLIC_URL} = process.env

const AppRoutes = () => {
  const {isAuthenticated, isLoading} = useAuth0()

  if (isLoading) {
    return (
      <div>
        <SplashScreenComponent />
      </div>
    )
  }

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      {/*the global loading screen component*/}
      <SplashScreenComponent />

      {/*page routes */}
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          {isAuthenticated ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/workspaces' />} />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}