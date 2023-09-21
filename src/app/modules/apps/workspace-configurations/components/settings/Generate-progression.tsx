import React from 'react'
import {useState, CSSProperties, useEffect} from 'react'
import {PropagateLoader} from 'react-spinners'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useParams} from 'react-router'
import {generateApplication} from '../../../../../services/applicationService'
import Swal from 'sweetalert2'
import { useAuth0 } from '@auth0/auth0-react'

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
}
interface ChangingIconProps {
  initialColor: string
  targetColor: string
  delay: number
}

const ChangingIcon: React.FC<ChangingIconProps & { isGenerate: boolean }> = ({
  initialColor,
  targetColor,
  delay,
  isGenerate,
}) => {
  const [iconColor, setIconColor] = useState(initialColor);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isGenerate) {
      timeoutId = setTimeout(() => {
        setIconColor(targetColor);
      }, delay);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [delay, isGenerate, targetColor]);

  return <i className={`fa fa-genderless ${iconColor} fs-1`} />;
};

function GenerateProgression() {
  const [loading, setLoading] = useState(false)
  const [isGenerate, setIsGenerate] = useState(false)
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    // Set a timeout to hide the loader after 10 seconds
    if (isGenerate) {
      generateApp()
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 12500);

      return () => clearTimeout(timeoutId);
    }
  }, [isGenerate]);
  
  const {applicationId} = useParams()

  const generateApp = () => {
    const userId = user?.sub;
    generateApplication({appId: applicationId,userId:userId || ''})
      .then((data) => {
        console.log(data)
        setLoading(false) // Set loading to false after data is received
      })
      .catch((error) => {
        // Handle errors if needed
        Swal.fire({
          text: 'Something wrong while generating. Please check the details again!',
          icon: 'warning',
          showCancelButton: !0,
          buttonsStyling: !1,
          confirmButtonText: 'Ok Sure',
          cancelButtonText: 'Close',
          customClass: {
            confirmButton: 'btn fw-bold btn-danger',
            cancelButton: 'btn fw-bold btn-active-light-primary',
          },
        })
        console.error('Error fetching application:', error)
        setLoading(false) // Set loading to false on error
      })
  }
  return (
    <div>
      {/* <div className='d-flex'>
        <div className='col-xl-12'> */}
          {/*begin::List Widget 5*/}
          {!isGenerate && (
            <div className='card  mb-xl-8 pb-8 p-0'>
              {/*begin::Header*/}
              <div className='card-header align-items-center border-0 mt-4'>
                <h3 className='card-title align-items-self d-flex flex-column'>
                  <span className='fw-bold mb-2 text-dark'>Generate App</span>
                  {/* <span className='text-muted fw-semibold fs-7'>APP001</span> */}
                </h3>
              </div>
              {/*end::Header*/}
              {/*begin::Body*/}
              <div className='card-body pt-5'>
                {/*begin::Timeline*/}
                <div className='d-flex justify-content-center'>
                  <img
                    src={toAbsoluteUrl('/media/Generate/deploy.gif')}
                    className='w-250px me-4 rounded'
                    alt='ready to deploy'
                    onError={(e) => console.error('Error loading GIF:', e)}
                  />
                </div>
                {/*end::Timeline*/}
                <div className='d-flex justify-content-center mt-15'>
                  <button
                    type='button'
                    onClick={() => [setIsGenerate(true), setLoading(true)]}
                    className='btn btn-lg btn-light-primary me-3 py-2 px-20'
                  >
                    Generate
                  </button>
                </div>
              </div>
              {/*end: Card Body*/}
            </div>
          )}
          {isGenerate && (
            <div className='card card-xl-stretch mb-xl-8 pb-8'>
              {/*begin::Header*/}
              <div className='card-header align-items-center border-0 mt-4'>
                <h3 className='card-title align-items-start flex-column'>
                  <span className='fw-bold mb-2 text-dark'>
                    {loading ? 'Generating code' : 'Deploy code'}
                  </span>
                  {/* <span className='text-muted fw-semibold fs-7'>APP001</span> */}
                </h3>
              </div>
              {/*end::Header*/}
              {/*begin::Body*/}
              <div className='card-body pt-5'>
                {/*begin::Timeline*/}
                {loading && (
                  <div className='timeline-label ps-0'>
                    {/*begin::Item*/}
                    <div className='timeline-item'>
                      {/*begin::Label*/}
                      <div className='timeline-label fw-bold text-gray-800 fs-6'></div>
                      {/*end::Label*/}
                      {/*begin::Badge*/}
                      <div className='timeline-badge'>
                        <ChangingIcon
                          initialColor='text-warning'
                          targetColor='text-success'
                          delay={2500}
                          isGenerate={isGenerate}
                        />
                      </div>
                      {/*end::Badge*/}
                      {/*begin::Text*/}
                      <div className='fw-bold timeline-content ps-3'>
                        Initializing Generating Process
                      </div>
                      {/*end::Text*/}
                    </div>
                    {/*end::Item*/}
                    {/*begin::Item*/}
                    <div className='timeline-item'>
                      {/*begin::Label*/}
                      <div className='timeline-label fw-bold text-gray-800 fs-6'></div>
                      {/*end::Label*/}
                      {/*begin::Badge*/}
                      <div className='timeline-badge'>
                        <ChangingIcon
                          initialColor='text-warning'
                          targetColor='text-success'
                          delay={5000}
                          isGenerate={isGenerate}
                        />
                      </div>
                      {/*end::Badge*/}
                      {/*begin::Content*/}
                      <div className='timeline-content d-flex'>
                        <span className='fw-bold text-gray-800 ps-3'>Generate The Solution</span>
                      </div>
                      {/*end::Content*/}
                    </div>
                    {/*end::Item*/}
                    {/*begin::Item*/}
                    <div className='timeline-item'>
                      {/*begin::Label*/}
                      <div className='timeline-label fw-bold text-gray-800 fs-6'></div>
                      {/*end::Label*/}
                      {/*begin::Badge*/}
                      <div className='timeline-badge'>
                        <ChangingIcon
                          initialColor='text-warning'
                          targetColor='text-success'
                          delay={7500}
                          isGenerate={isGenerate}
                        />
                      </div>
                      {/*end::Badge*/}
                      {/*begin::Desc*/}
                      <div className='timeline-content fw-bold text-gray-800 ps-3'>
                        Validating The Solution
                      </div>
                      {/*end::Desc*/}
                    </div>
                    {/*end::Item*/}
                    {/*begin::Item*/}
                    <div className='timeline-item'>
                      {/*begin::Label*/}
                      <div className='timeline-label fw-bold text-gray-800 fs-6'></div>
                      {/*end::Label*/}
                      {/*begin::Badge*/}
                      <div className='timeline-badge'>
                        <ChangingIcon
                          initialColor='text-warning'
                          targetColor='text-success'
                          delay={10000}
                          isGenerate={isGenerate}
                        />
                      </div>
                      {/*end::Badge*/}
                      {/*begin::Text*/}
                      <div className='timeline-content fw-bold ps-3'>Building The Solution</div>
                      {/*end::Text*/}
                    </div>
                    {/*end::Item*/}
                  </div>
                )}
                {!loading && (
                  <div className='d-flex justify-content-center'>
                    <img
                      src={toAbsoluteUrl('/media/Generate/generate.gif')}
                      className='w-250px me-4 rounded'
                      alt='ready to deploy'
                      onError={(e) => console.error('Error loading GIF:', e)}
                    />
                  </div>
                )}
                {/*end::Timeline*/}
                <div className='d-flex justify-content-center mt-15'>
                  <div className='sweet-loading'>
                    <PropagateLoader
                      color='#7239EA'
                      cssOverride={{}}
                      loading={loading}
                      size={8}
                      speedMultiplier={0.75}
                    />
                  </div>
                  {!loading && (
                    <button
                      type='button'
                     
                      className='btn btn-lg btn-light-primary me-3 py-2 px-20'
                    >
                      Deploy
                    </button>
                  )}
                </div>
              </div>
              {/*end: Card Body*/}
            </div>
          )}
          {/*end: List Widget 5*/}
        </div>
    //   </div>
    // </div>
  )
}

export default GenerateProgression
