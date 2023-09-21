/* eslint-disable jsx-a11y/anchor-is-valid */

import { useIllustrationsPath } from "../../../../../../../_metronic/helpers"

type Props = {
  isEdit: boolean
}

const SuccessPopup = ({isEdit}:Props) => {
  return (
    <>
      <div >
        <div className='w-100 text-center'>
          {/* begin::Heading */}
          <h1 className='fw-bold text-dark mb-3'>Hooray! API configuration {isEdit?"updated":"created"}</h1>
          {/* end::Heading */}

          {/* begin::Description */}
          <div className='fs-6 text-gray-600 mb-5'>
          Congratulations! You have successfully {isEdit?"updated the API":"created a new API"} . <br/>
          Enjoy the seamless and productive experience. Happy collaborating!
          </div>
          {/* end::Description */}

          {/* begin::Illustration */}
          <div className='text-center px-4 py-15'>
            <img src={useIllustrationsPath(isEdit?"17.png":"1.png")} alt='' className='mw-100 mh-200px' />
          </div>
          {/* end::Illustration */}
        </div>
      </div>
    </>
  )
}

export {SuccessPopup}
