/* eslint-disable jsx-a11y/anchor-is-valid */

import { useIllustrationsPath } from "../../../../../../../../_metronic/helpers"

type Props = {
  isUpdate:boolean
}

const SuccessPopup = ({isUpdate}: Props) => {
  return (
    <>
      <div >
        <div className='w-85 text-center mx-auto'>
          {/* begin::Heading */}
          {!isUpdate && (
            <h1 className='fw-bold text-dark mb-3'>Yayy! Appliction Created</h1>
           )}
           {isUpdate && (
            <h1 className='fw-bold text-dark mb-3'>Yayy! Appliction Updated</h1>
           )}
          {/* end::Heading */}

          {/* begin::Description */}
          {!isUpdate && (
            <div className='fs-6 text-gray-600 mb-5'>
            Congratulations! You have successfully created a new application.
          
            </div>
          )}
          {isUpdate && (
            <div className='fs-6 text-gray-600 mb-5'>
            Congratulations! You have successfully updated the Appliction. 
            </div>
          )}
          
          {/* end::Description */}

         {/* begin::Illustration */}
         <div className='text-center px-4 py-4'>
            <img src={useIllustrationsPath('2.png')} alt='' className='mh-250px' style={{ marginTop: '-20px',marginBottom:'20px' }}/>
          </div>
          {/* end::Illustration */}
        </div>
      </div>
    </>
  )
}

export {SuccessPopup}
