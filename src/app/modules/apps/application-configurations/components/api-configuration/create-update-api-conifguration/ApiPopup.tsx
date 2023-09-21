/* eslint-disable jsx-a11y/anchor-is-valid */

import {useEffect, useState} from 'react'
import {API, Dto} from '../../../../../../models/application_model'

type Props = {
  data: API
  dtos: Dto[]
  updateData: (fieldsToUpdate: Partial<API>) => void
  hasError: boolean
  isEdit?: boolean
  isCustom?:boolean
}

const ApiPopUp = ({data, dtos, updateData, hasError, isEdit, isCustom}: Props) => {
  const [crudType, setCrudType] = useState('')
  const [isCreate, setIsCreate] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isGet, setIsGet] = useState(false)
  const [isFindAll, setIsFindAll] = useState(false)
  const [selectedBaseDto, setSelectedBaseDto] = useState<number>(-1)
  const [selectedSecDto, setSelectedSecDto] = useState<number>(-1)
  const [isAcive, setIsActive] = useState<boolean>(false)
  const [isLimited, setIsLimited] = useState<boolean>(false)
  const [isBlocked, setIsBlocked] = useState<boolean>(false)

  useEffect(() => {
    if (isEdit) {
      console.log('this is an edit')
      console.log(data)

      setSelectedBaseDto(dtos.findIndex((dto) => dto.dtoName === data.baseDto))
      setSelectedSecDto(dtos.findIndex((dto) => dto.dtoName === data.secondaryDto))
      setIsActive(data.active ? true : false)
      setIsLimited(data.limited ? true : false)
      setIsBlocked(data.blocked ? true : false)

      switch (data.crud) {
        case 'CREATE':
          setIsCreate(true)
          setIsGet(false)
          setIsDelete(false)
          setIsUpdate(false)
          break
        case 'FIND':
          setCrud(2)
          break
        case 'UPDATE':
          setCrud(3)
          break
        case 'DELETE':
          setCrud(4)
          break
        case 'FINDALL':
          setCrud(5)
          break
        default:
          break
      }
    } else {
      console.log('this is an create')
      setCrud(1)
    }
  }, [isEdit])

  useEffect(() => {
    updateData({crud: crudType})
  }, [crudType])

  const setCrud = (value: number) => {
    switch (value) {
      case 1:
        setCrudType('CREATE')
        setIsCreate(!isCreate)
        setIsGet(false)
        setIsDelete(false)
        setIsUpdate(false)
        setIsFindAll(false)
        break
      case 2:
        setCrudType('FIND')
        setIsGet(!isGet)
        setIsDelete(false)
        setIsUpdate(false)
        setIsCreate(false)
        setIsFindAll(false)
        break
      case 3:
        setCrudType('UPDATE')
        setIsUpdate(!isUpdate)
        setIsGet(false)
        setIsDelete(false)
        setIsCreate(false)
        setIsFindAll(false)
        break
      case 4:
        setCrudType('DELETE')
        setIsDelete(!isDelete)
        setIsGet(false)
        setIsUpdate(false)
        setIsCreate(false)
        setIsFindAll(false)
        break
      case 5:
        setCrudType('FINDALL')
        setIsFindAll(!isFindAll)
        setIsDelete(false)
        setIsGet(false)
        setIsUpdate(false)
        setIsCreate(false)
        break
      default:
        setIsCreate(!isCreate)
        setIsGet(false)
        setIsDelete(false)
        setIsUpdate(false)
        break
    }
  }

  return (
    <div className='curent'>
      <div className='w-100'>
        <div className='pb-10 pb-lg-15'>
          {/*begin::Title*/}
          <h2 className='fw-bold text-dark'>API Info</h2>
          {/*end::Title*/}
          {/*begin::Notice*/}
          <div className='text-muted fw-semibold fs-6'>
            If you need more info, please check out &nbsp;
            <a href='#' className='link-primary fw-bold'>
              Help Page
            </a>
            .
          </div>
          {/*end::Notice*/}
        </div>
        {/*begin::Form Group */}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>API Name</span>
            <span className='ms-1' data-bs-toggle='tooltip' title='Specify a name for API'>
              <i className='ki-outline ki-information-5 text-gray-500 fs-6' />
            </span>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='workspacename'
            placeholder=''
            value={data.apiName}
            onChange={(e) =>
              updateData({
                apiName: e.target.value,
              })
            }
          />
          {!data.apiName && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='workspacename' data-validator='notEmpty' className='fv-help-block'>
                workspace name is required
              </div>
            </div>
          )}
          {/*begin::Input group*/}
        </div>
        <div className='mb-10'>
          {/*begin::Heading*/}
          <div className='mb-3'>
            {/*begin::Label*/}
            <label className='d-flex align-items-center fs-5 fw-semibold'>
              <span className='required'>Specify Your API Method</span>
              <span
                className='ms-1'
                data-bs-toggle='tooltip'
                title='Your billing numbers will be calculated based on your API method'
              >
                <i className='ki-outline ki-information-5 text-gray-500 fs-6' />
              </span>
            </label>
            {/*end::Label*/}
            {/*begin::Description*/}
            <div className='fs-7 fw-semibold text-muted'>
              If you need more info, please check budget planning
            </div>
            {/*end::Description*/}
          </div>
          {/*end::Heading*/}
          {/*begin::Row*/}
          {!isCustom? 
          <>
          <div className='fv-row'>
            {/*begin::Radio group*/}

            <div
              className='btn-group w-100'
              data-kt-buttons='true'
              data-kt-buttons-target='[data-kt-button]'
            >
              {/*begin::Radio*/}
              <label
                className={
                  isCreate
                    ? 'btn btn-outline btn-active-success btn-color-muted active'
                    : 'btn btn-outline btn-active-success btn-color-muted'
                }
                data-kt-button='true'
              >
                {/*begin::Input*/}
                <input
                  className='btn-check'
                  type='radio'
                  name='create'
                  defaultValue={1}
                  onClick={(e) => {
                    setCrud(1)
                  }}
                />
                {/*end::Input*/}
                Create
              </label>
              {/*end::Radio*/}
              {/*begin::Radio*/}
              <label
                className={
                  isGet
                    ? 'btn btn-outline btn-active-success btn-color-muted active'
                    : 'btn btn-outline btn-active-success btn-color-muted'
                }
                data-kt-button='true'
              >
                {/*begin::Input*/}
                <input
                  className='btn-check'
                  type='radio'
                  name='find'
                  defaultValue={2}
                  onClick={(e) => {
                    setCrud(2)
                  }}
                />
                {/*end::Input*/}
                Find
              </label>
              {/*end::Radio*/}
              {/*begin::Radio*/}
              <label
                className={
                  isUpdate
                    ? 'btn btn-outline btn-active-success btn-color-muted active'
                    : 'btn btn-outline btn-active-success btn-color-muted'
                }
                data-kt-button='true'
              >
                {/*begin::Input*/}
                <input
                  className='btn-check'
                  type='radio'
                  name='update'
                  defaultValue={3}
                  onClick={(e) => {
                    setCrud(3)
                  }}
                />
                {/*end::Input*/}
                Update
              </label>
              {/*end::Radio*/}
              {/*begin::Radio*/}
              <label
                className={
                  isDelete
                    ? 'btn btn-outline btn-active-success btn-color-muted active'
                    : 'btn btn-outline btn-active-success btn-color-muted'
                }
                data-kt-button='true'
              >
                {/*begin::Input*/}
                <input
                  className='btn-check'
                  type='radio'
                  name='delete'
                  defaultValue={4}
                  onClick={(e) => {
                    setCrud(4)
                  }}
                />
                {/*end::Input*/}
                Delete
              </label>
              {/*end::Radio*/}
              {/*begin::Radio*/}
              <label
                className={
                  isFindAll
                    ? 'btn btn-outline btn-active-success btn-color-muted active'
                    : 'btn btn-outline btn-active-success btn-color-muted'
                }
                data-kt-button='true'
              >
                {/*begin::Input*/}
                <input
                  className='btn-check'
                  type='radio'
                  name='findAll'
                  defaultValue={5}
                  onClick={(e) => {
                    setCrud(5)
                  }}
                />
                {/*end::Input*/}
                FindAll
              </label>
              {/*end::Radio*/}
            </div>
            {/*end::Radio group*/}
          </div>
          </>
          :<>
          <div className='fv-row'>
            {/*begin::Radio group*/}

            <div
              className='btn-group w-100'
              data-kt-buttons='true'
              data-kt-buttons-target='[data-kt-button]'
            >
              {/*begin::Radio*/}
              <label
                className={
                  'btn btn-outline btn-active-success btn-color-muted active'
                }
                data-kt-button='true'
              >
                {/*begin::Input*/}
                <input
                  className='btn-check'
                  type='radio'
                  name='custom'
                  defaultValue={data.crud}
                  onClick={(e) => {
                    // setCrud(1)
                  }}
                />
                {/*end::Input*/}
                {data.crud}
              </label>
              {/*end::Radio*/}

            </div>
            {/*end::Radio group*/}
          </div>
          </>}
          {/*end::Row*/}
        </div>
        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className='d-flex flex-column mb-10 fv-row'>
          {/*begin::Label*/}
          <label className='required fs-5 fw-semibold mb-2'>Base Dto</label>
          {/*end::Label*/}
          {/*begin::Select*/}
          <select
            onChange={(e) => {
              setSelectedBaseDto(parseInt(e.target.value))
              if (parseInt(e.target.value) >= 0) {
                updateData({
                  baseDto: dtos[parseInt(e.target.value)].dtoName,
                })
              } else {
                updateData({
                  baseDto: undefined,
                })
              }
            }}
            name='basedto'
            data-control='select2'
            data-hide-search='true'
            data-placeholder='Select a base modal...'
            className='form-select form-select-solid'
            value={selectedBaseDto}
          >
            <option value={-1}>Select a base modal...</option>
            {dtos.length > 0 &&
              dtos.map((dto, i) => (
                <>
                  <option value={i}>{dto.dtoName}</option>
                </>
              ))}
          </select>
          {/*end::Select*/}
          {!data.baseDto && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='basedto' data-validator='notEmpty' className='fv-help-block'>
                base dto name is required
              </div>
            </div>
          )}
        </div>
        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className='d-flex flex-column mb-10 fv-row'>
          {/*begin::Label*/}
          <label className='required fs-5 fw-semibold mb-2'>Secondary Dto</label>
          {/*end::Label*/}
          {/*begin::Select*/}
          <select
            onChange={(e) => {
              setSelectedSecDto(parseInt(e.target.value))
              if (parseInt(e.target.value) >= 0) {
                updateData({
                  secondaryDto: dtos[parseInt(e.target.value)].dtoName,
                })
              } else {
                updateData({
                  secondaryDto: undefined,
                })
              }
            }}
            name='secdto'
            data-control='select2'
            data-hide-search='true'
            data-placeholder='Select a secondary modal...'
            className='form-select form-select-solid'
            value={selectedSecDto}
          >
            <option value={-1}>Select a secondary modal...</option>
            {dtos.length > 0 &&
              dtos.map((dto, i) => (
                <>
                  <option value={i}>{dto.dtoName}</option>
                </>
              ))}
          </select>
          {/*end::Select*/}
          {!data.secondaryDto && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='secdto' data-validator='notEmpty' className='fv-help-block'>
                secondary dto name is required
              </div>
            </div>
          )}
        </div>
        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className='d-flex flex-column mb-10 fv-row'>
          {/*begin::Label*/}
          <label className='required fs-5 fw-semibold mb-2'>Select access role</label>
          {/*end::Label*/}
          {/*begin::Select*/}
          <select
            onChange={(e) => {
              if (e.target.value != '-1') {
                updateData({
                  accessRole: e.target.value,
                })
              } else {
                updateData({
                  accessRole: undefined,
                })
              }
            }}
            name='accessRole'
            data-control='selecaccessRolet2'
            data-hide-search='true'
            data-placeholder='Select a access role...'
            className='form-select form-select-solid'
            value={data.accessRole ? data.accessRole : '-1'}
          >
            <option value={'-1'}>Select a access role...</option>
            <option value={'admin'}>Admin</option>
            <option value={'root'}>Root</option>
            <option value={'all'}>All</option>
          </select>
          {/*end::Select*/}
          {!data.accessRole && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='accessRole' data-validator='notEmpty' className='fv-help-block'>
                access role is required
              </div>
            </div>
          )}
        </div>
        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className='d-flex flex-column mb-10 fv-row'>
          {/*begin::Label*/}
          <label className='required fs-5 fw-semibold mb-2'>Set active</label>
          {/*end::Label*/}
          {/*begin::Select*/}
          <select
            onChange={(e) => {
              updateData({
                active: e.target.value == 'true' ? true : false,
              })
              setIsActive(e.target.value == 'true' ? true : false)
            }}
            name='active'
            data-control='active'
            data-hide-search='true'
            data-placeholder='Set active...'
            className='form-select form-select-solid'
            value={isAcive ? 'true' : 'false'}
          >
            <option value={'true'}>True</option>
            <option value={'false'}>False</option>
          </select>
          {/*end::Select*/}
        </div>
        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className='d-flex flex-column mb-10 fv-row'>
          {/*begin::Label*/}
          <label className='required fs-5 fw-semibold mb-2'>Set limited</label>
          {/*end::Label*/}
          {/*begin::Select*/}
          <select
            onChange={(e) => {
              updateData({
                limited: e.target.value == 'true' ? true : false,
              })
              setIsLimited(e.target.value == 'true' ? true : false)
            }}
            name='limited'
            data-control='limited'
            data-hide-search='true'
            data-placeholder='Set limited...'
            className='form-select form-select-solid'
            value={isLimited ? 'true' : 'false'}
          >
            <option value={'true'}>True</option>
            <option value={'false'}>False</option>
          </select>
          {/*end::Select*/}
        </div>
        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className='d-flex flex-column mb-10 fv-row'>
          {/*begin::Label*/}
          <label className='required fs-5 fw-semibold mb-2'>Set blocked</label>
          {/*end::Label*/}
          {/*begin::Select*/}
          <select
            onChange={(e) => {
              updateData({
                blocked: e.target.value == 'true' ? true : false,
              })
              setIsBlocked(e.target.value == 'true' ? true : false)
            }}
            name='blocked'
            data-control='blocked'
            data-hide-search='true'
            data-placeholder='Set blocked...'
            className='form-select form-select-solid'
            value={isBlocked ? 'true' : 'false'}
          >
            <option value={'true'}>True</option>
            <option value={'false'}>False</option>
          </select>
          {/*end::Select*/}
        </div>
        {/*end::Input group*/}
        {/*end::Form Group */}
        {/*begin::Form Group */}

        {/*end::Form Group */}

        {/*end::Form Group */}
      </div>
    </div>
  )
}

export {ApiPopUp}
