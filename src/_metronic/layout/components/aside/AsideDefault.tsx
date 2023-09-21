/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {AsideMenu} from './AsideMenu'
import {Dropdown3} from '../../../partials/content/dropdown/Dropdown3'
import {useAuth0} from '@auth0/auth0-react'

const AsideDefault: FC = () => {
  const {classes} = useLayout()
  const {logout} = useAuth0()

  return (
    <div
      id='kt_aside'
      className={clsx('aside overflow-visible bg-primary', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width='auto'
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_toggle'
    >
      {/* begin::Logo */}
      <div
        className='aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-8'
        id='kt_aside_logo'
      >
        <Link to='/workspaces'>
          <img src={toAbsoluteUrl('/media/logos/CGaaS-Logo.png')} alt='logo' className='h-45px' />
        </Link>
      </div>
      {/* end::Logo */}

      {/* begin::Nav */}
      <div
        className='asaside-nav d-flex flex-column align-lg-center flex-column-fluid w-100 pt-5 pt-lg-0'
        id='kt_aside_nav'
      >
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Nav */}

      {/* begin::Footer */}
      <div
        className='aside-footer d-flex flex-column align-items-center flex-column-auto'
        id='kt_aside_footer'
      >
        {/* begin::Menu */}
        <div className='mb-7'>
          <button
            type='button'
            className='btn btm-sm btn-icon btn-color-white btn-active-color-primary btn-active-light'
            title='Logout'
            onClick={() => {
              logout({
                logoutParams: {
                  returnTo: window.location.origin + '/cgaas',
                },
              })
            }}
          >
            {/* <KTIcon iconName='element-11' className='fs-2 text-lg-1' /> */}
            <i
              className='ki-duotone ki-exit-left fs-2x'
            >
              <i className='path1'></i>
              <i className='path2'></i>
            </i>
          </button>
          {/* <Dropdown3 /> */}
        </div>
        {/* end::Menu */}
      </div>
      {/* end::Footer */}
    </div>
  )
}

export {AsideDefault}
