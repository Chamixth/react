/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {ChangeEvent, useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {WorkspaceModel} from '../../../../../models/workspace_model'
import {GeneratorStruct} from '../../../../../models/application_model'
import {PropagateLoader} from 'react-spinners'
import {
  createFrontEnd,
  generateFrontEnd,
  getFrontendByWorkspaceId,
  updateFrontEnd,
  uploadImage,
} from '../../../../../services/frontendGenService'
import {KTIcon, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import { useAuth0 } from '@auth0/auth0-react'
import { ImageCropper } from './ImageCropper'

type Props = {
  workspaceData: WorkspaceModel
}

const FrontendDetails: React.FC<Props> = (props) => {
  //get gateway details
  const [frontendData, setFrontendData] = useState<GeneratorStruct>({})
  const [imageSuccess, setImageSuccess] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File>()

  const [frontEndConfigured, setFrontEndConfigured] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSuccessModel, setIsSuccessModel] = useState(false)
  const [isGateway, setIsGateway] = useState<string>()
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)
  const { user, isAuthenticated } = useAuth0();
  const [isAuthConfigured, setIsAuthConfigured] = useState(true)
  const [showCrop, setShowCrop] = useState(false)

  const fetchFrontEnd = async () => {
    console.log('new data', frontendData, 'workspace data aneee', props.workspaceData)
    setFrontendData((data) => {
      return {
        ...data,
        workspaceName: props.workspaceData.workspaceName,
        workspaceId: props.workspaceData.workspaceId,
        userId: props.workspaceData.userId,
      }
    })

    try {
      const data = await getFrontendByWorkspaceId(props.workspaceData.workspaceId || '',props.workspaceData.userId || '')

      if (data.theme != '') {
        setFrontendData(data)
        setSelectedImageUrl(data.url ? data.url : null)
        console.log('Recieved data', frontendData)
        setFrontEndConfigured(true)
      }
    } catch (error) {
      console.error('Error fetching frontend data:', error)
    }
  }

  //get gateway by workspace id
  useEffect(() => {
    setFrontendData({...frontendData, isGateway: false})
    fetchFrontEnd()
  }, [props.workspaceData.workspaceId])

  const validateFrontEnd = (): boolean => {
    if (!frontendData.theme) {
      console.log('theme nooo')
      return false
    }
    if (!frontendData.themeColor) {
      console.log('themeColor nooo')
      return false
    }
    if (!frontendData.envServerUrl) {
      console.log('envServerUrl nooo')
      return false
    }
    if (!frontendData.workspaceName) {
      console.log('workspaceName nooo')
      return false
    }
    if (frontendData.isGateway === undefined) {
      console.log('isGateway nooo')
      return false
    }
    return true
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Handle the selected file
      setShowCrop(true)
      setSelectedImage(file)
      setSelectedImageUrl(URL.createObjectURL(file)) // Set the selected image URL
      console.log('Selected file url:', file)
    }
  }

  const submitData = async () => {
    //--update check--
    if (frontEndConfigured) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const updatedFrontend = await updateFrontEnd(frontendData)
        if (updatedFrontend.workspaceId) {
          setIsSuccessModel(true)
        } else {
          setHasError(true)
        }
      } catch (error) {
        console.error('Error updating model:', error)
        setIsSuccessModel(false)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      const userId = user?.sub;
      frontendData.userId=userId
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const createdFrontEnd = await createFrontEnd(frontendData)
        console.log('created ui', createdFrontEnd)
        if (createdFrontEnd['operation'] === 'Success') {
          setIsSuccessModel(true)
          setFrontEndConfigured(true)
        } else {
          setHasError(true)
        }
      } catch (error) {
        console.error('Error creating model:', error)
        setIsSuccessModel(false)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const submit = async () => {
    setIsSubmitting(true)

    setFrontendData((data) => {
      return {
        ...data, 
        workspaceName: props.workspaceData.workspaceName,
        workspaceId: props.workspaceData.workspaceId,
        userId: props.workspaceData.userId,
      }
    })

    if (validateFrontEnd()) {
      console.log('submit ' + frontendData.workspaceName)

      //--image upload---
      if (selectedImageUrl){
        if (selectedImage) {
          //--image update---
          let formData = new FormData()
          formData.append('file', selectedImage)
  
          try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            const uploadedImage = await uploadImage(formData)
            if (uploadedImage['url']) {
  
              console.log("image response url - "+uploadedImage['url'])
              setFrontendData((data) => {
                return {
                  ...data,
                  url: uploadedImage['url'],
                }
              })
              setImageSuccess(true)
  
            }
          } catch (error) {
            setImageSuccess(true)
            console.error('Error uploading image:', error)
          }
        } else {
          submitData()
          console.error('No image selected')
        }
      } else {
        //--create new image--
        console.log("No image url")
        if (selectedImage) {
          let formData = new FormData()
          formData.append('file', selectedImage)
  
          try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            const uploadedImage = await uploadImage(formData)
            if (uploadedImage['url']) {
  
              console.log("image response url - "+uploadedImage['url'])
              setFrontendData((data) => {
                return {
                  ...data,
                  url: uploadedImage['url'],
                }
              })
              setImageSuccess(true)
  
            }
          } catch (error) {
            setImageSuccess(true)
            console.error('Error uploading image:', error)
          }
        } else {
          submitData()
          console.error('No image selected')
        }
      }

    } else {
      setIsSubmitting(false)
      Swal.fire({
        text: 'Please Configure the above Frontend Details',

        icon: 'warning',
        showCancelButton: !0,
        buttonsStyling: !1,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Close',
        customClass: {
          confirmButton: 'btn fw-bold btn-danger',
          cancelButton: 'btn fw-bold btn-active-light-primary',
        },
      })
    }
  }

  useEffect(() => {
    console.log('Updated frontendData.url:', frontendData.url);

    if (imageSuccess){
      //--push the frontend data to db--
      submitData()
      setSelectedImageUrl(frontendData.url?frontendData.url:"")
      setSelectedImage(undefined)
    }

  }, [frontendData.url]);

  const generate = async () => {
    setIsSubmitting(true)
    setIsGenerating(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const updatedFrontend = await generateFrontEnd(frontendData)
      if (updatedFrontend['gettingData'] == 'Success') {
        setIsSuccessModel(true)
      } else {
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
        setHasError(true)
      }
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
      console.error('Error generating model:', error)
      setIsSuccessModel(false)
    } finally {
      setIsSubmitting(false)
      setIsGenerating(false)
    }
    resetStates()
  }

  const resetStates = () => {
    setIsSubmitting(false)
    setIsSuccessModel(false)
    setHasError(false)
    setIsGenerating(false)
  }

  const removeImage = () =>{

    console.log("removed img")
    setSelectedImage(undefined)
    setSelectedImageUrl(null)
    setFrontendData((data) => {
      return {
        ...data,
        url: "",
      }
    })
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#gatewayused'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Frontend Configuration</h3>
        </div>
      </div>

      <div id='frontend' className='collapse show'>
        <div className='card-body border-top p-9'>
          {/* workspace name */}
          <div className='fv-row mb-9'>
            <label htmlFor='workspace name' className='form-label fs-6 fw-bolder mb-3'>
              Workspace Name
            </label>
            <input
              type='string'
              className='form-control form-control-lg form-control-solid '
              id='workspace name'
              placeholder='Workspace name'
              value={frontendData.workspaceName}
              disabled={true}
            />
          </div>

          <div className='fv-row mb-9'>
            <ImageCropper
            handleClose={()=>{setShowCrop(false)}}
            show={showCrop}
            selectedFile={selectedImageUrl || ''}
            setSelectedImage={setSelectedImage}
            setSelectedImageURL={setSelectedImageUrl}
            imageName={selectedImage?.name || 'cropped'}
            />
            {/*begin::Label*/}
            <label htmlFor='workspace name' className='form-label fs-6 fw-bolder mb-6'>
              Logo
            </label>
            {/*end::Label*/}
            {/*begin::Col*/}
            <div className='col-lg-8'>
              {/*begin::Image input*/}
              <div className='image-input image-input-outline'>
                {/* Existing avatar preview */}
                <div className='image-input-wrapper w-225px h-125px ' style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {selectedImageUrl ? (
                    <img
                      src={selectedImageUrl}
                      alt='Selected'
                      style={{maxWidth: '100%', maxHeight: '100%'}}
                    />
                  ) : (
                    <img
                      src={toAbsoluteUrl('/media/avatars/blank.png')}
                      alt='Default'
                      style={{maxWidth: '100%', maxHeight: '100%'}}
                    />
                  )}
                </div>
                {/*end::Preview existing avatar*/}
                {/*begin::Label*/}
                <label
                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                  data-kt-image-input-action='change'
                  data-bs-toggle='tooltip'
                  title='Change avatar'
                >
                  <i className='ki-outline ki-pencil fs-7' />
                  {/*begin::Inputs*/}
                  <input
                    type='file'
                    name='logo'
                    accept='.png, .jpg, .jpeg'
                    onChange={handleImageChange}
                  />
                  <input type='hidden' name='avatar_remove' />
                  {/*end::Inputs*/}
                </label>
                {/*end::Label*/}
                {/*begin::Cancel*/}
                <span
                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                  data-kt-image-input-action='cancel'
                  data-bs-toggle='tooltip'
                  title='Cancel avatar'
                >
                  <i className='ki-outline ki-cross fs-2' />
                </span>
                {/*end::Cancel*/}
                {/*begin::Remove*/}
                <span
                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                  data-kt-image-input-action='remove'
                  data-bs-toggle='tooltip'
                  title='Remove avatar'
                >
                  <i className='ki-outline ki-cross fs-2' onClick={removeImage}/>
                </span>
                {/*end::Remove*/}
              </div>
              {/*end::Image input*/}
              {/*begin::Hint*/}
              <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
              {/*end::Hint*/}
            </div>
            {/*end::Col*/}
          </div>

          <div className='fv-row mb-9'>
            <label className='form-label fs-6 fw-bolder mb-3'>Gateway Enabled</label>
            <select
              className='form-select form-select-solid'
              aria-label='is Gateway'
              value={frontendData.isGateway ? 'true' : 'false'}
              onChange={(e) => {
                const newGateway = e.target.value
                if (newGateway == 'true') {
                  // console.log(newGateway)
                  setFrontendData({...frontendData, isGateway: true})
                } else {
                  // console.log("data")
                  setFrontendData({...frontendData, isGateway: false})
                }
              }}
            >
              <option value='true'>True</option>
              <option value='false'>False</option>
            </select>
          </div>
          {/* theme */}
          <div className='fv-row mb-9'>
            <label className='form-label fs-6 fw-bolder mb-3'>Frontend Theme</label>
            <select
              className='form-select form-select-solid'
              aria-label='Select Theme'
              value={frontendData?.theme}
              onChange={(e) => {
                if (e.target.value != '-1') {
                  setFrontendData((data) => {
                    return {
                      ...data, // Spread the existing properties of data
                      theme: e.target.value, // Update the 'theme' property
                    }
                  })
                } else {
                  setFrontendData((data) => {
                    return {
                      ...data, // Spread the existing properties of data
                      theme: undefined, // Update the 'theme' property
                    }
                  })
                }

                // updateGateway(gatewayData)
              }}
            >
              <option value='-1'>Select Theme</option>
              <option value='apollo'>Apollo</option>
              <option value='atlantis'>Atlantis</option>
            </select>
          </div>

          {/* theme color */}
          <div className='fv-row mb-9'>
            <label className='form-label fs-6 fw-bolder mb-3'>Frontend Theme Color</label>
            <select
              className='form-select form-select-solid'
              aria-label='Select Theme Color'
              value={frontendData?.themeColor}
              onChange={(e) => {
                if (e.target.value != '-1') {
                  setFrontendData((data) => {
                    return {
                      ...data, // Spread the existing properties of data
                      themeColor: e.target.value, // Update the 'theme' property
                    }
                  })
                } else {
                  setFrontendData((data) => {
                    return {
                      ...data, // Spread the existing properties of data
                      themeColor: undefined, // Update the 'theme' property
                    }
                  })
                }
              }}
            >
              <option value='-1'>Select Theme Color</option>
              <option value='pink'>Pink</option>
              <option value='purple'>Purple</option>
            </select>
          </div>

          {/* env url */}
          <div className='fv-row mb-9'>
            <label htmlFor='Env server URL' className='form-label fs-6 fw-bolder mb-3'>
              Environment Server URL
            </label>
            <input
              type='string'
              className='form-control form-control-lg form-control-solid '
              id='Env server URL'
              placeholder='Enter env-server URL'
              value={frontendData.envServerUrl}
              onChange={(e) => {
                if (e.target.value != '') {
                  setFrontendData((data) => {
                    return {
                      ...data, // Spread the existing properties of data
                      envServerUrl: e.target.value, // Update the 'gateway' property
                    }
                  })
                } else {
                  setFrontendData((data) => {
                    return {
                      ...data, // Spread the existing properties of data
                      envServerUrl: undefined, // Update the 'gateway' property
                    }
                  })
                }
              }}
            />
          </div>

          {/*button*/}
          <div className='d-flex flex-sack justify-content-center pt-5'>
            {!isSuccessModel && !isSubmitting && (
              <div className=''>
                <button
                  type='button'
                  className='btn btn-lg btn-light-primary me-7'
                  onClick={submit}
                  disabled={isSubmitting}
                >
                  {frontEndConfigured ? 'Update Frontend' : 'Create Frontend'}
                </button>
                <button
                  type='button'
                  className='btn btn-lg btn-light-danger me-8'
                  disabled={!frontEndConfigured}
                  onClick={()=>{
                    if (isAuthConfigured){
                      generate()
                    }else {
                      Swal.fire({
                        text: 'Please configure an authentication before generating UI',
                
                        icon: 'warning',
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: 'Ok',
                        cancelButtonText: 'Close',
                        customClass: {
                          confirmButton: 'btn fw-bold btn-danger',
                          cancelButton: 'btn fw-bold btn-active-light-primary',
                        },
                      })
                    }
                  }}
                >
                  Generate Frontend
                </button>
              </div>
            )}
            {isSubmitting && (
              <div className='sweet-loading'>
                <div className='pb-10 pb-lg-15 text-center loading-text-gateway-config'>
                  {/*begin::Title*/}
                  <h5 className=' text-muted fs-7 fw-semibold mb-5'>
                    {isGenerating ? 'Generating Frontend' : 'Configuring FrontEnd'}
                    <span className='dot-one'> .</span>
                    <span className='dot-two'> .</span>
                    <span className='dot-three'> .</span>
                  </h5>
                  <PropagateLoader
                    color='#7239EA'
                    cssOverride={{}}
                    loading={true}
                    size={8}
                    speedMultiplier={0.75}
                  />
                </div>
              </div>
            )}
            {isSuccessModel && (
              <div>
                <button type='button' className='btn btn-lg btn-primary me-3' onClick={resetStates}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export {FrontendDetails}
