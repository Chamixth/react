import {FC, useEffect, useState} from 'react'
import {API, ApplicationModel, Dto} from '../../../../../models/application_model'
import {CreateApiConfig} from './create-update-api-conifguration/create-api-popup'
import Swal from 'sweetalert2'
import {deleteApi, updateApi} from '../../../../../services/apiService'

type Props = {
  apis: API[]
  dtos: Dto[]
  application: ApplicationModel
  setDAPI: React.Dispatch<React.SetStateAction<API>>
  setInitData: React.Dispatch<React.SetStateAction<API>>
  setShowPanel: React.Dispatch<React.SetStateAction<boolean>>
  setUpApi: React.Dispatch<React.SetStateAction<API>>
}

const ApiTable: FC<Props> = ({
  apis,
  dtos,
  setDAPI,
  application,
  setUpApi,
  setShowPanel,
  setInitData,
}) => {
  const [create, setCreate] = useState<Array<API>>([])
  const [get, setGet] = useState<Array<API>>([])
  const [update, setUpdate] = useState<Array<API>>([])
  const [del, setDel] = useState<Array<API>>([])
  const [findAll, setFindAll] = useState<Array<API>>([])
  const [others, setOthers] = useState<Array<API>>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('table apis' + apis)

    setCreate(apis.filter((api) => api.crud === 'CREATE'))
    setUpdate(apis.filter((api) => api.crud === 'UPDATE'))
    setGet(apis.filter((api) => api.crud === 'FIND'))
    setDel(apis.filter((api) => api.crud === 'DELETE'))
    setFindAll(apis.filter((api) => api.crud === 'FINDALL'))
    setOthers(
      apis.filter(
        (api) =>
          !['CREATE', 'FIND', 'UPDATE', 'DELETE', 'FINDALL'].includes(api.crud ? api.crud : '')
      )
    )

    setLoading(false)
  }, [apis])

  const handleDelete = (api: API) => {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: '' + api.apiName + ':' + api.apiId,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deletedApi = await deleteApi(api)
        if (deletedApi['operation'] == 'Success') {
          Swal.fire('Deleted!', 'API has been deleted.', 'success').then(() => {
            setDAPI(api)
            setLoading(true)

            setUpdate([])
            setCreate([])
            setDel([])
            setGet([])
            setOthers([])
          })
        } else {
          Swal.fire('Error!', 'There was an error while deleting the API.', 'error')
        }
      }
    })
  }

  return (
    <>
      {loading && (
        <>
          <div>Loading...</div>
        </>
      )}
      {!loading && (
        <>
          {/* <!--begin::Col--> */}
          <div className='card-body pt-0 pb-5 table-responsive'>
            {/*begin::Table*/}
            <table
              className='table fw-semibold text-gray-600 fs-6 gy-5'
              id='kt_table_customers_logs'
            >
              <thead>
                <tr className='fw-bold fs-6 text-gray-500 border-bottom border-gray-200'>
                  <td>Type</td>
                  <td>Endpoint</td>
                  <td>Name</td>
                  <td>AccessRole</td>
                  <td>IsLimited</td>
                  <td>Limiter</td>
                  <td>IsActive</td>
                  <td>IsBlocked</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {create.length > 0 &&
                  create.map((api, i) => (
                    <tr key={i} style={{ verticalAlign: 'middle' }}>
                      <td>
                        <div className='badge badge-light-success'>CREATE</div>
                      </td>
                      <td>CGaaS-Manifest/api/Create/{api.baseDto}</td>
                      <td>{api.apiName}</td>
                      <td style={{ width: '12%' }}>
                        <select
                          onChange={async (e) => {
                            const newAccessRole = e.target.value
                            const updatedApi = {...api, accessRole: newAccessRole}

                            try {
                              const response = await updateApi(updatedApi)

                              if (response.apiId) {
                                setUpApi(updatedApi)
                              }
                            } catch (error) {
                              console.error('Error updating API:', error)
                            }
                          }}
                          name='accessRole'
                          data-control='selecaccessRolet2'
                          data-hide-search='true'
                          data-placeholder='Select a access role...'
                          className='form-select form-select-solid'
                          value={api.accessRole ? api.accessRole : '-1'}
                        >
                          <option value={'-1'}>Select a access role...</option>
                          <option value={'admin'}>Admin</option>
                          <option value={'root'}>Root</option>
                          <option value={'all'}>All</option>
                        </select>
                      </td>
                      <td>{api.limited == true ? 'True' : 'False'}</td>
                      <td>{api.limiter?.maxRequests}</td>
                      <td>{api.active == true ? 'True' : 'False'}</td>
                      <td>
                        <select
                          onChange={async (e) => {
                            const newBlocked = e.target.value
                            let updatedApi = {...api}
                            if (newBlocked=='true'){
                              updatedApi = {...updatedApi, blocked:true}
                            } else {
                              updatedApi = {...updatedApi, blocked:false}
                            }

                            try {
                              const response = await updateApi(updatedApi)

                              if (response.apiId) {
                                setUpApi(updatedApi)
                              }
                            } catch (error) {
                              console.error('Error updating API:', error)
                            }
                          }}
                          name='blocked'
                          data-control='blocked'
                          data-hide-search='true'
                          data-placeholder='Set blocked...'
                          className='form-select form-select-solid'
                          value={api.blocked ? 'true' : 'false'}
                        >
                          <option value={'true'}>True</option>
                          <option value={'false'}>False</option>
                        </select>
                      </td>
                      <td>
                        <a
                          href='#'
                          onClick={() => {
                            setShowPanel(true)
                            setInitData(api)
                          }}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <i className='ki-duotone ki-pencil fs-2'>
                            <span className='path1'></span>
                            <span className='path2'></span>
                          </i>
                        </a>
                        <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          onClick={() => handleDelete(api)}
                        >
                          <i className='ki-duotone ki-trash fs-2'>
                            <span className='path1'></span>
                            <span className='path2'></span>
                            <span className='path3'></span>
                            <span className='path4'></span>
                            <span className='path5'></span>
                          </i>
                        </a>
                      </td>
                    </tr>
                  ))}
                {update.length > 0 &&
                  update.map((api, i) => (
                    <tr key={i} style={{ verticalAlign: 'middle' }}>
                      <td>
                        <div className='badge badge-light-warning'>UPDATE</div>
                      </td>
                      <td>CGaaS-Manifest/api/Update/{api.baseDto}</td>
                      <td>{api.apiName}</td>
                      <td style={{ width: '12%' }}>
                        <select
                          onChange={async (e) => {
                            const newAccessRole = e.target.value
                            const updatedApi = {...api, accessRole: newAccessRole}

                            try {
                              const response = await updateApi(updatedApi)

                              if (response.apiId) {
                                setUpApi(updatedApi)
                              }
                            } catch (error) {
                              console.error('Error updating API:', error)
                            }
                          }}
                          name='accessRole'
                          data-control='selecaccessRolet2'
                          data-hide-search='true'
                          data-placeholder='Select a access role...'
                          className='form-select form-select-solid'
                          value={api.accessRole ? api.accessRole : '-1'}
                        >
                          <option value={'-1'}>Select a access role...</option>
                          <option value={'admin'}>Admin</option>
                          <option value={'root'}>Root</option>
                          <option value={'all'}>All</option>
                        </select>
                      </td>
                      <td>{api.limited == true ? 'True' : 'False'}</td>
                      <td>{api.limiter?.maxRequests}</td>
                      <td>{api.active == true ? 'True' : 'False'}</td>
                      <td>
                        <select
                          onChange={async (e) => {
                            const newBlocked = e.target.value
                            let updatedApi = {...api}
                            if (newBlocked=='true'){
                              updatedApi = {...updatedApi, blocked:true}
                            } else {
                              updatedApi = {...updatedApi, blocked:false}
                            }

                            try {
                              const response = await updateApi(updatedApi)

                              if (response.apiId) {
                                setUpApi(updatedApi)
                              }
                            } catch (error) {
                              console.error('Error updating API:', error)
                            }
                          }}
                          name='blocked'
                          data-control='blocked'
                          data-hide-search='true'
                          data-placeholder='Set blocked...'
                          className='form-select form-select-solid'
                          value={api.blocked ? 'true' : 'false'}
                        >
                          <option value={'true'}>True</option>
                          <option value={'false'}>False</option>
                        </select>
                      </td>
                      <td>
                        <a
                          href='#'
                          onClick={() => {
                            setShowPanel(true)
                            setInitData(api)
                          }}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <i className='ki-duotone ki-pencil fs-2'>
                            <span className='path1'></span>
                            <span className='path2'></span>
                          </i>
                        </a>
                        <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          onClick={() => handleDelete(api)}
                        >
                          <i className='ki-duotone ki-trash fs-2'>
                            <span className='path1'></span>
                            <span className='path2'></span>
                            <span className='path3'></span>
                            <span className='path4'></span>
                            <span className='path5'></span>
                          </i>
                        </a>
                      </td>
                    </tr>
                  ))}
                {get.length > 0 &&
                  get.map((api, i) => (
                    <tr key={i} style={{ verticalAlign: 'middle' }}>
                      <td>
                        <div className='badge badge-light-success'>FIND</div>
                      </td>
                      <td>CGaaS-Manifest/api/Find/{api.baseDto}</td>
                      <td>{api.apiName}</td>
                      <td style={{ width: '12%' }}>
                        <select
                          onChange={async (e) => {
                            const newAccessRole = e.target.value
                            const updatedApi = {...api, accessRole: newAccessRole}

                            try {
                              const response = await updateApi(updatedApi)

                              if (response.apiId) {
                                setUpApi(updatedApi)
                              }
                            } catch (error) {
                              console.error('Error updating API:', error)
                            }
                          }}
                          name='accessRole'
                          data-control='selecaccessRolet2'
                          data-hide-search='true'
                          data-placeholder='Select a access role...'
                          className='form-select form-select-solid'
                          value={api.accessRole ? api.accessRole : '-1'}
                        >
                          <option value={'-1'}>Select a access role...</option>
                          <option value={'admin'}>Admin</option>
                          <option value={'root'}>Root</option>
                          <option value={'all'}>All</option>
                        </select>
                      </td>
                      <td>{api.limited == true ? 'True' : 'False'}</td>
                      <td>{api.limiter?.maxRequests}</td>
                      <td>{api.active == true ? 'True' : 'False'}</td>
                      <td>
                        <select
                          onChange={async (e) => {
                            const newBlocked = e.target.value
                            let updatedApi = {...api}
                            if (newBlocked=='true'){
                              updatedApi = {...updatedApi, blocked:true}
                            } else {
                              updatedApi = {...updatedApi, blocked:false}
                            }

                            try {
                              const response = await updateApi(updatedApi)

                              if (response.apiId) {
                                setUpApi(updatedApi)
                              }
                            } catch (error) {
                              console.error('Error updating API:', error)
                            }
                          }}
                          name='blocked'
                          data-control='blocked'
                          data-hide-search='true'
                          data-placeholder='Set blocked...'
                          className='form-select form-select-solid'
                          value={api.blocked ? 'true' : 'false'}
                        >
                          <option value={'true'}>True</option>
                          <option value={'false'}>False</option>
                        </select>
                      </td>
                      <td>
                        <a
                          href='#'
                          onClick={() => {
                            setShowPanel(true)
                            setInitData(api)
                          }}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <i className='ki-duotone ki-pencil fs-2'>
                            <span className='path1'></span>
                            <span className='path2'></span>
                          </i>
                        </a>
                        <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          onClick={() => handleDelete(api)}
                        >
                          <i className='ki-duotone ki-trash fs-2'>
                            <span className='path1'></span>
                            <span className='path2'></span>
                            <span className='path3'></span>
                            <span className='path4'></span>
                            <span className='path5'></span>
                          </i>
                        </a>
                      </td>
                    </tr>
                  ))}

                {findAll.length > 0 &&
                  findAll.map((api, i) => (
                    <tr key={i} style={{ verticalAlign: 'middle' }}>
                      <td>
                        <div className='badge badge-light-success'>FINDALL</div>
                      </td>
                      <td>CGaaS-Manifest/api/FindAll/{api.baseDto}</td>
                      <td>{api.apiName}</td>
                      <td style={{ width: '12%' }}>
                        <select
                          onChange={async (e) => {
                            const newAccessRole = e.target.value
                            const updatedApi = {...api, accessRole: newAccessRole}

                            try {
                              const response = await updateApi(updatedApi)

                              if (response.apiId) {
                                setUpApi(updatedApi)
                              }
                            } catch (error) {
                              console.error('Error updating API:', error)
                            }
                          }}
                          name='accessRole'
                          data-control='selecaccessRolet2'
                          data-hide-search='true'
                          data-placeholder='Select a access role...'
                          className='form-select form-select-solid'
                          value={api.accessRole ? api.accessRole : '-1'}
                        >
                          <option value={'-1'}>Select a access role...</option>
                          <option value={'admin'}>Admin</option>
                          <option value={'root'}>Root</option>
                          <option value={'all'}>All</option>
                        </select>
                      </td>
                      <td>{api.limited == true ? 'True' : 'False'}</td>
                      <td>{api.limiter?.maxRequests}</td>
                      <td>{api.active == true ? 'True' : 'False'}</td>
                      <td>
                        <select
                          onChange={async (e) => {
                            const newBlocked = e.target.value
                            let updatedApi = {...api}
                            if (newBlocked=='true'){
                              updatedApi = {...updatedApi, blocked:true}
                            } else {
                              updatedApi = {...updatedApi, blocked:false}
                            }

                            try {
                              const response = await updateApi(updatedApi)

                              if (response.apiId) {
                                setUpApi(updatedApi)
                              }
                            } catch (error) {
                              console.error('Error updating API:', error)
                            }
                          }}
                          name='blocked'
                          data-control='blocked'
                          data-hide-search='true'
                          data-placeholder='Set blocked...'
                          className='form-select form-select-solid'
                          value={api.blocked ? 'true' : 'false'}
                        >
                          <option value={'true'}>True</option>
                          <option value={'false'}>False</option>
                        </select>
                      </td>
                      <td>
                        <a
                          href='#'
                          onClick={() => {
                            setShowPanel(true)
                            setInitData(api)
                          }}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <i className='ki-duotone ki-pencil fs-2'>
                            <span className='path1'></span>
                            <span className='path2'></span>
                          </i>
                        </a>
                        <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          onClick={() => handleDelete(api)}
                        >
                          <i className='ki-duotone ki-trash fs-2'>
                            <span className='path1'></span>
                            <span className='path2'></span>
                            <span className='path3'></span>
                            <span className='path4'></span>
                            <span className='path5'></span>
                          </i>
                        </a>
                      </td>
                    </tr>
                  ))}

                {del.length > 0 &&
                  del.map((api, i) => (
                    <tr key={i} style={{ verticalAlign: 'middle' }}>
                      <td>
                        <div className='badge badge-light-danger'>DELETE</div>
                      </td>
                      <td>CGaaS-Manifest/api/Delete/{api.baseDto}</td>
                      <td>{api.apiName}</td>
                      <td style={{ width: '12%' }}>
                        <select
                          onChange={async (e) => {
                            const newAccessRole = e.target.value
                            const updatedApi = {...api, accessRole: newAccessRole}

                            try {
                              const response = await updateApi(updatedApi)

                              if (response.apiId) {
                                setUpApi(updatedApi)
                              }
                            } catch (error) {
                              console.error('Error updating API:', error)
                            }
                          }}
                          name='accessRole'
                          data-control='selecaccessRolet2'
                          data-hide-search='true'
                          data-placeholder='Select a access role...'
                          className='form-select form-select-solid'
                          value={api.accessRole ? api.accessRole : '-1'}
                        >
                          <option value={'-1'}>Select a access role...</option>
                          <option value={'admin'}>Admin</option>
                          <option value={'root'}>Root</option>
                          <option value={'all'}>All</option>
                        </select>
                      </td>
                      <td>{api.limited == true ? 'True' : 'False'}</td>
                      <td>{api.limiter?.maxRequests}</td>
                      <td>{api.active == true ? 'True' : 'False'}</td>
                      <td>
                        <select
                          onChange={async (e) => {
                            const newBlocked = e.target.value
                            let updatedApi = {...api}
                            if (newBlocked=='true'){
                              updatedApi = {...updatedApi, blocked:true}
                            } else {
                              updatedApi = {...updatedApi, blocked:false}
                            }

                            try {
                              const response = await updateApi(updatedApi)

                              if (response.apiId) {
                                setUpApi(updatedApi)
                              }
                            } catch (error) {
                              console.error('Error updating API:', error)
                            }
                          }}
                          name='blocked'
                          data-control='blocked'
                          data-hide-search='true'
                          data-placeholder='Set blocked...'
                          className='form-select form-select-solid'
                          value={api.blocked ? 'true' : 'false'}
                        >
                          <option value={'true'}>True</option>
                          <option value={'false'}>False</option>
                        </select>
                      </td>
                      <td>
                        <a
                          href='#'
                          onClick={() => {
                            setShowPanel(true)
                            setInitData(api)
                          }}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <i className='ki-duotone ki-pencil fs-2'>
                            <span className='path1'></span>
                            <span className='path2'></span>
                          </i>
                        </a>
                        <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          onClick={() => handleDelete(api)}
                        >
                          <i className='ki-duotone ki-trash fs-2'>
                            <span className='path1'></span>
                            <span className='path2'></span>
                            <span className='path3'></span>
                            <span className='path4'></span>
                            <span className='path5'></span>
                          </i>
                        </a>
                      </td>
                    </tr>
                  ))}
                {/* {others.length > 0 &&
                  others.map((api, i) => (
                    <tr key={i}>
                      <td className='min-w-70px'>
                        <div className='badge badge-light-warning'>{api.crud}</div>
                      </td>
                      <td>
                        CGaaS-Manifest/api/{api.crud}/{api.baseDto}
                      </td>
                      <td>{api.apiName}</td>
                      <td className='text-end'>
                        <a
                          href='#'
                          onClick={() => {
                            setShowPanel(true)
                            setInitData(api)
                          }}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <i className='ki-duotone ki-pencil fs-2'>
                            <span className='path1'></span>
                            <span className='path2'></span>
                          </i>
                        </a>
                        <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          onClick={() => handleDelete(api)}
                        >
                          <i className='ki-duotone ki-trash fs-2'>
                            <span className='path1'></span>
                            <span className='path2'></span>
                            <span className='path3'></span>
                            <span className='path4'></span>
                            <span className='path5'></span>
                          </i>
                        </a>
                      </td>
                    </tr>
                  ))} */}
              </tbody>
            </table>
          </div>
          {/* <!--end::Col--> */}
        </>
      )}
    </>
  )
}

export default ApiTable
