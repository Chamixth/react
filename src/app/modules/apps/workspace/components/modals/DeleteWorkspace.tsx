import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';

import { WorkspacePopup } from './configs/WorkspacePopup';
import { SuccessPopup } from './configs/SuccessPopup';
import { KTIcon } from '../../../../../../_metronic/helpers';
import { WorkspaceModel } from '../../../../../models/workspace_model';
import { createWorkspace } from '../../../../../services/workspaceService';
import { Link } from 'react-router-dom';

type Props = {
  show: boolean;
  handleCloseModal: () => void;
  initialData?: WorkspaceModel;
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const DeleteWorkspaceModal = ({ show, handleCloseModal, initialData }: Props) => {
  const [data, setData] = useState<WorkspaceModel>({});
  const [isEditMode, setIsEditMode] = useState(false);

  // Function to update workspace data
  const updateData = (fieldsToUpdate: Partial<WorkspaceModel>) => {
    const updatedData = { ...data, ...fieldsToUpdate };
    setData(updatedData);
  };

  // Determine if it's an edit or create mode
  useEffect(() => {
    if (initialData) {
      // If initialData exists, it's an edit mode
      setIsEditMode(true);
      setData(initialData);
    } else {
      // If initialData is not provided, it's a create mode
      setIsEditMode(false);
      setData({});
    }
  }, [initialData]);

  // Reset states on modal close
  const resetStates = () => {
    setData({});
  };

  // Close the popup and reset states
  const handleClose = () => {
    handleCloseModal();
    setTimeout(resetStates, 1000);
  };



   return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-700px '
      backdrop='static'
      show={show}
      onHide={handleClose}
    >
      <div className="alert alert-dismissible bg-light-danger d-flex flex-center flex-column py-10 m-0 px-10 px-lg-20 ">
        <button type="button" className="position-absolute top-0 end-0 m-2 btn btn-icon " onClick={handleClose} data-bs-dismiss="alert">
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTIcon className='fs-1 m-8' iconName='cross' />
          </div>
        </button>

        <span className="svg-icon svg-icon-5tx svg-icon-danger mb-5">...</span>

        <div className="text-center">
          <h5 className="fw-bolder fs-1 mb-5">Delete {initialData?.workspaceName} Workspace</h5>

          <div className="separator separator-dashed border-danger opacity-25 mb-5"></div>

          <div className="mb-9">
            You are proceeding to delete <strong>{initialData?.workspaceName}</strong> from your workspaces.<br/>
            Please note that your <a href="#" className="fw-bolder me-1">applications</a> will be deleted from this operation.
          </div>
          <div className="d-flex flex-center flex-wrap">
            <a href="#"  onClick={handleClose} className="btn btn-outline btn-outline-danger btn-active-danger m-2">Cancel</a>
            <a href="#" className="btn btn-danger m-2">Ok, Proceed</a>
          </div>
        </div>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { DeleteWorkspaceModal };