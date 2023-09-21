import {Handle, Position} from 'reactflow'
import { useDbPath} from '../../../../../../_metronic/helpers'

const handleStyle = {left:0}

export function ApplicationDatabaseNode(props) {
  const {application} = props.data
  return (
    <>
      <Handle type='target' position={Position.Left} style={handleStyle}  />

      <div className='card mb-5 mb-xl-8 w-200px bg-primary' style={{transform: 'scale(0.68)'}}>
        {/*begin::Body*/}
        <div className='card-body pb-5'>
          {/*begin::Header*/}
          <div className='d-flex flex-center align-items-center mb-1'>
            {/*begin::Info*/}
            <div className='d-flex flex-column align-items-center'>
              {/*begin::Symbol*/}
              <div className='symbol symbol-45px w-40px me-3'>
                <span className='symbol-label bg-light-warning'>
                  <img src={useDbPath(application.database.toLowerCase()+'-icon.png')} alt='' className='mh-40px p-2' />
                  </span>
              </div>
              {/*end::Symbol*/}
              <span className='fw-bold fs-3 pt-1 text-white'>{application.database}</span>
              <span className='text-gray-400 fw-bold'>{application.appId}</span>
            </div>

            {/*end::Info*/}
          </div>
        </div>
      </div>
    </>
  )
}
