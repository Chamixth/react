/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {KTIcon, toAbsoluteUrl, useIllustrationsPath} from '../../../../../../../_metronic/helpers'
import {
  ApplicationModel,
  CustomFunction,
  CustomFunctionInput,
  Dto,
} from '../../../../../../models/application_model'
import {createDto, getAllDtos, updateDto} from '../../../../../../services/dtoService'
import TextareaAutocomplete from '@webscopeio/react-textarea-autocomplete'
import '@webscopeio/react-textarea-autocomplete/style.css' // Make sure to import the CSS
import {createCustomFunction} from '../../../../../../services/cbfgService'
import {PropagateLoader} from 'react-spinners'
import Select from 'react-select';
import { useAuth0 } from '@auth0/auth0-react'
import Swal from 'sweetalert2'

type Props = {
  show: boolean
  handleCloseModal: () => void
  applicationData: ApplicationModel
  isUpdate?: boolean
  dtos: Dto[]
  updateTemporaryOnChangesCFs?: any
  customFuntion: CustomFunction
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateCusFuncModal = ({
  show,
  handleCloseModal,
  applicationData,
  isUpdate,
  dtos,
  updateTemporaryOnChangesCFs,
  customFuntion,
}: Props) => {
  const [data, setData] = useState<CustomFunctionInput>({})
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedDto, setSelectedDto] = useState<number | null>(null);
  const [prompt, setPrompt] = useState<string>('')
  const [isSuccessModel, setIsSuccessModel] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dtoApplied, setDtoApplied] = useState<Array<Dto>>([])
  // Inside the component
  const Item = ({entity: {name}}) => <div>{`${name}`}</div>
  // Define the initial trigger object

  const [triggers, setTriggers] = useState({})
  const { user, isAuthenticated } = useAuth0();

  const updateData = (fieldsToUpdate: Partial<CustomFunctionInput>) => {

    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  useEffect(() => {
    if (isUpdate) {
      console.log(customFuntion)
      setSelectedDto(dtos.findIndex((dto) => dto.dtoName === customFuntion.dtoInputs?.dtoName))
      setPrompt(customFuntion.prompt || '')
      // console.log("prompt"+customFuntion.prompt)
    } else {
      setData({})
    }
  }, [isUpdate])

  useEffect(() => {
    // Fetch the workspaces when the component mounts
    getAllDtos(applicationData)
      .then((data) => {
        // Dispatch the action to set the data in Redux
        //setDtos(data)
        const customTriggers = {}

        // Create triggers and data providers for each DTO name
        data.forEach((dto) => {
          const triggerChar = dto.dtoName?.substring(0, 2).toLowerCase()
          console.log('Trigger Character:', triggerChar) // Add this line
          if (triggerChar) {
            customTriggers[triggerChar] = {
              dataProvider: (token) => {
                console.log('Token:', token) // Add this line
                const suggestions = data
                  .filter((dto) => dto.dtoName?.toLowerCase().startsWith(triggerChar))
                  .map((dto) => ({name: dto.dtoName}))
                console.log('Suggestions:', suggestions) // Add this line
                return suggestions
              },
              component: Item,
              output: (item, trigger) => item.name,
            }
          }
        })

        // Merge the custom triggers with the default trigger
        setTriggers((prevTriggers) => ({
          ...prevTriggers,
          ...customTriggers,
        }))
      })
      .catch((error) => {
        console.error('Error fetching DTO data:', error)
      })
  }, [applicationData])

  //reset states on close
  const resetStates = () => {
    setData({})
    setDtoApplied([])
    setSelectedDto(null)
    setPrompt('')
    setIsSubmitting(false)
    setIsSuccessModel(false)
    setHasError(false)
  }

  // Close the popup and reset states
  const handleClose = () => {
    handleCloseModal()
    setTimeout(resetStates, 1000)
  }

  function getIdsFromPrompts(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const inputValue = event.target.value
    updateData({Prompt: event.target.value})
    const matchingDtoObjects = dtos.filter(
      (dto) => dto.dtoName && inputValue.toLowerCase().includes(dto.dtoName.toLowerCase())
    )
    setDtoApplied(matchingDtoObjects)
  }
  const checkCusFuncValidation = (): boolean => {
    if (!data.Inputs?.dtoId || !data.Prompt) {
      return false
    }
    return true
  }
  const submit = async () => {
    if (!checkCusFuncValidation()) {
      setHasError(true)
      return
    } else {
      let newCustomFunction: CustomFunctionInput = data
      newCustomFunction.workspaceId = applicationData?.workspaceId
      newCustomFunction.appId = applicationData?.appId
      newCustomFunction.Models = dtoApplied
      setIsSubmitting(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        if (isUpdate) {
          console.log('update')
          newCustomFunction.functionId = customFuntion.functionId
          console.log('data', newCustomFunction)
          const updatedCustomFunction = await createCustomFunction(newCustomFunction)
          if (updatedCustomFunction.functionId !== '') {
            if (updateTemporaryOnChangesCFs) {
              updateTemporaryOnChangesCFs(updatedCustomFunction)
            }
            setIsSuccessModel(true)
          }else if (
            updatedCustomFunction['error'] ==
            'Couldnt generate the function properly. Retry or Change the prompt'
          ) {
            setIsEditMode(true)
          }
        } else {
          console.log('submit')
          const userId = user?.sub;
          newCustomFunction.userId=userId
          const createdCustomFunction = await createCustomFunction(newCustomFunction)
          if (createdCustomFunction.functionId !== '') {
            if (updateTemporaryOnChangesCFs) {
              console.log("mek tm ewwe eya"+createdCustomFunction.pcode)
              updateTemporaryOnChangesCFs(createdCustomFunction)
            }
            setIsSuccessModel(true)
          } else if (
            createdCustomFunction['error'] ==
            'Couldnt generate the function properly. Retry or Change the prompt'
          ) {
            setIsEditMode(true)
          }
        }
        setData({})
      } catch (error) {
        Swal.fire({
          text: 'Something wrong while generating. Please check the details again!',
          icon: 'warning',
          showCancelButton: !0,
          buttonsStyling: !1,
          confirmButtonText: 'Ok Sure',
          cancelButtonText: 'Close',
          customClass: {
            confirmButton: 'btn fw-bold btn-danger',
            cancelButton: 'btn fw-bold btn-active-light-primary',
          },
        })
        console.error('Error creating custom function:', error)
        setIsSuccessModel(false)
      } finally {
        setIsSubmitting(false)
      }
    }
  }


  const handleDtoChange = (selectedOption) => {
    setSelectedDto(selectedOption);
    if (selectedOption.value >= 0) {
      updateData({
        Inputs: {
          dtoName: dtos[selectedOption.value].dtoName || '',
          dtoId: dtos[selectedOption.value].dtoId || '',
        },
      });
    } else {
      updateData({
        Inputs: {
          dtoName: '',
          dtoId: '',
        },
      });
    }
  };

  const options = [
    ...dtos.map((dto, i) => ({
      value: i,
      label: dto.dtoName || '',
    })),
  ];

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-700px '
      backdrop='static'
      show={show}
      onHide={handleClose}
      //onEntered={loadStepper}
    >
      <div className='modal-header'>
        <h2>{isUpdate ? 'Re-generate Custom Function' : 'Create Custom Function'}</h2>
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
        {/* end::Close */}
      </div>
      <div className='modal-body py-lg-10 px-lg-10'>
        <div className='flex-row-fluid py-lg-5 px-lg-15'>
          {/*begin::Form */}
          <form className='mx-auto mw-600px w-100 ' noValidate>
            <div className='curent'>
              <div className='w-100'>
                <div className='pb-10 pb-lg-15 text-center'>
                  {/*begin::Title*/}
                  <h2 className='fw-bold text-dark '>Prompt a Custom Function </h2>
                  {/*end::Title*/}
                  {/*begin::Notice*/}
                  <div className='text-muted fw-semibold fs-6'>
                    Prompt the function you want to implement below.
                  </div>
                  {/*end::Notice*/}
                </div>
                {/*begin::Form Group */}
                {/*begin::Input group*/}
                <div className='d-flex flex-column mb-10 fv-row'>
                  {/*begin::Label*/}
                  <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                    <span className='required'>Base Input</span>
                    <span
                      className='ms-1'
                      data-bs-toggle='tooltip'
                      title='Specify a target priorty'
                    >
                      <i className='ki-outline ki-information-5 text-gray-500 fs-6' />
                    </span>
                  </label>
                  {/*end::Label*/}
                  {/*begin::Select*/}
                  {/* <select
                    onChange={(e) => {
                      setSelectedDto(parseInt(e.target.value))
                      if (parseInt(e.target.value) >= 0) {
                        updateData({
                          Inputs: {
                            dtoName: dtos[parseInt(e.target.value)].dtoName || '',
                            dtoId: dtos[parseInt(e.target.value)].dtoId || '',
                          },
                        })
                      } else {
                        updateData({
                          Inputs: {
                            dtoName: '',
                            dtoId: '',
                          },
                        })
                      }
                    }}
                    name='basedinput'
                    data-control='select2'
                    data-hide-search='true'
                    data-placeholder='Select a base modal...'
                    className='form-select form-select-solid'
                    value={selectedDto}
                  >
                    <option value={-1}>Select a base modal...</option>
                    {dtos.length > 0 &&
                      dtos.map((dto, i) => (
                        <>
                          <option value={i}>{dto.dtoName}</option>
                        </>
                      ))}
                  </select> */}
                  <Select
                    options={options}
                    onChange={handleDtoChange}
                    name='basedinput'
                    placeholder='Select a base modal...'
                    value={options.find(option => option.value === selectedDto)}
                    onInputChange={() => {}}
                    onMenuOpen={() => {}}
                    onMenuClose={() => {}}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: '#f4f1fe',
                        primary: '#753eea',
                      }})}
                  />
                  {/*end::Select*/}
                  {!selectedDto && hasError && (
                    <div className='fv-plugins-message-container'>
                      <div
                        data-field='basedinput'
                        data-validator='notEmpty'
                        className='fv-help-block'
                      >
                        Base Input Name is required
                      </div>
                    </div>
                  )}
                </div>
                {/*end::Input group*/}
                {/*begin::Input group*/}
                <div className='d-flex flex-column mb-6 fv-row'>
                  {/*begin::Label*/}
                  <label className='d-flex align-items-center fs-6 fw-semibold mb-2'>
                    <span className='required'>Prompt Your Function</span>
                    <span
                      className='ms-1'
                      data-bs-toggle='tooltip'
                      title='Specify a target priorty'
                    >
                      <i className='ki-outline ki-information-5 text-gray-500 fs-6' />
                    </span>
                  </label>
                  {/*end::Label*/}

                  <TextareaAutocomplete
                    className='form-control fs-5 form-control-solid rounded-3  '
                    placeholder='I want to create a function where .....'
                    rows={6}
                    onChange={(event) => {
                      setPrompt(event.target.value)
                      getIdsFromPrompts(event)
                    }}
                    loadingComponent={() => <span>Loading</span>}
                    trigger={triggers}
                    value={prompt}
                  />

                  {/*<textarea className="form-control form-control-solid rounded-3" placeholder='I want to create a function where .....' rows={6}></textarea>*/}
                </div>
                {/*end::Input group*/}
                {/*begin::Input group*/}

                {/*end::Input group*/}
              </div>
            </div>

            {dtoApplied.map((dto) => (
              <div className='badge badge-light-info d-inline me-3'>{dto.dtoName}</div>
            ))}
            <div className='text-center pb-10 '>
              {/*<img src={useIllustrationsPath('4.png')} alt="" className="mw-100 h-200px h-sm-275px" />*/}
            </div>

            <div className='d-flex flex-sack justify-content-center pt-5'>
              {!isSuccessModel && !isSubmitting && (
                <div className=''>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-danger me-8'
                    onClick={handleClose}
                    // disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-primary '
                    onClick={submit}
                    // disabled={isSubmitting}
                  >
                    {!isSubmitting && <>{isUpdate ? 'Re-generate' : 'Generate'}</>}
                    {/* 
                    {isSubmitting && (
                      <span className='indicatorprogress'>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                      </span>
                    )} */}
                  </button>
                </div>
              )}
              <div className='d-flex flex-sack justify-content-center py-5 '>
                <div className='sweet-loading'>
                  {isSubmitting && (
                    <div className='pb-10 pb-lg-15 text-center loading-text-gateway-config'>
                      {/*begin::Title*/}
                      <h5 className=' text-muted fs-7 fw-semibold mb-5'>
                        Generating a custom function
                        <span className='dot-one'> .</span>
                        <span className='dot-two'> .</span>
                        <span className='dot-three'> .</span>
                      </h5>
                      <PropagateLoader
                        color='#7239EA'
                        cssOverride={{}}
                        loading={isSubmitting}
                        size={8}
                        speedMultiplier={0.75}
                      />
                    </div>
                  )}
                </div>
              </div>
              {isSuccessModel && (
                <button
                  type='button'
                  className='btn btn-lg btn-light-primary me-3'
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Done
                </button>
              )}
            </div>
            {/* <!--begin::Illustration--> */}
            {/* <!--end::Illustration--> */}
          </form>
        </div>
      </div>
    </Modal>,
    modalsRoot
  )
}

export {CreateCusFuncModal}
