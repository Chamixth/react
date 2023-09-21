import {Handle, Position} from 'reactflow'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {ApplicationModel} from '../../../../../models/application_model'
import { Link } from 'react-router-dom'

const handleStyle = {bottom: 48}

export function ApplicationNode(props) {
  const {application} = props.data
  return (
    <>
      <Handle type='target' position={Position.Left} style={handleStyle} />
      <Handle
        type='source'
        position={Position.Right}
        id={application.appId?.toString() ?? ''}
        style={{right: 0}}
      />

      <div className='card mb-5 mb-xl-8 bg-primary w-280px' style={{transform: 'scale(0.68)'}}>
        {/*begin::Body*/}
        <div className='card-body pb-0'>
          {/*begin::Header*/}
          <div className='d-flex align-items-center mb-1'>
            {/*begin::User*/}
            <div className='d-flex align-items-center justify-content-center flex-grow-1'>
              {/*begin::Info*/}
              <div className='d-flex flex-column align-items-center'>
                <span className='fw-bold fs-2 pt-1 text-white'>{application.appName}</span>
                <span className='text-gray-400 fw-bold'>{application.appId}</span>
                <div className='d-flex flex-column align-items-center pb-10'>
                  <Link
                    to={`/workspaces/configure/${application?.workspaceId}/view/${application?.appId}`}
                  >
                    <a
                      href='#'
                      style={{background: 'rgba(255, 255, 255, 0.2)', color: 'white'}}
                      className='btn btn-primary btn-l mt-5'
                    >
                      Configure Application
                    </a>
                  </Link>
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
