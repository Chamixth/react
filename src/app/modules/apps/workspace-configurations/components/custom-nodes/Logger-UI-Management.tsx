import { Handle, Position } from 'reactflow'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
const handleStyle = { right: 105 };
export function LoggerUIManagement (){
  return (
    <>
        <Handle type="target" position={Position.Right} style={handleStyle}/>

        <div className="card h-md-100 w-600px bg-primary" dir="ltr" style={{transform: 'scale(0.44)'}}>
            {/* <!--begin::Body--> */}
            <div className="card-body d-flex flex-column flex-center">
                {/* <!--begin::Heading--> */}
                <div className="my-4">
                    {/* <!--begin::Title--> */}
                    <h1 className="fw-semibold text-grey-800 text-center lh-lg" style={{color: "white", fontSize:"25px"}}>Create interactive and
                    <br />
                    <span className="fw-bolder">engaging web experiences</span></h1>
                    {/* <!--end::Title--> */}
                    {/* <!--begin::Illustration--> */}
                    <div className="py-10 text-center">
                        <img src={toAbsoluteUrl('/media/svg/illustrations/easy/2.svg')} className="theme-light-show w-200px" alt="" />
                        <img src={toAbsoluteUrl('/media/svg/illustrations/easy/2-dark.svg')} className="theme-dark-show w-200px" alt="" />
                    </div>
                    {/* <!--end::Illustration--> */}
                </div>
                {/* <!--end::Heading--> */}
                {/* <!--begin::Links--> */}
                <div className="text-center mb-6">
                    {/* <!--begin::Link--> */}
                    <a className="btn btn-sm btn-light me-2 theme-light-show" style={{background: "rgba(255, 255, 255, 0.2)", color: "white", width:"270px", fontSize:"20px"}} data-bs-target="#kt_modal_new_address" data-bs-toggle="modal">Configure Logger</a>
                    {/* <a className="btn btn-sm btn-light me-2 theme-dark-show" style={{color: "white", width:"270px", fontSize:"20px"}} data-bs-target="#kt_modal_new_address" data-bs-toggle="modal">Configure Logger</a> */}
                    {/* <!--end::Link--> */}
                    {/* <!--begin::Link--> */}
                    {/* <a className="btn btn-sm" style={{background: "rgba(255, 255, 255, 0.2)", color: "white"}} href="../../demo4/dist/apps/user-management/users/view.html">Live Demo</a> */}
                    {/* <!--end::Link--> */}
                </div>
                {/* <!--end::Links--> */}
            </div>
            {/* <!--end::Body--> */}
        </div>
    </>
  )
}

