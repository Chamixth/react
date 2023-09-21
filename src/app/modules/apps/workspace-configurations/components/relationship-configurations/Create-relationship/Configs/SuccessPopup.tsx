/* eslint-disable jsx-a11y/anchor-is-valid */

import { useIllustrationsPath } from "../../../../../../../../_metronic/helpers"

const SuccessPopup = () => {
  return (
    <>
      <div >
        <div className='w-100 text-center'>
          {/* begin::Heading */}
          <h1 className='fw-bold text-dark mb-3'>Hooray! Workspace Created</h1>
          {/* end::Heading */}

          {/* begin::Description */}
          <div className='fs-6 text-gray-600 mb-5'>
          Congratulations! You have successfully created a new workspace. <br/>
          Enjoy the seamless and productive experience. Happy collaborating!
          </div>
          {/* end::Description */}

          {/* begin::Illustration */}
          <div className='text-center px-4 py-15'>
            <img src={useIllustrationsPath('1.png')} alt='' className='mw-100 mh-300px' />
          </div>
          {/* end::Illustration */}
        </div>
      </div>
    </>
  )
}

export {SuccessPopup}
