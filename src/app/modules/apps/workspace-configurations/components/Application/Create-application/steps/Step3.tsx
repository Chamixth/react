/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { useDbPath } from '../../../../../../../../_metronic/helpers'
import {StepProps} from '../../IApplicationModels'

const Step3 = ({data, updateData, hasError}: StepProps) => {
  const [database, setDatabaseType] = useState('MONGO') // Default value is 'MONGO'


  useEffect(() => {
    if (data.database){
      setDatabaseType(data.database)
    }
  }, [data])

  useEffect(() => {
      updateData({database:database})
    }, [database])
  return (
    <>
      {/*begin::Step 3 */}
      <div className='pb-5' data-kt-stepper-element='content'>
        <div className='w-100'>
          {/*begin::Form Group */}

          {/*<div className='fv-row mb-10'>
            <label className='required fs-5 fw-semibold mb-2'>database Name</label>

            <input
              type='text'
              className='form-control form-control-lg form-control-solid'
              name='dbname'
              value={data.database}
              onChange={(e) =>
                updateData({
                   database:e.target.value
                })
              }
            />
            {!data.database && hasError && (
              <div className='fv-plugins-message-container'>
                <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                  database name is required
                </div>
              </div>
            )}
          </div>*/}
          {/*end::Form Group */}

          {/*begin::Form Group */}
          <div className='fv-row'>
            <label className='d-flex align-items-center fs-5 fw-semibold mb-4'>
              <span className='required'>Select database Engine</span>

              <i
                className='fas fa-exclamation-circle ms-2 fs-7'
                data-bs-toggle='tooltip'
                title='Select your app database engine'
              ></i>
            </label>
 {/*begin:Option */}
 <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
              <span className='d-flex align-items-center me-2'>
                <span className='symbol symbol-50px me-6'>
                  <span className='symbol-label bg-light-success'>
                  <img src={useDbPath('mongodb-icon.png')} alt='' className='mh-40px p-2' />

                  </span>
                </span>

                <span className='d-flex flex-column'>
                  <span className='fw-bolder fs-6'>MongoDB</span>
                  <span className='fs-7 text-muted'>NoSQL database program</span>
                </span>
              </span>

              <span className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='databaseSolution'
                  value='MONGO'
                   checked={database === 'MONGO'}
                   onChange={(e) => setDatabaseType(e.target.value)}
                  // onChange={(e) =>
                  //     updateData({
                  //         database: e.target.value,
                  //     })
                  // }

                />
              </span>
            </label>
            {/*end::Option */}
            {/*begin:Option */}
            <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
              <span className='d-flex align-items-center me-2'>
                <span className='symbol symbol-50px me-6'>
                  <span className='symbol-label bg-light-danger'>
                  <img src={useDbPath('mysql-icon.png')} alt='' className='mh-40px p-2' />

                  </span>
                </span>

                <span className='d-flex flex-column'>
                  <span className='fw-bolder fs-6'>MySQL</span>
                  <span className='fs-7 text-muted'>Basic MySQL database</span>
                </span>
              </span>

              <span className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='databaseSolution'
                  value='SQL'
                   checked={database === 'SQL'}
                   onChange={(e) => setDatabaseType(e.target.value)}
                  // onChange={(e) =>
                  //     updateData({
                  //         database: e.target.value,
                  //     })
                  // }
                />
              </span>
            </label>
            {/*end::Option */}

            {/*begin:Option */}
            <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
              <span className='d-flex align-items-center me-2'>
                <span className='symbol symbol-50px me-6'>
                  <span className='symbol-label bg-light-warning'>
                  <img src={useDbPath('firebase-icon.png')} alt='' className='mh-40px p-2' />

                  </span>
                </span>

                <span className='d-flex flex-column'>
                  <span className='fw-bolder fs-6'>Firebase</span>
                  <span className='fs-7 text-muted'>Google based app data management</span>
                </span>
              </span>

              <span className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='databaseSolution'
                  value='FIREBASE'
                  checked={database === 'FIREBASE'}
                  onChange={(e) => setDatabaseType(e.target.value)}
                  // onChange={(e) =>
                  //     updateData({
                  //         database: e.target.value,
                  //     })
                  // }
                />
              </span>
            </label>
            {/*end::Option */}

            {/*begin:Option */}
            <label className='d-flex align-items-center justify-content-between cursor-pointer mb-6'>
              <span className='d-flex align-items-center me-2'>
                
                <span className='symbol symbol-50px me-6'>
                  <span className='symbol-label bg-light-info'>
                  <img src={useDbPath('postgresql-icon.png')} alt='' className='mh-45px p-3' />

                    {/*<i className='fab fa-amazon text-primary fs-2x'></i>*/}
                  </span>
                </span>

                <span className='d-flex flex-column'>
                  <span className='fw-bolder fs-6'>PostgreSQL</span>
                  <span className='fs-7 text-muted'>Open-Source Relational DBMS</span>
                </span>
              </span>

              <span className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='databaseSolution'
                  value='POSTGRESSQL'
                  checked={database === 'POSTGRESSQL'}
                  onChange={(e) => setDatabaseType(e.target.value)}
                  // onChange={(e) =>
                  //     updateData({
                  //         database: e.target.value,
                  //     })
                  // }
                />
              </span>
            </label>
            {/*end::Option */}

           
          </div>
          {/*end::Form Group */}
        </div>
      </div>
      {/*end::Step 3 */}
    </>
  )
}

export {Step3}
