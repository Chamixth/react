import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { StepProps } from '../../../core/IWorkspaceModels';
import { toAbsoluteUrl } from '../../../../../../../_metronic/helpers';

const WorkspacePopup = ({ data, updateData, hasError }: StepProps) => {
  const [isGateway, setIsGateway] = useState(true);
  const [webFramework, setWebFramework] = useState<string>('Fiber(Go)');
  const [gatewayType, setGatewayType] = useState('EVOGATE');

  useEffect(() => {
    if (data.workspaceId) {
      setWebFramework(data.framework || 'Fiber(Go)')
      setIsGateway(data.isGateway === 'true')
      setGatewayType(data.gateway || 'EVOGATE')
    } else {

      if (isGateway) {
        updateData({isGateway: 'true', gateway: gatewayType})
      } else {
        updateData({isGateway: 'false', gateway: undefined})
      }
    }
  }, [updateData])

  useEffect(() => {
    if (isGateway) {
      updateData({isGateway: 'true', gateway: 'EVOGATE'})
    } else {
      updateData({isGateway: 'false', gateway: undefined})
    }
  }, [isGateway])

  useEffect(() => {
    updateData({gateway: gatewayType,framework: webFramework})
  }, [gatewayType,webFramework])

  return (
    <div className='current'>
      <div className='w-100'>
        <div className='pb-10 pb-lg-15'>
          <h2 className='fw-bold text-dark'>Workspace Info</h2>
          <div className='text-muted fw-semibold fs-6'>
            If you need more info, please check out&nbsp;
            <a href='#' className='link-primary fw-bold'>
              Help Page
            </a>
            .
          </div>
        </div>
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Workspace Name</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='workspacename'
            placeholder=''
            value={data.workspaceName}
            onChange={(e) =>
              updateData({
                workspaceName: e.target.value,
              })
            }
          />
          {!data.workspaceName && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='workspacename' data-validator='notEmpty' className='fv-help-block'>
                Workspace name is required
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2 form-label'>
            <span className=''>Web Framework</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Specify your unique app name'
            ></i>
          </label>
          <Select
            name='framework'
            instanceId='framework-select'
            options={[
              { value: 'Fiber(Go)', label: 'Fiber(Go)' },
              { value: 'Lambda(AWS)', label: 'Lambda(AWS)' },
            ]}
            value={{
              value: webFramework,
              label: webFramework,
            }}
            components={{ IndicatorSeparator: () => null }}
            styles={{
              control: (provided) => ({
                ...provided,
                padding: '0.25rem 1.5rem',
                border: 'none',
                borderRadius: '0.625rem',
                backgroundColor: '#f9f9f9',
              }),
            }}
            isSearchable={false}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '#f4f1fe',
                primary: '#753eea',
              },
            })}
            onChange={(selectedOption) => {
              const selectedValue = selectedOption ? selectedOption.value : 'Fiber(Go)';
              setWebFramework(selectedValue);
              updateData({ framework: selectedValue });
            }}
          />
          {webFramework === undefined && hasError && (
            <div className='fv-plugins-message-container'>
              <div data-field='is-unique' data-validator='notEmpty' className='fv-help-block'>
                Web Framework is required
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-10'>
          <div className='d-flex flex-stack'>
            <div className='me-5'>
              <label className='fs-5 fw-semibold fw-semibold form-label'>
                Gateway Configuration?
              </label>
              <div className='fs-7 fw-semibold text-muted'>
                Does your workspace require gateway configuration?
              </div>
            </div>
            <label className='form-check form-switch form-check-custom form-check-solid'>
              <input
                className='form-check-input'
                type='checkbox'
                checked={isGateway}
                onChange={(e) => {
                  setIsGateway(e.target.checked);
                }}
              />
              <span className='form-check-label fw-semibold text-muted'>Active Gateway</span>
            </label>
          </div>
        </div>
        {isGateway && (
          <div className='fv-row'>
            <label className='d-flex align-items-center fs-5 fw-semibold mb-4'>
              <span className='required'>Gateway Type</span>
              <i
                className='fas fa-exclamation-circle ms-2 fs-7'
                data-bs-toggle='tooltip'
                title='Select your app category'
              ></i>
            </label>
            <div>
              <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  <span className='symbol symbol-50px me-6'>
                    <span className='symbol-label bg-light-warning'>
                      <img
                        src={toAbsoluteUrl('/media/stock/gateways/Evogate.png')}
                        alt=''
                        className='mw-100 p-3'
                      />
                    </span>
                  </span>
                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6'>EvoGate API Gateway</span>
                    <span className='fs-7 text-muted'>
                      Centralizes, manages, secures, and routes API requests efficiently.
                    </span>
                  </span>
                </span>
                <span className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='EVOGATE'
                    value='EVOGATE'
                    checked={gatewayType === 'EVOGATE'}
                    onChange={(e) => setGatewayType(e.target.value)}
                  />
                </span>
              </label>
              <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  <span className='symbol symbol-50px me-6'>
                    <span className='symbol-label bg-light-primary'>
                      <img
                        src={toAbsoluteUrl('/media/stock/gateways/Tyk.png')}
                        alt=''
                        className='mw-100 p-3'
                      />
                    </span>
                  </span>
                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6'>Tyk API Gateway</span>
                    <span className='fs-7 text-muted'>
                      API Gateway for secure, scalable, and managed API solutions.
                    </span>
                  </span>
                </span>
                <span className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='TYK'
                    value='TYK'
                    checked={gatewayType === 'TYK'}
                    onChange={(e) => setGatewayType(e.target.value)}
                  />
                </span>
              </label>
              <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  <span className='symbol symbol-50px me-6'>
                    <span className='symbol-label bg-light-danger'>
                      <img
                        src={toAbsoluteUrl('/media/stock/gateways/WSO2.png')}
                        alt=''
                        className='mw-100 p-3'
                      />
                    </span>
                  </span>
                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6'>WSO2 API Gateway</span>
                    <span className='fs-7 text-muted'>
                      Secure, scalable, and flexible API management and integration platform.
                    </span>
                  </span>
                </span>
                <span className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='WSO2'
                    value='WSO2'
                    checked={gatewayType === 'WSO2'}
                    onChange={(e) => setGatewayType(e.target.value)}
                  />
                </span>
              </label>
              <label className='d-flex align-items-center justify-content-between mb-6 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  <span className='symbol symbol-50px me-6'>
                    <span className='symbol-label bg-light-success'>
                      <img
                        src={toAbsoluteUrl('/media/stock/gateways/Kong.png')}
                        alt=''
                        className='mw-100 p-3'
                      />
                    </span>
                  </span>
                  <span className='d-flex flex-column'>
                    <span className='fw-bolder fs-6'>Kong API Gateway</span>
                    <span className='fs-7 text-muted'>
                      Scalable, Open-source API Gateway for Microservices and APIs.
                    </span>
                  </span>
                </span>
                <span className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='KONG'
                    value='KONG'
                    checked={gatewayType === 'KONG'}
                    onChange={(e) => setGatewayType(e.target.value)}
                  />
                </span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { WorkspacePopup };