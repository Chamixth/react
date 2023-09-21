import React from 'react'
import { Handle, Position } from 'reactflow'

const handleStyle = { right: 210 };

export function  AppUIManagement ()  {
  return (
    <>
        <Handle type="target" position={Position.Right} style={handleStyle}/>
   
      <div >
        <div className="card border-0 h-md-100 w-900px bg-primary" style={{transform: 'scale(0.46)'}}>
            {/* <!--begin::Body--> */}
            <div className="card-body">
                {/* <!--begin::Row--> */}
                <div className="row align-items-center h-100 mb-5 my-3 mx-3">
                    {/* <!--begin::Col--> */}
                    <div className="col-7 ps-xl-13">
                        {/* <!--begin::Title--> */}
                        <div className="text-white mb-6 pt-6">
                            <span className="fs-2qx fw-bold">Design Mobile Application</span>
                        </div>
                        {/* <!--end::Title--> */}
                        {/* <!--begin::Text--> */}
                        <span className="fw-semibold text-white fs-2 mb-8 d-block opacity-75" >Create Innovative, user-friendly, scalable mobile apps.</span>
                        {/* <!--end::Text--> */}
                        {/* <!--begin::Items--> */}
                        <div className="d-flex align-items-center flex-wrap d-grid gap-2 mb-10 mb-xl-20">
                            {/* <!--begin::Item--> */}
                            <div className="d-flex align-items-center me-5 me-xl-13">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-50px symbol-circle me-3">
                                    <span className="symbol-label" style={{background: "rgba(255, 255, 255, 0.2)"}}>
                                        <i className="ki-outline ki-abstract-41 fs-1 text-white"></i>
                                    </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Info--> */}
                                <div className="text-white">
                                    <span className="fw-semibold d-block fs-5 opacity-75">Projects</span>
                                    <span className="fw-bold fs-4">Up to 500</span>
                                </div>
                                {/* <!--end::Info--> */}
                            </div>
                            {/* <!--end::Item--> */}
                            {/* <!--begin::Item--> */}
                            <div className="d-flex align-items-center">
                                {/* <!--begin::Symbol--> */}
                                <div className="symbol symbol-50px symbol-circle me-3">
                                    <span className="symbol-label" style={{background: "rgba(255, 255, 255, 0.2)"}}>
                                        <i className="ki-outline ki-abstract-26 fs-1 text-white"></i>
                                    </span>
                                </div>
                                {/* <!--end::Symbol--> */}
                                {/* <!--begin::Info--> */}
                                <div className="text-white">
                                    <span className="fw-semibold opacity-75 d-block fs-5">Tasks</span>
                                    <span className="fw-bold fs-4">Unlimited</span>
                                </div>
                                {/* <!--end::Info--> */}
                            </div>
                            {/* <!--end::Item--> */}
                        </div>
                        {/* <!--end::Items--> */}
                        {/* <!--begin::Action--> */}
                        <div className="d-flex flex-column d-grid gap-1">
                            {/* <!--begin::Link--> */}
                            <a className="btn btn-light me-2 theme-light-show" style={{background: "rgba(255, 255, 255, 0.2)", color: "white", width:"300px", fontSize:"20px"}} data-bs-target="#kt_modal_new_address" data-bs-toggle="modal">Configure UI</a>
                            {/* <a className="btn  btn-light me-2 theme-dark-show" style={{color: "white", width:"300px", fontSize:"20px"}} data-bs-target="#kt_modal_new_address" data-bs-toggle="modal">Configure UI</a> */}
                            {/* <!--end::Link--> */}
                            {/* <!--begin::Link--> */}
                            {/* <a className="btn btn-sm " style={{background: "rgba(255, 255, 255, 0.2)",}} href="../../demo4/dist/apps/user-management/users/view.html">Live Demo</a> */}
                            {/* <!--end::Link--> */}
                        </div>
                        {/* <!--end::Action--> */}
                    </div>
                    {/* <!--end::Col--> */}
                    {/* <!--begin::Col--> */}
                    <div className="col-5 pt-10">
                        {/* <!--begin::Illustration--> */}
                        <div className="bgi-no-repeat bgi-size-contain bgi-position-x-end h-225px" style={{backgroundImage:"url(../../../../media/svg/illustrations/easy/5.svg)"}}></div>
                        {/* <!--end::Illustration--> */}
                    </div>
                    {/* <!--end::Col--> */}
                </div>
                {/* <!--end::Row--> */}
            </div>
            {/* <!--end::Body--> */}
        </div>
        </div>
      {/*<Handle type="source" position={Position.Left} id="b" style={handleStyle} />*/}
   
    </>
  )
}
