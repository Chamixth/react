import { Handle, Position } from "reactflow";
import { toAbsoluteUrl } from "../../../../../../_metronic/helpers";

const handleStyle = { top: 20 };

export function ApiLogger(){
    return (
        <>
        <Handle type="target" position={Position.Top} style={handleStyle}/>

        <div className='card mb-5 mb-xl-8 bg-primary w-400px' style={{ transform: 'scale(0.68)' }}>
        {/*begin::Body*/}
        <div className='card-body pb-0'>
          {/*begin::Header*/}
          <div className='d-flex align-items-center mb-1'>
            {/*begin::User*/}
            <div className='d-flex align-items-center justify-content-start flex-grow-1'>
              {/*begin::Avatar*/}
              <div className='symbol symbol-45px me-5'>
              <img
                src={toAbsoluteUrl('/media/db/logger.png')}
                className='h-70px w-70px me-1'
                alt=''/>              
              </div>
              {/*end::Avatar*/}
              {/*begin::Info*/}
              <div className='d-flex flex-column align-items-start'>
                <span className='fw-bold fs-3 pt-1 text-white'>Logger</span>
                <span className='text-gray-400 fw-bold'>N/A</span>
                <div className='d-flex flex-column align-items-center pb-10'>
                <a href="#" style={{background: "rgba(255, 255, 255, 0.2)", color: "white"}} className="btn btn-primary mt-5">Configure Logger</a>
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
