import React, {FC, useEffect, useRef, useState} from 'react'
import {Nav, Tab} from 'react-bootstrap'
import {getAllDtos} from '../../../services/dtoService'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import Dtos from './components/model-configurations/Dtos'
import {getAllApiByAppId} from '../../../services/apiService'
import {CreateApiConfig} from './components/api-configuration/create-update-api-conifguration/create-api-popup'
import ApiConfigurationPopUP from './components/api-configuration/api-configuration-popup'
import CustomFunctions from './components/customFunctions-configurations/CustomFunctions'
import {Link} from 'react-router-dom'
import GenerateProgression from '../workspace-configurations/components/settings/Generate-progression'
import {useParams} from 'react-router-dom'
import {getApplicationByWorkspaceIdApplicationId} from '../../../services/applicationService'
import {Dto, API, ApplicationModel} from '../../../models/application_model'
import {DatabaseConfigPopup} from './components/dataBase-configuration/DatabaseConfigPopup'
import ClipboardJS from 'clipboard';
import Relationships from '../workspace-configurations/components/Relationships'
import { useAuth0 } from '@auth0/auth0-react'

const ApplicationConfigurationPage = () => {
  const [dtos, setDtos] = useState<Array<Dto>>([{}, {}, {}, {}, {}, {}, {}, {}])
  const [loading, setLoading] = useState(true)
  //const [dtos, setDtos] = useState<Array<Dto>>([]);
  //const [loading, setLoading] = useState(true);
  const [showCreateApiModal, setshowCreateApiModal] = useState<boolean>(false)
  const [showApiConfigPopUp, setshowApiConfigPopUp] = useState<boolean>(false)
  const [showCustomApiConfigPopUp, setshowCustomApiConfigPopUp] = useState<boolean>(false)
  const [apis, setApis] = useState<Array<API>>([])
  const [allApis, setAllApis] = useState<Array<API>>([])
  const [customApis, setCustomApis] = useState<Array<API>>([])
  const [dAPI, setDAPI] = useState<API>({})
  const [upAPI, setUpAPI] = useState<API>({})
  const [applicationData, setApplicationData] = useState<ApplicationModel>({})
  const [showDatabaseConfigModal, setshowDatabaseConfigModal] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null);
  const copyButtonRef = useRef<HTMLButtonElement | null>(null);
  const {applicationId} = useParams()
  const {workspaceId} = useParams()
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    getApplicationByWorkspaceIdApplicationId(workspaceId || '', applicationId || '')
      .then((data) => {
        setApplicationData(data)
        setLoading(false) // Set loading to false after data is received
      })
      .catch((error) => {
        // Handle errors if needed
        console.error('Error fetching application:', error)
        setLoading(false) // Set loading to false on error
      })
  }, [])

  const updateTemporaryOnChangesApp = (tempApp:ApplicationModel) => {
    console.log('updateTemporaryOnChanges', tempApp)
    setApplicationData(tempApp)
  }

  useEffect(() => {
    if (applicationId != '') {
      console.log(applicationId, 'hu')
      const userId = user?.sub;

      // Fetch the workspaces when the component mounts
      getAllApiByAppId(userId || '',applicationId)
        .then((data) => {
          // Dispatch the action to set the data in Redux

          if (data) {
            setAllApis(data)
            setApis(data.filter((api) => api.crud != 'CUSTOMP'))
            setCustomApis(data.filter((api) => api.crud === 'CUSTOMP'))
          } else {
            setAllApis([])
          }
          console.log('apis', data)
          setLoading(false) // Set loading to false after data is received
        })
        .catch((error) => {
          // Handle errors if needed
          console.error('Error fetching applications:', error)
          setLoading(false) // Set loading to false on error
        })
    }
  }, [dtos, applicationData])

  useEffect(() => {
    if (applicationId != '') {
      // Check if appId is available
      // Fetch the workspaces when the component mounts
      getAllDtos(applicationData)
        .then((data) => {
          // Dispatch the action to set the data in Redux
          setDtos(data)
          console.log('dtos', data)
          setLoading(false) // Set loading to false after data is received
        })
        .catch((error) => {
          // Handle errors if needed
          console.error('Error fetching applications:', error)
          setLoading(false) // Set loading to false on error
        })
    }
  }, [applicationData])

  useEffect(() => {
    //--delete api from local

    if (dAPI.template == 'CUSTOM') {
      setCustomApis((prevApplications) =>
        prevApplications.filter((item) => item.apiId !== dAPI.apiId)
      )
    } else {
      setApis((prevApplications) => prevApplications.filter((item) => item.apiId !== dAPI.apiId))
    }
  }, [dAPI])

  useEffect(() => {
    if (upAPI.appId) {
      if (upAPI.template == 'CUSTOM') {
        // Check if upApi already exists in the array
        console.log('apis', customApis)
        const existingApiIndex = customApis.findIndex((api) => api.apiId === upAPI.apiId)

        console.log('index', existingApiIndex)

        if (existingApiIndex !== -1) {
          // Update the existing API
          const updatedApis = [...customApis]
          updatedApis[existingApiIndex] = upAPI
          console.log('Updated api', upAPI)

          console.log('Updated apis', updatedApis)
          setCustomApis(updatedApis)
          console.log('apis', updatedApis)
        } else {
          // Add the new upApi to the array
          setCustomApis((prevApis) => [...prevApis, upAPI])
        }
      } else {
        // Check if upApi already exists in the array
        console.log('apis', apis)
        const existingApiIndex = apis.findIndex((api) => api.apiId === upAPI.apiId)

        console.log('index', existingApiIndex)

        if (existingApiIndex !== -1) {
          // Update the existing API
          const updatedApis = [...apis]
          updatedApis[existingApiIndex] = upAPI
          console.log('Updated api', upAPI)

          console.log('Updated apis', updatedApis)
          setApis(updatedApis)
          console.log('apis', updatedApis)
        } else {
          // Add the new upApi to the array
          setApis((prevApis) => [...prevApis, upAPI])
        }
      }
    }
  }, [upAPI])

  const handleCopyButtonClick = () => {
    if (inputRef.current && copyButtonRef.current) {
      const clipboard = new ClipboardJS(copyButtonRef.current, {
        target: () => inputRef.current as HTMLInputElement,
      });

      clipboard.on('success', () => {
        // Handle success, e.g., show a success message
        alert('Text copied to clipboard');
      });

      clipboard.on('error', () => {
        // Handle error, e.g., show an error message
        alert('Failed to copy text to clipboard');
      });

      // Trigger the copy action programmatically
      inputRef.current.select();
      document.execCommand('copy');

      // Cleanup the clipboard instance
      clipboard.destroy();
    }
  };

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>
          <Link to='#' onClick={() => window.history.back()}>
            <button className='btn btn-sm btn-icon btn-hover-color-primary w-40px h-30px'>
              <i className='ki-duotone ki-black-left fs-2 text-gray-500'></i>
            </button>
          </Link>
          {applicationData.appName}{' '}
          <span className='fw-semibold my-2'>Application Configuration</span>
          {/* <span className='fs-6 text-gray-400 fw-bold ms-1'>Active</span> */}
        </h3>
      </div>

      <div className='d-flex flex-wrap flex-stack mb-6 align-items-start'>
        <div className='card mb-5 mb-xl-8 col-12 col-sm-12 col-md-3'>
          {/* <!--begin::Card body--> */}
          <div className='card-body pt-15'>
            {/* <!--begin::Summary--> */}
            <div className='d-flex flex-center flex-column mb-5'>
              {/* <!--begin::Avatar--> */}
              <div className='symbol symbol-100px symbol-circle mb-7'>
                <img src={toAbsoluteUrl('/media/svg/illustrations/easy/1.svg')} alt='image' />
              </div>
              {/* <!--end::Avatar--> */}
              {/* <!--begin::Name--> */}
              <a href='#' className='fs-3 text-gray-800 text-hover-primary fw-bold mb-1'>
                {applicationData.appName}
              </a>
              {/* <!--end::Name--> */}
              {/* <!--begin::Position--> */}
              <div className='fs-5 fw-semibold text-muted mb-6'>{applicationData.appId}</div>
              {/* <!--end::Position--> */}
              {/* <!--begin::Info--> */}
              <div className='d-flex flex-wrap flex-center'>
                {/* <!--begin::Stats--> */}
                <div className='border border-gray-300 border-dashed rounded py-3 px-3 mb-3'>
                  <div className='fs-4 fw-bold text-gray-700'>
                    <span className='w-75px me-3'>{applicationData.database}</span>
                    {applicationData.database === 'FIREBASE' ? (
                      <img
                        src={toAbsoluteUrl('/media/db/firebase-icon.png')}
                        className='w-25px rounded'
                        alt='Firebase'
                        onError={(e) => console.error('Error loading image:', e)}
                      />
                    ) : applicationData.database === 'SQL' ? (
                      <img
                        src={toAbsoluteUrl('/media/db/mysql-icon.png')}
                        className='w-25px rounded'
                        alt='MYSQL'
                        onError={(e) => console.error('Error loading image:', e)}
                      />
                    ) : applicationData.database === 'MONGO' ? (
                      <img
                        src={toAbsoluteUrl('/media/db/mongodb-icon.png')}
                        className='w-25px rounded'
                        alt='MongoDB'
                        onError={(e) => console.error('Error loading image:', e)}
                      />
                    ) : applicationData.database === 'POSTGRESSQL' ? (
                      <img
                        src={toAbsoluteUrl('/media/db/postgresql-icon.png')}
                        className='w-25px rounded'
                        alt='postgresql'
                        onError={(e) => console.error('Error loading image:', e)}
                      />
                    ) : (
                      // Add more conditions for other database types if needed
                      <img
                        src={toAbsoluteUrl('/media/db/default-icon.png')}
                        className='w-50px rounded'
                        alt='Default'
                        onError={(e) => console.error('Error loading image:', e)}
                      />
                    )}
                  </div>
                  <div className='fw-semibold text-muted'>Database</div>
                </div>

                {/* <!--end::Stats--> */}
                {/* <!--begin::Stats--> */}
                <div className='border border-gray-300 border-dashed rounded py-3 px-3 mx-4 mb-3'>
                  <div className='fs-4 fw-bold text-gray-700'>
                    <span className='w-50px'>130</span>
                    <i className='ki-duotone ki-arrow-down fs-3 text-danger'>
                      <span className='path1'></span>
                      <span className='path2'></span>
                    </i>
                  </div>
                  <div className='fw-semibold text-muted'>Tasks</div>
                </div>
                {/* <!--end::Stats--> */}
                {/* <!--begin::Stats--> */}
                {/* <div className='border border-gray-300 border-dashed rounded py-3 px-3 mb-3'>
                  <div className='fs-4 fw-bold text-gray-700'>
                    <span className='w-50px'>500</span>
                    <i className='ki-duotone ki-arrow-up fs-3 text-success'>
                      <span className='path1'></span>
                      <span className='path2'></span>
                    </i>
                  </div>
                  <div className='fw-semibold text-muted'>Hours</div>
                </div> */}
                {/* <!--end::Stats--> */}
              </div>
              {/* <!--end::Info--> */}
            </div>
            {/* <!--end::Summary--> */}
            {/* <!--begin::Details toggle--> */}
            <div className='d-flex flex-stack fs-4 py-3'>
              <div
                className='fw-bold rotate collapsible'
                data-bs-toggle='collapse'
                role='button'
                aria-expanded='false'
                aria-controls='kt_customer_view_details'
              >
                Database
                <span className='ms-2'>
                  <i className='ki-duotone ki-data fs-4 text-info'>
                    <i className='path1'></i>
                    <i className='path2'></i>
                    <i className='path3'></i>
                    <i className='path4'></i>
                    <i className='path5'></i>
                  </i>
                </span>
              </div>
              <DatabaseConfigPopup
                show={showDatabaseConfigModal}
                handleCloseModal={() => setshowDatabaseConfigModal(false)}
                applicationData={applicationData}
                updateTemporaryOnChangesApp={updateTemporaryOnChangesApp}
              />
              <span data-bs-toggle='tooltip' data-bs-trigger='hover' title='Edit customer details'>
                <a
                  href='#'
                  onClick={() => setshowDatabaseConfigModal(true)}
                  className='btn btn-sm btn-light-primary'
                  data-bs-target='#kt_modal_update_customer'
                >
                  Update
                </a>
              </span>
            </div>
            <div className='separator separator-dashed mb-7'></div>
            <div className='text-muted'>
              <div className='col-12'>
                <h4 className='text-gray-800 mb-0'>Your Database Link</h4>
                <p className='fs-6 fw-semibold text-gray-600 py-4 m-0'>
                  Setup your database url to connect to the database
                </p>
                <div className='d-flex'>
                  <input
                    ref={inputRef}
                    id='kt_referral_link_input'
                    type='text'
                    className='form-control form-control-solid me-3 flex-grow-1'
                    name='search'
                    value={applicationData.databaseUrl}
                  />
                  <button
                    ref={copyButtonRef}
                    id='kt_referral_program_link_copy_btn'
                    className='btn btn-light-primary btn-flex p-3 pe-2'
                    data-clipboard-target='#kt_referral_link_input'
                    onClick={handleCopyButtonClick}
                  >
                    <i className='ki-duotone ki-copy fs-2 btn-light-primary'>
                    </i>
                  </button>
                </div>
              </div>
              {/* {applicationData.databaseUrl} */}
            </div>
            {/* <div className='separator separator-dashed my-3'></div> */}
            {/* <div id='kt_customer_view_details' className='collapse show'>
              <div className='py-5 fs-6'>
                <div className='badge badge-light-info d-inline'>Premium user</div>
                <div className='fw-bold mt-5'>Account ID</div>
                <div className='text-gray-600'>ID-45453423</div>
                <div className='fw-bold mt-5'>Billing Email</div>
                <div className='text-gray-600'>
                  <a href='#' className='text-gray-600 text-hover-primary'>
                    info@keenthemes.com
                  </a>
                </div>
                <div className='fw-bold mt-5'>Billing Address</div>
                <div className='text-gray-600'>
                  101 Collin Street,
                  <br />
                  Melbourne 3000 VIC
                  <br />
                  Australia
                </div>
                <div className='fw-bold mt-5'>Language</div>
                <div className='text-gray-600'>English</div>
                <div className='fw-bold mt-5'>Upcoming Invoice</div>
                <div className='text-gray-600'>54238-8693</div>
                <div className='fw-bold mt-5'>Tax ID</div>
                <div className='text-gray-600'>TX-8674</div>
              </div>
            </div> */}
          </div>
        </div>
        {/* <!--end::Card--> */}
        <div className='flex-lg-row-fluid ms-lg-15 col-lg-7 col-sm-12 col-md-8'>
          {/* <!--begin:::Tabs--> */}
          <Tab.Container defaultActiveKey='modelConfiguration'>
            {/* <!--begin:::Tab navigation--> */}
            <Nav className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8'>
              {/* <!--begin:::Tab item--> */}
              {/* <Nav.Item>
                <Nav.Link eventKey='overview' className='text-active-primary pb-4'>
                  Overview
                </Nav.Link>
              </Nav.Item> */}
              {/* <!--end:::Tab item--> */}
              {/* <!--begin:::Tab item--> */}
              <Nav.Item>
                <Nav.Link eventKey='modelConfiguration' className='text-active-primary pb-4'>
                  Object's
                </Nav.Link>
              </Nav.Item>
              {/* <!--end:::Tab item--> */}

              {/* <!--begin:::Tab item--> */}
              <Nav.Item>
                <Nav.Link
                  eventKey='customFuncstionConfiguration'
                  className='text-active-primary pb-4'
                  data-kt-countup-tabs='true'
                >
                  Custom Functions
                </Nav.Link>
              </Nav.Item>
              {/* <!--end:::Tab item--> */}
              {/* <!--begin:::Tab item--> */}
              <Nav.Item>
                <Nav.Link
                  eventKey='apiConfigurations'
                  className='text-active-primary pb-4'
                  data-kt-countup-tabs='true'
                >
                  API Configurations
                </Nav.Link>
              </Nav.Item>
              {/* <!--end:::Tab item--> */}
              <Nav.Item>
                <Nav.Link eventKey='relationship' className='text-active-primary pb-4'>
                  Relationships
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='generateApp' className='text-active-primary pb-4'>
                  Generate App
                </Nav.Link>
              </Nav.Item>
            </Nav>
            {/* <!--end:::Tab navigation--> */}
            {/* <!--begin:::Tab content--> */}
            <Tab.Content>
              {/* <Tab.Pane eventKey='overview'>
                <div className='card pt-4 pb-5 mb-6 mb-xl-9'>
                  <div className='card-body pt-0'>
                    <div className='d-flex justify-content-between'>
                      <div>
                        <div
                          style={{
                            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${toAbsoluteUrl(
                              '/media/Generate/welcome.gif'
                            )})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                          }}
                        >
                          <h4
                            className='fw-semibold m-4 mt-9 text-gray-800'
                            style={{lineHeight: '1.8', textAlign: 'justify'}}
                          >
                            The <b> application configuration page</b> empowers users to customize
                            Data Transfer Objects (DTOs), incorporate custom functions, manage APIs,
                            and generate output seamlessly. This centralized hub ensures tailored
                            data structures, streamlined workflows, and efficient API communication,
                            all leading to a dynamic and personalized application experience.
                          </h4>
                        </div>
                      </div>
                      <div>
                        <img
                          src={toAbsoluteUrl('/media/Generate/welcome2.gif')}
                          className='w-375px me-4 rounded'
                          alt='ready to deploy'
                          onError={(e) => console.error('Error loading GIF:', e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane> */}
              {/* <!--end:::Tab pane--> */}
              <Tab.Pane eventKey='modelConfiguration'>
                <Dtos applicationData={applicationData} dtos={dtos} setDtos={setDtos} />
              </Tab.Pane>
              {/* <!--begin:::Tab pane--> */}
              {/* <!--begin:::Tab pane--> */}
              <Tab.Pane eventKey='apiConfigurations'>
                {/* Content for Statements tab */}
                <div className='card pt-4 mb-6 mb-xl-9'>
                  {/* <!--begin::Card header--> */}
                  <div className='card-header border-0'>
                    {/* <!--begin::Card title--> */}
                    <div className='card-title'>
                      <h2 className='fw-bold mb-0'>API's</h2>
                    </div>
                    {/* <!--end::Card title--> */}
                    {/* <!--begin::Card toolbar--> */}
                    <div className='card-toolbar'>
                      <CreateApiConfig
                        show={showCreateApiModal}
                        application={applicationData}
                        handleCloseModal={() => setshowCreateApiModal(false)}
                        dtos={dtos}
                        setUpApi={setUpAPI}
                      />
                      <a
                        href='#'
                        onClick={() => setshowCreateApiModal(true)}
                        className='btn btn-sm btn-flex btn-light-primary'
                        data-bs-toggle='modal'
                        data-bs-target='#kt_modal_new_card'
                      >
                        <i className='ki-duotone ki-plus-square fs-3'>
                          <span className='path1'></span>
                          <span className='path2'></span>
                          <span className='path3'></span>
                        </i>
                        Add API Configuration
                      </a>
                    </div>
                    {/* <!--end::Card toolbar--> */}
                  </div>
                  {/* <!--end::Card header--> */}
                  {/* <!--begin::Card body--> */}
                  {/*begin::Content*/}
                  <div className='content d-flex flex-column flex-column-fluid' id='kt_content'>
                    {/*begin::Container*/}
                    <div className='container-xxl' id='kt_content_container'>
                      {/*begin::Row*/}
                      <div className='row g-5 g-xl-10 mb-xl-10'>
                        {/*begin::Col*/}
                        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10'>
                          {/*begin::Card widget 16*/}
                          <div className='card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-center bg-primary border-0 h-md-50 mb-5 mb-xl-10'>
                            {/*begin::Header*/}
                            <div className='card-header pt-5'>
                              {/*begin::Title*/}
                              <div className='card-title d-flex flex-column'>
                                {/*begin::Amount*/}
                                <span className='fs-2hx fw-bold text-white me-2 lh-1 ls-n2'>
                                  {apis.length}
                                </span>
                                {/*end::Amount*/}
                                {/*begin::Subtitle*/}
                                <span className='text-white opacity-50 pt-1 fw-semibold fs-6'>
                                  API Configurations
                                </span>
                                {/*end::Subtitle*/}
                              </div>
                              {/*end::Title*/}
                            </div>
                            {/*end::Header*/}
                            {/*begin::Card body*/}
                            <div className='card-body d-flex align-items-end pt-0'>
                              <ApiConfigurationPopUP
                                showApiConfig={showApiConfigPopUp}
                                handleCloseModal={() => setshowApiConfigPopUp(false)}
                                apis={apis}
                                dtos={dtos}
                                application={applicationData}
                                setDAPI={setDAPI}
                                setUpAPI={setUpAPI}
                                isCustom={false}
                              />
                              <a
                                href='#'
                                onClick={() => setshowApiConfigPopUp(true)}
                                className='btn btn-light-primary mt-5'
                                data-bs-target='#kt_modal_new_card'
                              >
                                Configure API 's{' '}
                                <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
                              </a>
                              {/* <button type='button' className='btn btn-light-primary mt-5'>
                                Configure API 's{' '}
                                <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
                              </button> */}
                            </div>
                            {/*end::Card body*/}
                          </div>
                          {/*end::Card widget 16*/}
                          {/*begin::Card widget 16*/}
                          <div className='card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-center bg-danger border-0 h-md-50 mb-5 mb-xl-10'>
                            {/*begin::Header*/}
                            <div className='card-header pt-5'>
                              {/*begin::Title*/}
                              <div className='card-title d-flex flex-column'>
                                {/*begin::Amount*/}
                                <span className='fs-2hx fw-bold text-white me-2 lh-1 ls-n2'>
                                  {customApis.length}
                                </span>
                                {/*end::Amount*/}
                                {/*begin::Subtitle*/}
                                <span className='text-white opacity-50 pt-1 fw-semibold fs-6'>
                                  Custom API configurations
                                </span>
                                {/*end::Subtitle*/}
                              </div>
                              {/*end::Title*/}
                            </div>
                            {/*end::Header*/}
                            {/*begin::Card body*/}
                            <div className='card-body d-flex align-items-end pt-0'>
                              <ApiConfigurationPopUP
                                showApiConfig={showCustomApiConfigPopUp}
                                handleCloseModal={() => setshowCustomApiConfigPopUp(false)}
                                apis={customApis}
                                dtos={dtos}
                                application={applicationData}
                                setDAPI={setDAPI}
                                setUpAPI={setUpAPI}
                                isCustom={true}
                              />
                              <a
                                href='#'
                                onClick={() => setshowCustomApiConfigPopUp(true)}
                                className='btn btn-light-danger mt-5'
                                data-bs-target='#kt_modal_new_card'
                              >
                                Configure Custom API 's{' '}
                                <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
                              </a>
                              {/* <button type='button' className='btn btn-light-danger mt-5'>
                                Configure API 's{' '}
                                <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
                              </button> */}
                            </div>
                            {/*end::Card body*/}
                          </div>
                          {/*end::Card widget 16*/}
                        </div>
                        {/*end::Col*/}
                        {/*begin::Col*/}
                
                        {/*end::Col*/}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              {/* <!--end:::Tab pane--> */}
              {/* <!--end:::Tab pane--> */}
              <Tab.Pane eventKey='customFuncstionConfiguration'>
                <CustomFunctions applicationData={applicationData} dtos={dtos} />
              </Tab.Pane>
              <Tab.Pane eventKey='relationship'>
              <Relationships workspaceId={applicationData.workspaceId} appId={applicationData.appId} dtos={dtos}/>
              </Tab.Pane>
              <Tab.Pane eventKey='generateApp'>
                {/* <!--begin::Card--> */}
                <div className='card pt-4 mb-6 mb-xl-9'>
                  {/* <!--begin::Card header--> */}
                  {/* <div className='card-header border-0'>
                  </div> */}
                  {/* <!--end::Card header--> */}
                  {/* <!--begin::Card body--> */}
                  <div className='card-body pt-0'>
                    <div className='d-flex'>
                      <div
                        className='col-8'
                        style={{
                          backgroundImage: `url(${toAbsoluteUrl(
                            '/media/Generate/generatebg.gif'
                          )})`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                        }}
                      ></div>
                      <div className='col-4'>
                        <GenerateProgression />
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
          {/* <!--end:::Tab content--> */}
        </div>
      </div>
    </>
  )
}

export default ApplicationConfigurationPage
