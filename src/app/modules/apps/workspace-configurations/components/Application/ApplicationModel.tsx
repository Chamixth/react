import {FC, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {
  API,
  ApplicationModel,
  Dto,
  Dao,
  CustomFunction,
} from '../../../../../models/application_model'
import {Link} from 'react-router-dom'

type Props = {
  application?: ApplicationModel
  dto?: Array<Dto>
  dao?: Array<Dao>
  api?: Array<API>
  customFunctions?: Array<CustomFunction>
  button?: any
  deleteButton?: any
}

const Application: FC<Props> = ({
  application = undefined,
  api = undefined,
  dto = undefined,
  dao = undefined,
  customFunctions = undefined,
  button = undefined,
  deleteButton = undefined,
}) => {
  return (
    <>
      <div className='card card-flush h-xl-100 py-5'>
        {/* <div className='card-header pt-0'> */}
        {/* <h4 className='card-title d-flex align-items-start flex-column'>
            <span className='card-label fw-bold text-dark fs-2 text-gray-800'>
              <div className='badge badge-light-dark'>{application?.appId}</div>
            </span>
            <span className='text-muted fs-7 mt-1 fw-bold ms-1 mt-2'>
              {application?.lastUpdated ? application.lastUpdated : 'N/A'}
            </span>
          </h4> */}
        {/* </div> */}

        <div className='card-body py-4'>
          {/*begin::Carousel*/}
          <div className='carousel-inner'>
            {/*begin::Item*/}
            <div className='carousel-item active show'>
              {/*begin::Wrapper*/}
              <div className='d-flex align-items-center mb-9'>
                {/*begin::Symbol*/}
                <div className='d-flex flex-column'>
                  <div className='symbol symbol-70px symbol-circle me-9 pb-3'>
                    <span className='symbol-label bg-light-primary'>
                      <i className='ki-outline ki-abstract-24 fs-3x text-primary' />
                    </span>
                  </div>
                  <span className='card-label fw-bold text-dark fs-2 text-gray-800 ms-3'>
                    <div className='badge badge-light-dark'>{application?.appId}</div>
                  </span>
                </div>
                {/*end::Symbol*/}
                {/*begin::Info*/}
                <div className='m-0'>
                  {/*begin::Subtitle*/}
                    <h4 className='fw-bold fs-2 text-gray-800 mb-5 d-flex flex-column'>
                      {application?.appName}
                      <span className='text-muted fs-7 mt-1 fw-bold mt-2'>
                        {application?.lastUpdated ? application.lastUpdated : 'N/A'}
                      </span>
                    </h4>
                  {/*end::Subtitle*/}
                  {/*begin::Items*/}
                  <div className='d-flex d-grid gap-5'>
                    {/*begin::Item*/}
                    <div className='d-flex flex-column flex-shrink-0 me-4'>
                      {/*begin::Section*/}
                      {/*begin::Section*/}
                      <span className='d-flex align-items-center fs-5 fw-bold text-gray-400 mb-2'>
                        <i className='ki-duotone bi bi-database-fill fs-6 text-info me-2' />
                        {application?.database}
                      </span>
                      {/*end::Section*/}
                      {/*begin::Section*/}
                      <span className='d-flex align-items-center text-gray-400 fw-bold fs-4'>
                        <i className='ki-outline ki-right-square fs-6 text-gray-600 me-2' />
                        {api?.length} apis
                      </span>
                      {/*end::Section*/}
                    </div>
                    {/*end::Item*/}
                    {/*begin::Item*/}
                    <div className='d-flex flex-column flex-shrink-0'>
                      {/*begin::Section*/}
                      <span className='d-flex align-items-center fs-4 fw-bold text-gray-400 mb-2'>
                        <i className='ki-outline ki-compass text-success fs-6 me-2' />
                        {dto?.length} objects
                      </span>
                      {/*end::Section*/}
                      {/*begin::Section*/}
                      <span className='d-flex align-items-center text-gray-400 fw-bold fs-4'>
                        <i className='ki-duotone ki-wrench text-danger me-2 fs-6'>
                          <i className='path1'></i>
                          <i className='path2'></i>
                        </i>
                        {api?.length} apis
                      </span>
                      {/*end::Section*/}
                    </div>
                    {/*end::Item*/}
                  </div>
                  {/*end::Items*/}
                </div>
                {/*end::Info*/}
              </div>
              {/*end::Wrapper*/}
              {/*begin::Action*/}
              <div className='m-0'>
                <span className='btn btn-sm btn-light me-2 mb-2 nav-ite dropdown actionCard '>
                  <a
                    className='nav-link '
                    href='#'
                    id='navbarDropdown'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Actions
                  </a>
                  <div
                    className='dropdown-menu dropdown-menu-end animate slideIn'
                    aria-labelledby='navbarDropdown'
                  >
                    {button}
                    <div className='dropdown-divider'></div>

                    {deleteButton}
                  </div>
                </span>
                <Link
                  to={`/workspaces/configure/${application?.workspaceId}/view/${application?.appId}`}
                >
                  <button type='button' className='btn btn-sm btn-primary me-2 mb-2'>
                    Configure
                  </button>
                </Link>
              </div>
              {/*end::Action*/}
            </div>
            {/*end::Item*/}
          </div>
          {/*end::Carousel*/}
        </div>
      </div>
    </>
  )
}

export {Application}
