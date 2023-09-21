/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAuth0 } from '@auth0/auth0-react';
import {FC} from 'react'
import { NavLink } from 'react-router-dom';

const Dropdown3: FC = () => {

const {
  user,
  isAuthenticated,
  loginWithRedirect,
  logout,
} = useAuth0();

const logoutWithRedirect = () =>
logout({
    logoutParams: {
      returnTo: window.location.origin,
    }
});

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px py-3'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content text-muted pb-2 px-3 fs-7 text-uppercase'>Actions</div>
      </div>

      <div className='menu-item px-3'>
     {isAuthenticated&&<NavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </NavLink>}

      </div>

      {/*<div className='menu-item px-3'>
        <a href='#' className='menu-link flex-stack px-3'>
          Create Payment
          <i
            className='fas fa-exclamation-circle ms-2 fs-7'
            data-bs-toggle='tooltip'
            title='Specify a target name for future usage and reference'
          ></i>
        </a>
      </div>

      <div className='menu-item px-3'>
        <a href='#' className='menu-link px-3'>
          Generate Bill
        </a>
      </div>

      <div
        className='menu-item px-3'
        data-kt-menu-trigger='hover'
        data-kt-menu-placement='left-start'
        data-kt-menu-flip='center, top'
      >
        <a href='#' className='menu-link px-3'>
          <span className='menu-title'>Subscription</span>
          <span className='menu-arrow'></span>
        </a>

        <div className='menu-sub menu-sub-dropdown w-175px py-4'>
          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-3'>
              Plans
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-3'>
              Billing
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-3'>
              Statements
            </a>
          </div>

          <div className='separator my-2'></div>

          <div className='menu-item px-3'>
            <div className='menu-content px-3'>
              <label className='form-check form-switch form-check-custom form-check-solid'>
                <input
                  className='form-check-input w-30px h-20px'
                  type='checkbox'
                  value='1'
                  checked
                  name='notifications'
                />

                <span className='form-check-label text-muted fs-6'>Recuring</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className='menu-item px-3 my-1'>
        <a href='#' className='menu-link px-3'>
          Settings
        </a>
      </div>*/}
    </div>
  )
}

export {Dropdown3}
