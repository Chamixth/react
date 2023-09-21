import {Handle, Position} from 'reactflow'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

const handleStyle = {bottom: 48}
export function ApiAuthentication(props) {
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
      <Handle type='target' position={Position.Bottom} style={handleStyle} />

      <div className='card mb-5 mb-xl-8 bg-primary w-400px' style={{transform: 'scale(0.68)'}}>
        {/*begin::Body*/}
        <div className='card-body pb-0'>
          {/*begin::Header*/}
          <div className='d-flex align-items-center mb-1'>
            {/*begin::User*/}
            <div className='d-flex align-items-center justify-content-start flex-grow-1'>
              {/*begin::Avatar*/}
              <div className='symbol symbol-75px me-5'>
                <span className={`symbol-label ${getGatewayBgColor(gatewayData.gateway || '')}`}>
                  <img src={toAbsoluteUrl('/media/db/authentication.png')} className='mw-80px p-3' />
                </span>
              </div>
              {/*end::Avatar*/}
              {/*begin::Info*/}
              <div className='d-flex flex-column align-items-start'>
                <span className='fw-bold fs-3 pt-1 text-white'>Authentication</span>
                <span className='text-gray-400 fw-bold'>N/A</span>
                <div className='d-flex flex-column align-items-center pb-10'>
                  <Link to={`/workspaces/configure/${gatewayData?.workspaceId}/manage/gateway`}>
                    <a
                      href='#'
                      style={{background: 'rgba(255, 255, 255, 0.2)', color: 'white'}}
                      className='btn btn-primary btn-l mt-5'
                    >
                      Configure Authentication
                    </a>
                  </Link>{' '}
                </div>
              </div>
              {/*end::Info*/}
            </div>
            {/*end::User*/}
          </div>
        </div>
      </div>
    </>
  )
}
