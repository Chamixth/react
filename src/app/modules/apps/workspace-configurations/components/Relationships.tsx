import React, {FC, useEffect, useState} from 'react'
import {CreateRelationshipModal} from './relationship-configurations/Create-relationship/CreateRelationships'
import {Dto, Relationship} from '../../../../models/application_model'
import {get} from 'http'
import {getAllDtosByWorkspaceId} from '../../../../services/dtoService'
import {deleteRelationship, getAllRelationships} from '../../../../services/relationshipService'
import Swal from 'sweetalert2'
import { useAuth0 } from '@auth0/auth0-react'

type Props = {
  workspaceId?: string
  appId?: string
  dtos: Dto[]
}

const Relationships: FC<Props> = ({workspaceId, appId, dtos}) => {
  const [showCreateRelationshipModal, setshowCreateRelationshipModal] = useState<boolean>(false)
  const [showUpdateRelationshipModal, setshowUpdateRelationshipModal] = useState<boolean>(false)
  const [relationships, setRelationships] = useState<Array<Relationship>>([])
  const [updateRelationship, setUpdateRelationship] = useState<Relationship>({})
  const [dRelationship, setDRelationship] = useState<Relationship>({})
  const [loading, setLoading] = useState(true)
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const userId = user?.sub;
    // Fetch the workspaces when the component mounts
    if (workspaceId && appId && userId) {
      getAllRelationships(workspaceId, appId, userId)
        .then((data) => {
          // Dispatch the action to set the data in Redux
          setRelationships(data)
          console.log('dtos', data)
          setLoading(false) // Set loading to false after data is received
        })
        .catch((error) => {
          // Handle errors if needed
          console.error('Error fetching applications:', error)
          setLoading(false) // Set loading to false on error
        })
    }
  }, [workspaceId, appId])

  useEffect(() => {
    //--delete application from local
    setRelationships((prevRelationship) =>
      prevRelationship.filter((relationship) => relationship.relationshipId !== dRelationship.relationshipId)
    )
  }, [dRelationship])

  const updateTemporaryOnChangesRelationship = (tempRelationship: Relationship) => {
    setRelationships((prevRelationship) => {
      if (!prevRelationship || prevRelationship.length === 0) {
        setUpdateRelationship(tempRelationship)
        return [tempRelationship]
      }
      const index = prevRelationship.findIndex((relationship) => relationship.relationshipId === tempRelationship.relationshipId)

      if (index !== -1) {
        const updatedRelationships = [...prevRelationship]
        updatedRelationships[index] = tempRelationship
        return updatedRelationships
      } else {
        return [...prevRelationship, tempRelationship]
      }
    })
    setUpdateRelationship(tempRelationship)
  }

  const handleDelete = (relationship: Relationship) => {
    Swal.fire({
      text: 'Are you sure you want to delete ' + relationship.relationshipId + ' ?',
      icon: 'warning',
      showCancelButton: !0,
      buttonsStyling: !1,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel',
      customClass: {
        confirmButton: 'btn fw-bold btn-danger',
        cancelButton: 'btn fw-bold btn-active-light-primary',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deletedRelationship = await deleteRelationship(relationship)
        if (deletedRelationship['operation'] == 'Success') {
          Swal.fire({
            icon: 'success',
            text: 'You have deleted ' + relationship.relationshipId + '!.',
            buttonsStyling: !1,
            confirmButtonText: 'Ok, got it!',
            customClass: {confirmButton: 'btn fw-bold btn-primary'},
          }).then(() => {
            setDRelationship(relationship)
          })
        } else {
          Swal.fire('Error!', 'There was an error while deleting the application.', 'error')
        }
      }
    })
  }

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>My Relationships</h3>

        <div className='d-flex flex-wrap my-2'>
          <CreateRelationshipModal
            show={showCreateRelationshipModal || showUpdateRelationshipModal}
            handleCloseModal={() => (setshowCreateRelationshipModal(false), setshowUpdateRelationshipModal(false))}
            workspaceId={workspaceId}
            appId={appId}
            dtos={dtos}
            updateTemporaryOnChangesRelationship={updateTemporaryOnChangesRelationship}
            relationship={updateRelationship}
            isUpdate={showUpdateRelationshipModal}
          />
          {/* <CreateRelationshipD 
            show={showCreateRelationshipModal}
            handleCloseModal={() => setshowCreateRelationshipModal(false)}
          /> */}
          <a
            href='#'
            onClick={() => setshowCreateRelationshipModal(true)}
            className='btn btn-primary btn-sm'
            data-bs-target='#kt_modal_create_project'
          >
            New Relationship
          </a>
        </div>
      </div>
      <div className='card mb-5 mb-xl-8 mt-8'>
        {/*begin::Body*/}
        <div className='card-body py-3 mt-8'>
          {/*begin::Table container*/}
          <div className='table-responsive'>
            {/*begin::Table*/}
            <table className='table align-middle gs-0 gy-4'>
              {/*begin::Table head*/}
              <thead>
                <tr className='fw-bold text-muted bg-light'>
                  <th className='ps-4 min-w-100px rounded-start'>Relationship Id</th>
                  <th className='min-w-100px'>Base Relationship</th>
                  <th className='min-w-100px'>Base Dto</th>
                  <th className='min-w-100px'>Secondary Relationship</th>
                  <th className='min-w-100px'>Secondary Dto</th>
                  {/* <th className='min-w-150px'>Status</th> */}
                  <th className='min-w-125px text-end rounded-end pe-4'>Actions</th>
                </tr>
              </thead>
              {/*end::Table head*/}
              {/*begin::Table body*/}
              <tbody>
                {relationships &&
                  relationships.map((relationship, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <div className='badge badge-light-primary fs-7 fw-normal ms-7'>
                            {relationship.relationshipId}
                          </div>
                        </td>
                        <td>
                          <div className='text-dark fw-normal text-hover-primary d-block mb-1 fs-6 ms-10'>
                            {relationship.baseRelationship}
                          </div>
                        </td>
                        <td>
                          <div className='text-dark fw-normal text-hover-primary d-block mb-1 fs-6'>
                            {dtos && dtos.map((dto, i) => {
                              if (dto.dtoId === relationship.baseDto) {
                                return dto.dtoName
                              }
                            })}
                          </div>
                        </td>
                        <td>
                          <div
                            className='text-dark fw-normal text-hover-primary d-block mb-1 fs-6 ms-10'
                          >
                            {relationship.secondaryRelationship}
                          </div>
                        </td>
                        <td>
                          <div className='text-dark fw-normal text-hover-primary d-block mb-1 fs-6'>
                          {dtos && dtos.map((dto, i) => {
                              if (dto.dtoId === relationship.secondaryDto) {
                                return dto.dtoName
                              }
                            })}
                          </div>
                        </td>
                        {/* <td>
                      <span className='badge badge-light-primary fs-7 fw-bold'>Approved</span>
                    </td> */}
                        <td className='text-end'>
                          {/* <a
                            href='#'
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <i className='ki-duotone ki-switch fs-2'>
                              <span className='path1' />
                              <span className='path2' />
                            </i>
                          </a> */}
                          <a
                            href='#'
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                            onClick={()=> (setshowUpdateRelationshipModal(true), setUpdateRelationship(relationship))}
                          >
                            <i className='ki-duotone ki-pencil fs-2'>
                              <span className='path1' />
                              <span className='path2' />
                            </i>
                          </a>
                          <a
                            href='#'
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                            onClick={() => handleDelete(relationship)}
                          >
                            <i className='ki-duotone ki-trash fs-2'>
                              <span className='path1' />
                              <span className='path2' />
                              <span className='path3' />
                              <span className='path4' />
                              <span className='path5' />
                            </i>
                          </a>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
              {/*end::Table body*/}
            </table>
            {/*end::Table*/}
          </div>
          {/*end::Table container*/}
        </div>
        {/*begin::Body*/}
      </div>
    </>
  )
}

export default Relationships
