import {Handle, Position} from 'reactflow'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Gateway} from '../../../../../models/gateway_model'
import {Link} from 'react-router-dom'

export function ApiGateway(props) {
  const {gatewayData} = props.data

  const getImageUrl = (gatewayType: string) => {
    switch (gatewayType) {
      case 'TYK':
        return toAbsoluteUrl('/media/stock/gateways/Tyk.png')
      case 'WSO2':
        return toAbsoluteUrl('/media/stock/gateways/WSO2.png')
      case 'KONG':
        return toAbsoluteUrl('/media/stock/gateways/Kong.png')
      case 'EVOGATE':
        return toAbsoluteUrl('/media/stock/gateways/Evogate.png')
      default:
        return toAbsoluteUrl('/media/db/anyType.png')
    }
  }

  const getGatewayBgColor = (gatewayType: string) => {
  switch (gatewayType) {
    case 'TYK':
      return 'bg-light-primary'
    case 'WSO2':
      return 'bg-light-danger'
    case 'KONG':
      return 'bg-light-success'
    case 'EVOGATE':
      return 'bg-light-warning'
    default:
      return 'bg-light-info'
  }
}

  return (
    <>
      <Handle type='source' position={Position.Left} id='a' style={{left: 43}} />
      <Handle type='source' position={Position.Top} id='b' style={{top: 94}} />
      <Handle type='source' position={Position.Bottom} id='c' style={{bottom: 118}} />
      <Handle type='source' position={Position.Right} id='d' style={{right: 43}} />
      <div className='card card-xl-stretch mb-xl-8 w-400px' style={{transform: 'scale(0.70)'}}>
        {/*begin::Body*/}
        <div className='card-body p-0'>
          {/*begin::Header*/}
          <div className='px-9 pt-7 card-rounded w-100 bg-primary'>
            {/*begin::Heading*/}
            <div className='d-flex flex-stack'>
              <h3 className='m-0 text-white fw-bold fs-4'>
                {gatewayData.gateway ? gatewayData.gateway : 'No'} Gateway
              </h3>
              <div className='ms-1'>
                {/*begin::Menu*/}
                <button
                  type='button'
                  className='btn btn-sm btn-icon btn-color-white btn-active-white border-0 me-n3'
                  data-kt-menu-trigger='click'
                  data-kt-menu-placement='bottom-end'
                >
                  <i className='ki-outline ki-category fs-6' />
                </button>
                {/*begin::Menu 3*/}
                <div
                  className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-3'
                  data-kt-menu='true'
                >
                  {/*begin::Heading*/}
                  <div className='menu-item px-3'>
                    <div className='menu-content text-muted pb-2 px-3 fs-7 text-uppercase'>
                      Payments
                    </div>
                  </div>
                  {/*end::Heading*/}
                  {/*begin::Menu item*/}
                  <div className='menu-item px-3'>
                    <a href='#' className='menu-link px-3'>
                      Create Invoice
                    </a>
                  </div>
                  {/*end::Menu item*/}
                  {/*begin::Menu item*/}
                  <div className='menu-item px-3'>
                    <a href='#' className='menu-link flex-stack px-3'>
                      Create Payment
                      <span
                        className='ms-2'
                        data-bs-toggle='tooltip'
                        title='Specify a target name for future usage and reference'
                      >
                        <i className='ki-outline ki-information fs-6' />
                      </span>
                    </a>
                  </div>
                  {/*end::Menu item*/}
                  {/*begin::Menu item*/}
                  <div className='menu-item px-3'>
                    <a href='#' className='menu-link px-3'>
                      Generate Bill
                    </a>
                  </div>
                  {/*end::Menu item*/}
                  {/*begin::Menu item*/}
                  <div
                    className='menu-item px-3'
                    data-kt-menu-trigger='hover'
                    data-kt-menu-placement='right-end'
                  >
                    <a href='#' className='menu-link px-3'>
                      <span className='menu-title'>Subscription</span>
                      <span className='menu-arrow' />
                    </a>
                    {/*begin::Menu sub*/}
                    <div className='menu-sub menu-sub-dropdown w-175px py-4'>
                      {/*begin::Menu item*/}
                      <div className='menu-item px-3'>
                        <a href='#' className='menu-link px-3'>
                          Plans
                        </a>
                      </div>
                      {/*end::Menu item*/}
                      {/*begin::Menu item*/}
                      <div className='menu-item px-3'>
                        <a href='#' className='menu-link px-3'>
                          Billing
                        </a>
                      </div>
                      {/*end::Menu item*/}
                      {/*begin::Menu item*/}
                      <div className='menu-item px-3'>
                        <a href='#' className='menu-link px-3'>
                          Statements
                        </a>
                      </div>
                      {/*end::Menu item*/}
                      {/*begin::Menu separator*/}
                      <div className='separator my-2' />
                      {/*end::Menu separator*/}
                      {/*begin::Menu item*/}
                      <div className='menu-item px-3'>
                        <div className='menu-content px-3'>
                          {/*begin::Switch*/}
                          <label className='form-check form-switch form-check-custom form-check-solid'>
                            {/*begin::Input*/}
                            <input
                              className='form-check-input w-30px h-20px'
                              type='checkbox'
                              defaultValue={1}
                              defaultChecked={true}
                              name='notifications'
                            />
                            {/*end::Input*/}
                            {/*end::Label*/}
                            <span className='form-check-label text-muted fs-6'>Recuring</span>
                            {/*end::Label*/}
                          </label>
                          {/*end::Switch*/}
                        </div>
                      </div>
                      {/*end::Menu item*/}
                    </div>
                    {/*end::Menu sub*/}
                  </div>
                  {/*end::Menu item*/}
                  {/*begin::Menu item*/}
                  <div className='menu-item px-3 my-1'>
                    <a href='#' className='menu-link px-3'>
                      Settings
                    </a>
                  </div>
                  {/*end::Menu item*/}
                </div>
                {/*end::Menu 3*/}
                {/*end::Menu*/}
              </div>
            </div>
            {/*end::Heading*/}
            {/*begin::Balance*/}
            <div className='d-flex flex-column align-items-center pt-8'>
            <div className='symbol symbol-75px me-5'>
                  <span
                    className={`symbol-label ${getGatewayBgColor(gatewayData.gateway || '')}`}>
                    <img
                      src={getImageUrl(gatewayData.gateway || '')}
                      alt='Gateway Icon'
                      className='mw-100 p-3'
                    />
                  </span>
              </div>
            </div>
            <div className='d-flex text-center flex-column text-white pt-8'>
              <span className='fw-bold fs-3 pt-1'>
                {gatewayData.gateway ? gatewayData.gateway : 'No'} API Gateway
              </span>
              <span className='text-gray-300 fw-semibold fs-7'>
                {gatewayData.gatewayType ? gatewayData.gatewayType : 'No gateway type'}
              </span>
            </div>
            {/*end::Balance*/}
            {/*begin::Items*/}
            <div className='bg-body border card-rounded mx-3 my-5 px-6 py-9 bg-primary'>
              {/*begin::Item*/}
              <div className='d-flex align-items-center mb-6'>
                {/*begin::Symbol*/}
                <div className='symbol symbol-45px w-40px me-5'>
                  <span className='symbol-label' style={{background: 'rgba(255, 255, 255, 0.2)'}}>
                    <i className='ki-outline ki-compass fs-1 text-white' />
                  </span>
                </div>
                {/*end::Symbol*/}
                {/*begin::Description*/}
                <div className='d-flex align-items-center flex-wrap w-100'>
                  {/*begin::Title*/}
                  <div className='mb-1 pe-3 flex-grow-1'>
                    <a href='#' className='fs-5 text-white text-hover-primary fw-bold'>
                      Sales
                    </a>
                    <div className='text-gray-300 fw-semibold fs-7'>100 Regions</div>
                  </div>
                  {/*end::Title*/}
                  {/*begin::Label*/}
                  <div className='d-flex align-items-center'>
                    <div className='fw-bold fs-5 text-white pe-1'>$2,5b</div>
                    <i className='ki-outline ki-arrow-up fs-5 text-success ms-1' />
                  </div>
                  {/*end::Label*/}
                </div>
                {/*end::Description*/}
              </div>
              {/*end::Item*/}
              {/*begin::Item*/}
              <div className='d-flex align-items-center mb-6'>
                {/*begin::Symbol*/}
                <div className='symbol symbol-45px w-40px me-5'>
                  <span className='symbol-label' style={{background: 'rgba(255, 255, 255, 0.2)'}}>
                    <i className='ki-outline ki-element-11 fs-1 text-white' />
                  </span>
                </div>
                {/*end::Symbol*/}
                {/*begin::Description*/}
                <div className='d-flex align-items-center flex-wrap w-100'>
                  {/*begin::Title*/}
                  <div className='mb-1 pe-3 flex-grow-1'>
                    <a href='#' className='fs-5 text-white text-hover-primary fw-bold'>
                      Revenue
                    </a>
                    <div className='text-gray-300 fw-semibold fs-7'>Quarter 2/3</div>
                  </div>
                  {/*end::Title*/}
                  {/*begin::Label*/}
                  <div className='d-flex align-items-center'>
                    <div className='fw-bold fs-5 text-white pe-1'>$1,7b</div>
                    <i className='ki-outline ki-arrow-down fs-5 text-danger ms-1' />
                  </div>
                  {/*end::Label*/}
                </div>
                {/*end::Description*/}
              </div>
              {/*end::Item*/}
              {/*begin::Item*/}
              <div className='d-flex align-items-center mb-6'>
                {/*begin::Symbol*/}
                <div className='symbol symbol-45px w-40px me-5'>
                  <span className='symbol-label' style={{background: 'rgba(255, 255, 255, 0.2)'}}>
                    <i className='ki-outline ki-graph-up fs-1 text-white' />
                  </span>
                </div>
                {/*end::Symbol*/}
                {/*begin::Description*/}
                <div className='d-flex align-items-center flex-wrap w-100'>
                  {/*begin::Title*/}
                  <div className='mb-1 pe-3 flex-grow-1'>
                    <a href='#' className='fs-5 text-white text-hover-primary fw-bold'>
                      Growth
                    </a>
                    <div className='text-gray-300 fw-semibold fs-7'>80% Rate</div>
                  </div>
                  {/*end::Title*/}
                  {/*begin::Label*/}
                  <div className='d-flex align-items-center'>
                    <div className='fw-bold fs-5 text-white pe-1'>$8,8m</div>
                    <i className='ki-outline ki-arrow-up fs-5 text-success ms-1' />
                  </div>
                  {/*end::Label*/}
                </div>
                {/*end::Description*/}
              </div>
              {/*end::Item*/}
              {/*begin::Item*/}
              <div className='d-flex align-items-center'>
                {/*begin::Symbol*/}
                <div className='symbol symbol-45px w-40px me-5'>
                  <span className='symbol-label' style={{background: 'rgba(255, 255, 255, 0.2)'}}>
                    <i className='ki-outline ki-document fs-1 text-white' />
                  </span>
                </div>
                {/*end::Symbol*/}
                {/*begin::Description*/}
                <div className='d-flex align-items-center flex-wrap w-100'>
                  {/*begin::Title*/}
                  <div className='mb-1 pe-3 flex-grow-1'>
                    <a href='#' className='fs-5 text-white text-hover-primary fw-bold'>
                      Dispute
                    </a>
                    <div className='text-gray-300 fw-semibold fs-7'>3090 Refunds</div>
                  </div>
                  {/*end::Title*/}
                  {/*begin::Label*/}
                  <div className='d-flex align-items-center'>
                    <div className='fw-bold fs-5 text-white pe-1'>$270m</div>
                    <i className='ki-outline ki-arrow-down fs-5 text-danger ms-1' />
                  </div>
                  {/*end::Label*/}
                </div>
                {/*end::Description*/}
              </div>
              {/*end::Item*/}
            </div>
            {/*end::Items*/}
            <div className='d-flex flex-column align-items-center pb-10'>
              <Link to={`/workspaces/configure/${gatewayData?.workspaceId}/manage/gateway`}>
                <a
                  href='#'
                  style={{background: 'rgba(255, 255, 255, 0.2)', color: 'white'}}
                  className='btn btn-primary btn-l mt-5'
                >
                  Configure Gateway
                </a>
              </Link>{' '}
            </div>
          </div>
          {/*end::Header*/}
        </div>
        {/*end::Body*/}
      </div>
    </>
  )
}
