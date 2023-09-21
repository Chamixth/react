import { Handle, Position } from "reactflow";
import { toAbsoluteUrl } from "../../../../../../_metronic/helpers";
import React, {FC, useState} from "react";
import {updateApplication} from "../../../../../services/applicationService";
import {ApplicationModel} from "../../../../../models/application_model";
import { CreateApplicationModal } from "../Application/Create-application/CreateApplicationPopup";


const handleStyle = { left: 20 };



export function CradApp() {



    return (

        <>
            <Handle type="target" position={Position.Right} style={handleStyle}/>

        </>
            )
}
