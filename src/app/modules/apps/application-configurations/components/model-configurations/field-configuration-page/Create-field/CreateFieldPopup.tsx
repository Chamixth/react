/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {KTIcon} from '../../../../../../../../_metronic/helpers'
import {updateDtoField} from '../../../../../../../services/dtoService'
import {Dto, Field} from '../../../../../../../models/application_model'
import Select from 'react-select'

type Props = {
  showCreatefield: boolean
  handleCloseModal: () => void
  isUpdate: boolean
  dto?: Dto
  index?: number
}

const modalsRoot = document.getElementById('root-modals ') || document.body

const CreateFieldModal = ({showCreatefield, handleCloseModal, dto, isUpdate, index}: Props) => {
  const [data, setData] = useState<any>({})
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSuccessModel, setIsSuccessModel] = useState(false)
  const [dataType, setDataType] = useState<string>()
  const [inputType, setInputType] = useState<string>()
  const [isEncrypt, setIsEncypt] = useState<string>()
  const [isRequire, setIsRequire] = useState<string>()
  const [isUnique, setIsUnique] = useState<string>()

  const updateData = (fieldsToUpdate: Partial<any>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  useEffect(() => {
    if (isUpdate && index !== undefined && dto && dto.field && dto.field[index]) {
      if (dto.field[index].isEncrypted === true) {
        setIsEncypt('true')
      } else {
        setIsEncypt('false')
      }
      if (dto.field[index].isUnique === true) {
        setIsUnique('true')
      } else {
        setIsUnique('false')
      }
      if (dto.field[index].isRequired === true) {
        setIsRequire('true')
      } else {
        setIsRequire('false')
      }
      setData(dto.field[index])
      setDataType(dto.field[index].dataType)
      setInputType(dto.field[index].inputType)
      // setIsEncypt(dto.field[index].isEncrypted)
      // setIsUnique(dto.field[index].isUnique)
      setIsEditMode(true)
    } // Example of fetching data from an API
    else {
      setData({})
      setIsEditMode(false)
    }
  }, [isUpdate])

  const checkFieldValidation = (): boolean => {
    if (!data.name || !dataType || !inputType || !isEncrypt || !isUnique) {
      return false
    }
    return true
  }

  //reset states on close
  const resetStates = () => {
    setData({})
    setIsSubmitting(false)
    setIsSuccessModel(false)
    setHasError(false)
  }

  const handleClose = () => {
    handleCloseModal()
    setTimeout(resetStates, 1000)
  }

  //submit dto fields
  const submit = async (index) => {
    if (!checkFieldValidation()) {
      setHasError(true)
      return
    } else {
      if (isUpdate) {
        try {
          setIsSubmitting(true)
          const booleanIsEncrypted = isEncrypt === 'True' ? true : false
          const booleanIsUnique = isUnique === 'True' ? true : false
          const booleanIsRequired = isRequire === 'True' ? true : false
          const updatedBooleanData = {
            ...data,
            isEncrypted: booleanIsEncrypted,
            isUnique: booleanIsUnique,
            isRequired: booleanIsRequired,
          }
          dto?.field?.splice(index, 1, updatedBooleanData)
          await new Promise((resolve) => setTimeout(resolve, 2000))
          const updateField = await updateDtoField(
            dto?.field,
            dto?.workspaceId,
            dto?.appId,
            dto?.dtoId
          )
          if (updateField['operation'] === 'Success') {
            setIsSuccessModel(true)
          }
        } catch (error) {
          console.error('Error creating model:', error)
          setIsSuccessModel(false)
        } finally {
          setIsSubmitting(false)
        }
      } else {
        const booleanIsEncrypted = isEncrypt === 'True' ? true : false
        const booleanIsUnique = isUnique === 'True' ? true : false
        const booleanIsRequired = isRequire === 'True' ? true : false
        const updatedBooleanData = {
          ...data,
          isEncrypted: booleanIsEncrypted,
          isUnique: booleanIsUnique,
          isRequired: booleanIsRequired,
        }
        dto?.field?.push(updatedBooleanData)

        setIsSubmitting(true)
        try {
          // data.thumbImg=await getRandomPhoto().then((photo)=>{
          //   return photo.urls.thumb
          //   })

          await new Promise((resolve) => setTimeout(resolve, 2000))

          const createField = await updateDtoField(
            dto?.field,
            dto?.workspaceId,
            dto?.appId,
            dto?.dtoId
          )
          if (createField['operation'] === 'Success') {
            setIsSuccessModel(true)
          }

          setData({})
        } catch (error) {
          console.error('Error creating model:', error)
          setIsSuccessModel(false)
        } finally {
          setIsSubmitting(false)
        }
      }
    }
  }

  return createPortal(
    <Modal
      id='kt_modal_create_field'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-700px '
      backdrop='static'
      show={showCreatefield}
      onHide={handleClose}
      //onEntered={loadStepper}
    >
      {/* <!--begin::Modal content--> */}
      <div className='modal-content'>
        {/* <!--begin::Modal header--> */}
        <div className='modal-header'>
          {/* <!--begin::Modal title--> */}
          {isUpdate ? <h2>Update Field</h2> : <h2>Add New Field</h2>}
          {/* <!--end::Modal title--> */}
          {/* <!--begin::Close--> */}
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTIcon className='fs-1' iconName='cross' />
          </div>
          {/* <!--end::Close--> */}
        </div>
        {/* <!--end::Modal header--> */}
        {/* <!--begin::Modal body--> */}
        <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
          {/* <!--begin::Form--> */}
          <form id='kt_modal_new_card_form' className='form' action='#'>
            {/* <!--begin::Input group--> */}
            <div className='row mb-10'>
              {/* <!--begin::Col--> */}
              <div className='col-md-12 fv-row'>
                {/* <!--begin::Row--> */}
                <div className='row fv-row'>
                  {/* <!--begin::Col--> */}
                  <div className='col-6'>
                    {/* <!--begin::Label--> */}
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span className='required'>Name of the field</span>
                      <span
                        className='ms-1'
                        data-bs-toggle='tooltip'
                        title="Specify a card holder's name"
                      >
                        <i className='ki-duotone ki-information-5 text-gray-500 fs-6'>
                          <span className='path1'></span>
                          <span className='path2'></span>
                          <span className='path3'></span>
                        </i>
                      </span>
                    </label>
                    {/* <!--end::Label--> */}
                    <input
                      type='text'
                      className='form-control form-control-solid'
                      placeholder='ex - customerId'
                      name='field-name'
                      value={data?.name}
                      onChange={(e) => updateData({name: e.target.value})}
                    />
                    {!data.name && hasError && (
                      <div className='fv-plugins-message-container'>
                        <div
                          data-field='field-name'
                          data-validator='notEmpty'
                          className='fv-help-block'
                        >
                          field Name is required
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='col-6'>
                    {/* <!--begin::Label--> */}
                    <label className='required fs-6 fw-semibold form-label mb-2'>Is Required</label>
                    {/* <!--end::Label--> */}
                    <Select
                      name='is-required'
                      instanceId='is-required-select'
                      options={[
                        {value: 'True', label: 'Required'},
                        {value: 'False', label: 'Not required'},
                      ]}
                      value={{
                        value: isRequire,
                        label: isRequire === undefined ? 'Required/ Not required' : isRequire,
                      }}
                      components={{IndicatorSeparator: () => null}}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          padding: '0.390rem 0.7rem',
                          border: 'none',
                          borderRadius: '0.625rem',
                          backgroundColor: '#f9f9f9', // Change this to the desired color
                        }),
                      }}
                      isSearchable={false}
                      // placeholder='Select a data type'
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: '#f4f1fe',
                          primary: '#753eea',
                        },
                      })}
                      onChange={(selectedOption) => {
                        const selectedValue = selectedOption ? selectedOption.value : undefined
                        setIsRequire(selectedValue)
                        updateData({isRequired: selectedValue})
                      }}
                    />
                    {isRequire === undefined && hasError && (
                      <div className='fv-plugins-message-container'>
                        <div
                          data-field='data-type'
                          data-validator='notEmpty'
                          className='fv-help-block'
                        >
                          Data Type is required
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <!--end::Input group--> */}
            {/* <!--begin::Input group--> */}
            <div className='row mb-10'>
              {/* <!--begin::Col--> */}
              <div className='col-md-12 fv-row'>
                {/* <!--begin::Row--> */}
                <div className='row fv-row'>
                  {/* <!--begin::Col--> */}
                  <div className='col-6'>
                    {/* <!--begin::Label--> */}
                    <label className='required fs-6 fw-semibold form-label mb-2'>Data Type</label>
                    {/* <!--end::Label--> */}
                    {/* <select
                      name='data-type'
                      className='form-select form-select-solid'
                      data-control='select2'
                      data-hide-search='true'
                      data-placeholder='Data Type'
                      value={dataType}
                      onChange={(e) => {
                        setDataType(e.target.value)
                        if (e.target.value === "noData") {
                          // console.log("no data")
                          updateData({dataType: undefined})
                        }else{
                          // console.log("data")
                          updateData({dataType: e.target.value})
                        }
                      }}
                    >
                      <option value='noData'>Select a data type</option>
                      <option value='Float64'>Float</option>
                      <option value='String'>String</option>
                      <option value='Int'>Int</option>
                      <option value='Bool'>Bool</option>
                    </select> */}
                    <Select
                      name='data-type'
                      instanceId='data-type-select'
                      options={[
                        {value: 'Float64', label: 'Float'},
                        {value: 'String', label: 'String'},
                        {value: 'Int', label: 'Int'},
                        {value: 'Bool', label: 'Bool'},
                      ]}
                      value={{
                        value: dataType,
                        label: dataType === undefined ? 'Select a data type' : dataType,
                      }}
                      components={{IndicatorSeparator: () => null}}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          padding: '0.390rem 0.7rem',
                          border: 'none',
                          borderRadius: '0.625rem',
                          backgroundColor: '#f9f9f9', // Change this to the desired color
                        }),
                      }}
                      isSearchable={false}
                      // placeholder='Select a data type'
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: '#f4f1fe',
                          primary: '#753eea',
                        },
                      })}
                      onChange={(selectedOption) => {
                        const selectedValue = selectedOption ? selectedOption.value : undefined
                        setDataType(selectedValue)
                        updateData({dataType: selectedValue})
                      }}
                    />
                    {dataType === undefined && hasError && (
                      <div className='fv-plugins-message-container'>
                        <div
                          data-field='data-type'
                          data-validator='notEmpty'
                          className='fv-help-block'
                        >
                          Data Type is required
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <!--end::Col--> */}
                  {/* <!--begin::Col--> */}
                  <div className='col-6'>
                    {/* <!--begin::Label--> */}
                    <label className='required fs-6 fw-semibold form-label mb-2'>Input Type</label>
                    {/* <!--end::Label--> */}
                    {/* <select
                      name='input-type'
                      className='form-select form-select-solid'
                      data-control='select2'
                      data-hide-search='true'
                      data-placeholder='Input Type'
                      value={inputType}
                      onChange={(e) => {
                        setInputType(e.target.value)
                        if (e.target.value === 'noData') {
                          // console.log("no data")
                          updateData({inputType: undefined})
                        } else {
                          // console.log("data")
                          updateData({inputType: e.target.value})
                        }
                      }}
                    >
                      <option value='noData'>Select a input type</option>
                      <option value='text'>text</option>
                      <option value='number'>number</option>
                      <option value='date'>date</option>
                      <option value='mobileNo'>mobileNo</option>
                      <option value='email'>email</option>
                      <option value='password'>password</option>
                      <option value='currency'>currency</option>
                      <option value='file'>file</option>
                      <option value='gender'>gender</option>
                      <option value='True/False'>True/False</option>
                      <option value='dropdown'>dropdown</option>
                      <option value='multiselect'>multiselect</option>
                      <option value='checkbox'>checkbox</option>
                      <option value='radio'>radio</option>
                      <option value='url'>url</option>
                      <option value='textArea'>Text area</option>
                      <option value='other'>other</option>
                    </select> */}
                    <Select
                      name='input-type'
                      instanceId='input-type-select'
                      options={[
                        {value: 'text', label: 'Text'},
                        {value: 'number', label: 'Number'},
                        {value: 'date', label: 'Date'},
                        {value: 'mobileNo', label: 'MobileNo'},
                        {value: 'email', label: 'Email'},
                        {value: 'password', label: 'Password'},
                        {value: 'currency', label: 'Currency'},
                        {value: 'file', label: 'File'},
                        {value: 'gender', label: 'Gender'},
                        {value: 'true/False', label: 'True/False'},
                        {value: 'dropdown', label: 'Dropdown'},
                        {value: 'multiselect', label: 'Multiselect'},
                        {value: 'checkbox', label: 'Checkbox'},
                        {value: 'radio', label: 'Radio'},
                        {value: 'url', label: 'Url'},
                        {value: 'textarea', label: 'Textarea'},
                        {value: 'other', label: 'Other'},
                      ]}
                      value={{
                        value: inputType,
                        label: inputType === undefined ? 'Select a input type' : inputType,
                      }}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          padding: '0.390rem 0.7rem',
                          border: 'none',
                          borderRadius: '0.625rem',
                          backgroundColor: '#f9f9f9', // Change this to the desired color
                        }),
                      }}
                      components={{IndicatorSeparator: () => null}}
                      isSearchable={false}
                      // placeholder='Select a input type'
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: '#f4f1fe',
                          primary: '#753eea',
                        },
                      })}
                      onChange={(selectedOption) => {
                        const selectedValue = selectedOption ? selectedOption.value : undefined
                        setInputType(selectedValue)
                        updateData({inputType: selectedValue})
                      }}
                    />
                    {inputType === undefined && hasError && (
                      <div className='fv-plugins-message-container'>
                        <div
                          data-field='input-type'
                          data-validator='notEmpty'
                          className='fv-help-block'
                        >
                          Input Type is required
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <!--end::Col--> */}
                </div>
                {/* <!--end::Row--> */}
              </div>
              {/* <!--end::Col--> */}
              {/* <!--end::Col--> */}
            </div>
            <div className='row mb-10'>
              {/* <!--begin::Col--> */}
              <div className='col-md-12 fv-row'>
                {/* <!--begin::Row--> */}
                <div className='row fv-row'>
                  {/* <!--begin::Col--> */}
                  <div className='col-6'>
                    {/* <!--begin::Label--> */}
                    <label className='required fs-6 fw-semibold form-label mb-2'>
                      Is Encrypted
                    </label>
                    {/* <!--end::Label--> */}
                    {/* <select
                      name='is-encrypted'
                      className='form-select form-select-solid'
                      data-control='select2'
                      data-hide-search='true'
                      data-placeholder='Is Encrypted'
                      value={isEncrypt}
                      onChange={(e) => {
                        setIsEncypt(e.target.value)
                        if (e.target.value === 'noData') {
                          // console.log("no data")
                          updateData({isEncrypted: undefined})
                        } else {
                          // console.log("data")
                          updateData({isEncrypted: e.target.value})
                        }
                      }}
                    >
                      <option value='noData'>Encrypted/ Not encrypted</option>
                      <option value='True'>Encrypted</option>
                      <option value='False'>Not Encrypted</option>
                    </select> */}
                    <Select
                      name='is-encrypted'
                      instanceId='is-encrypted-select'
                      options={[
                        {value: 'True', label: 'Encrypted'},
                        {value: 'False', label: 'Not encrypted'},
                      ]}
                      value={{
                        value: isEncrypt,
                        label: isEncrypt === undefined ? 'Encrypted/ Not encrypted' : isEncrypt,
                      }}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          padding: '0.390rem 0.7rem',
                          border: 'none',
                          borderRadius: '0.625rem',
                          backgroundColor: '#f9f9f9', // Change this to the desired color
                        }),
                      }}
                      components={{IndicatorSeparator: () => null}}
                      isSearchable={false}
                      // placeholder='Select a input type'
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: '#f4f1fe',
                          primary: '#753eea',
                        },
                      })}
                      onChange={(selectedOption) => {
                        const selectedValue = selectedOption ? selectedOption.value : undefined
                        setIsEncypt(selectedValue)
                        updateData({isEncrypt: selectedValue})
                      }}
                    />
                    {isEncrypt === undefined && hasError && (
                      <div className='fv-plugins-message-container'>
                        <div
                          data-field='is-encrypted'
                          data-validator='notEmpty'
                          className='fv-help-block'
                        >
                          Is Encrypted is required
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <!--end::Col--> */}
                  {/* <!--begin::Col--> */}
                  <div className='col-6'>
                    {/* <!--begin::Label--> */}
                    <label className='required fs-6 fw-semibold form-label mb-2'>Is Unique</label>
                    {/* <!--end::Label--> */}
                    {/* <select
                      name='is-unique'
                      className='form-select form-select-solid'
                      data-control='select2'
                      data-hide-search='true'
                      data-placeholder='Is Unique'
                      value={isUnique}
                      onChange={(e) => {
                        setIsUnique(e.target.value)
                        if (e.target.value === 'noData') {
                          // console.log("no data")
                          updateData({isUnique: undefined})
                        } else {
                          // console.log("data")
                          updateData({isUnique: e.target.value})
                        }
                      }}
                    >
                      <option value='noData'>Unique/ Not unique</option>
                      <option value='True'>Unique</option>
                      <option value='False'>Not unique</option>
                    </select> */}
                    <Select
                      name='is-unique'
                      instanceId='is-unique-select'
                      options={[
                        {value: 'True', label: 'Unique'},
                        {value: 'False', label: 'Not Unique'},
                      ]}
                      value={{
                        value: isUnique,
                        label: isUnique === undefined ? 'Unique/ Not unique' : isUnique,
                      }}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          padding: '0.390rem 0.7rem',
                          border: 'none',
                          borderRadius: '0.625rem',
                          backgroundColor: '#f9f9f9', // Change this to the desired color
                        }),
                      }}
                      components={{IndicatorSeparator: () => null}}
                      isSearchable={false}
                      // placeholder='Select a input type'
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: '#f4f1fe',
                          primary: '#753eea',
                        },
                      })}
                      onChange={(selectedOption) => {
                        const selectedValue = selectedOption ? selectedOption.value : undefined
                        setIsUnique(selectedValue)
                        updateData({isUnique: selectedValue})
                      }}
                    />
                    {isUnique === undefined && hasError && (
                      <div className='fv-plugins-message-container'>
                        <div
                          data-field='is-unique'
                          data-validator='notEmpty'
                          className='fv-help-block'
                        >
                          Is Unique is required
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <!--end::Col--> */}
                </div>
                {/* <!--end::Row--> */}
              </div>
              {/* <!--end::Col--> */}
              {/* <!--end::Col--> */}
            </div>
            {/* <!--end::Input group--> */}
            {/* <!--begin::Input group--> */}

            {/* <!--end::Input group--> */}

            {/* <!--begin::Actions--> */}
            <div className='text-center pt-15'>
              {!isSuccessModel && (
                <div className='me-2'>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-danger me-3'
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Discard
                  </button>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-primary me-3'
                    onClick={() => submit(isEditMode ? index : null)}
                    disabled={isSubmitting}
                  >
                    {!isSubmitting && <>{isUpdate ? 'Update field' : 'Create field'}</>}

                    {isSubmitting && (
                      <span className='indicatorprogress'>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                      </span>
                    )}
                  </button>
                </div>
              )}
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
            {/* <!--end::Actions--> */}
          </form>
          {/* <!--end::Form--> */}
        </div>
        {/* <!--end::Modal body--> */}
      </div>
      {/* <!--end::Modal content--> */}
    </Modal>,
    modalsRoot
  )
}

export {CreateFieldModal}
