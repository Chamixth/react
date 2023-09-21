/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon, useIllustrationsPath } from '../../../../../../../../_metronic/helpers'

const Step5 = () => {
  return (
    <>
      <div data-kt-stepper-element='content'>
        <div className='w-100 text-center'>
          {/* begin::Heading */}
          <h1 className='fw-bold text-dark mb-2'>Submit Application</h1>
          {/* end::Heading */}

          {/* begin::Description */}
          <div className='text-muted fw-semibold fs-xl'>
            Submit your app to kickstart your project.
          </div>
          {/* end::Description */}

          {/* begin::Illustration */}
          <div className='text-center px-4 py-4'>
            <img src={useIllustrationsPath('9.png')} alt='' className='mh-250px' />
          </div>
          {/* end::Illustration */}
        </div>
      </div>
    </>
  )
}

export {Step5}
