import React, {useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import Auth0Config from './authenticationConfig/AuthConfig'

type Props = {
  workspaceId: string
}

const Authentication = ({workspaceId}: Props) => {
  const [isAuthModel, setIsAuthModel] = useState<boolean>(false)
  const [authType, setAuthType] = useState<string>('')

  return (
    <>
      {isAuthModel && (
        <Auth0Config
          workspaceId={workspaceId}
          authType={authType}
          handleCloseModal={() => setIsAuthModel(false)}
        />
      )}
      {!isAuthModel && (
        <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
          {/*begin::Col*/}
          <div className='col-md-6 col-lg-4 col-xl-3'>
            {/*begin::Card*/}
            <div
              className='card h-100 btn-outline btn btn-outline btn-outline-dashed btn-active-light-primary'
              onClick={() => [setIsAuthModel(true), setAuthType('aresauth')]}
            >
              {/*begin::Card body*/}
              <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
                {/*begin::Name*/}
                <div className='text-gray-800 d-flex flex-column'>
                  {/*begin::Image*/}
                  <div className='symbol symbol-125px mb-5'>
                    <img
                      src={toAbsoluteUrl('/media/authentication/aresauth.svg')}
                      className='theme-light-show'
                      alt=''
                    />
                  </div>
                  {/*end::Image*/}
                  {/*begin::Title*/}
                  <div className='fs-5 fw-bold mb-2'>Aresauth</div>
                  {/*end::Title*/}
                </div>
                {/*end::Name*/}
                {/*begin::Description*/}
                <div className='fs-7 fw-semibold text-gray-400 text-hover-primary'>Configure</div>
                {/*end::Description*/}
              </div>
              {/*end::Card body*/}
            </div>
            {/*end::Card*/}
          </div>
          {/*end::Col*/}
          {/*begin::Col*/}
          <div className='col-md-6 col-lg-4 col-xl-3'>
            {/*begin::Card*/}
            <div
              className='card h-100 btn-outline btn btn-outline btn-outline-dashed btn-active-light-primary'
              onClick={() => [setIsAuthModel(true), setAuthType('auth0')]}
            >
              {/*begin::Card body*/}
              <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
                {/*begin::Name*/}
                <div className='text-gray-800 d-flex flex-column'>
                  {/*begin::Image*/}
                  <div className='symbol symbol-150px mb-0'>
                    <img
                      src={toAbsoluteUrl('/media/authentication/auth0.svg')}
                      className='theme-light-show'
                      alt=''
                    />
                  </div>
                  {/*end::Image*/}
                  {/*begin::Title*/}
                  <div className='fs-5 fw-bold mb-2'>auth0</div>
                  {/*end::Title*/}
                </div>
                {/*end::Name*/}
                {/*begin::Description*/}
                <div className='fs-7 fw-semibold text-gray-400 text-hover-primary'>Configure</div>
                {/*end::Description*/}
              </div>
              {/*end::Card body*/}
            </div>
            {/*end::Card*/}
          </div>
          {/*end::Col*/}
          {/*begin::Col*/}
          <div className='col-md-6 col-lg-4 col-xl-3'>
            {/*begin::Card*/}
            <div
              className='card h-100 btn-outline btn btn-outline btn-outline-dashed btn-active-light-primary'
              onClick={() => [setIsAuthModel(true), setAuthType('okta')]}
            >
              {/*begin::Card body*/}
              <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
                {/*begin::Name*/}
                <div className='text-gray-800 d-flex flex-column'>
                  {/*begin::Image*/}
                  <div className='symbol symbol-150px'>
                    <img
                      src={toAbsoluteUrl('/media/authentication/okta.svg')}
                      className='theme-light-show'
                      alt=''
                    />
                  </div>
                  {/*end::Image*/}
                  {/*begin::Title*/}
                  <div className='fs-5 fw-bold mb-2'>okta</div>
                  {/*end::Title*/}
                </div>
                {/*end::Name*/}
                {/*begin::Description*/}
                <div className='fs-7 fw-semibold text-gray-400 text-hover-primary'>Configure</div>
                {/*end::Description*/}
              </div>
              {/*end::Card body*/}
            </div>
            {/*end::Card*/}
          </div>
          {/*end::Col*/}
          {/*begin::Col*/}
          <div className='col-md-6 col-lg-4 col-xl-3'>
            {/*begin::Card*/}
            <label
              className='card h-100 btn-outline btn btn-outline btn-outline-dashed btn-active-light-primary'
              onClick={() => [setIsAuthModel(true), setAuthType('casdoor')]}
            >
              {/*begin::Card body*/}
              <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
                {/*begin::Name*/}
                <div className='text-gray-800 d-flex flex-column'>
                  {/*begin::Image*/}
                  <div className='symbol symbol-160px'>
                    <img
                      src={toAbsoluteUrl('/media/authentication/casdoor.svg')}
                      className='theme-light-show'
                      alt=''
                    />
                  </div>
                  {/*end::Image*/}
                  {/*begin::Title*/}
                  <div className='fs-5 fw-bold mb-2'>Casdoor</div>
                  {/*end::Title*/}
                </div>
                {/*end::Name*/}
                {/*begin::Description*/}
                <div className='fs-7 fw-semibold text-gray-400 text-hover-primary'>Configure</div>
                {/*end::Description*/}
              </div>
              {/*end::Card body*/}
            </label>
            {/*end::Card*/}
          </div>
          {/*end::Col*/}
        </div>
      )}
    </>
  )
}

export default Authentication
