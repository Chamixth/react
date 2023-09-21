import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {
  FeedsWidget2,
  FeedsWidget3,
  FeedsWidget4,
  FeedsWidget5,
  FeedsWidget6,
  ChartsWidget1,
  ListsWidget5,
  ListsWidget2,
} from '../../../../../_metronic/partials/widgets'
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Background,
  Controls,
} from 'reactflow'
import {AppUIManagement} from './custom-nodes/App-UI-Management'
import {WebUIManagement} from './custom-nodes/Web-UI-Management'
import {LoggerUIManagement} from './custom-nodes/Logger-UI-Management'

import 'reactflow/dist/style.css'
import {ApiGateway} from './custom-nodes/ApiGateway'
import {ApiAuthentication} from './custom-nodes/ApiAuthentication'
import {ApiLogger} from './custom-nodes/ApiLogger'


import {ApplicationModel, Dto} from '../../../../models/application_model'
import {CradApp} from './custom-nodes/CradApp'
import {CreateDtoModal} from '../../application-configurations/components/model-configurations/Create-modal/CreateDtoPopup'
import {ApplicationNode} from './custom-nodes/ApplicationNode'
import {getAllApplicationsByWorkspaceId} from '../../../../services/applicationService'
import {ApplicationDatabaseNode} from './custom-nodes/ApplicationDatabaseNode'
import { CreateApplicationFlowChart } from './custom-nodes/CreateApplicationFlowChart'
import { getGatewayByWorkspaceId } from '../../../../services/gatewayService'
import { Gateway } from '../../../../models/gateway_model'
import { useAuth0 } from '@auth0/auth0-react'
const App: ApplicationModel = {
  workspaceId: 'WS001',
  appName: 'CGAAS',
  appId: 'APP001',
  database: 'CGAAS',
  userId: 'USR-001',
  isDisabled: 'No',
  version: '1.0',
  deleted: 'No',
  created: '2021-09-01',
  lastUpdated: '2021-09-01',
  lastupdatedBy: 'USR-001',
  operation: 'Create',
}

const initialNodes: Node[] = [
  {
    id: 'apigateway-node',
    type: 'APIGateway',
    position: {x: 400, y: 65},
    data: {value: 123},
  },
  {
    id: 'webui-node',
    type: 'WebUI',
    position: {x: -75, y: -100},
    data: {value: 123},
  },
  {
    id: 'appui-node',
    type: 'AppUI',
    position: {x: -300, y: 195},
    data: {value: 123},
  },
  {
    id: 'loggerui-node',
    type: 'LoggerUI',
    position: {x: -75, y: 415},
    data: {value: 123},
  },
  {
    id: 'apiauth-node',
    type: 'APIAuth',
    position: {x: 400, y: -25},
    data: {value: 123},
  },
  {
    id: 'apilogger-node',
    type: 'APILogger',
    position: {x: 400, y: 650},
    data: {value: 123},
  },
  {
    id: 'createBtn-node',
    type: 'CreateBtn',
    position: {x: 800, y: 0},
    data: {value: 123},
  },
  // {
  //   id: 'cradApp-node',
  //   type: 'CradApp',
  //   position: {x: 1200, y: 0},
  //   data: { value: 123 }
  // },
  //{
  //   id: '8',
  //   type: 'APIConfiguration',
  //   position: {x: 0, y: 10},
  //  data: { value: 123 }
  // },
]

const initialEdges: Edge[] = [
  {
    id: 'edge-1',
    source: 'apigateway-node',
    target: 'webui-node',
    sourceHandle: 'a',
    animated: true,
  },
  {
    id: 'edge-2',
    source: 'apigateway-node',
    target: 'appui-node',
    sourceHandle: 'a',
    animated: true,
  },
  {
    id: 'edge-3',
    source: 'apigateway-node',
    target: 'loggerui-node',
    sourceHandle: 'a',
    animated: true,
  },
  {
    id: 'edge-4',
    source: 'apigateway-node',
    target: 'apiauth-node',
    sourceHandle: 'b',
    animated: true,
  },
  {
    id: 'edge-5',
    source: 'apigateway-node',
    target: 'apilogger-node',
    sourceHandle: 'c',
    animated: true,
  },
  {
    id: 'edge-6',
    source: 'apigateway-node',
    target: 'createBtn-node',
    sourceHandle: 'd',
    animated: true,
  },
  {
    id: 'edge-7',
    source: 'apigateway-node',
    target: 'cradApp-node',
    sourceHandle: 'e',
    animated: true,
  },
]

export function WorkspaceOverview({workspaceId}) {
  const nodeTypes = useMemo(
    () => ({
      WebUI: WebUIManagement,
      AppUI: AppUIManagement,
      LoggerUI: LoggerUIManagement,
      APIGateway: (props) => <ApiGateway {...props} />,
      APIAuth: ApiAuthentication,
      APILogger: ApiLogger,
      CreateBtn: (props) => (
        <CreateApplicationFlowChart {...props} setnewApplication={setNewApplication} workspaceId={workspaceId} />
      ),
      AppNode: (props) => <ApplicationNode {...props} />,
      ApplicationDatabaseNode: (props) => <ApplicationDatabaseNode {...props} />,
    }),
    []
  )

  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)
  const [applicationData, setApplicationData] = useState<Array<ApplicationModel>>([])
  const [loading, setLoading] = useState(true)
  const [newApplication, setNewApplication] = useState<ApplicationModel>({})
  const yPosApp = useRef(0)
  const yPosDB = useRef(0)

  const [gatewayData, setGatewayData] = useState<Gateway>({workspaceId:workspaceId})
  const { user, isAuthenticated } = useAuth0();

  //get gateway by workspace id
  useEffect(() => {
    // Fetch gateway data based on workspace ID
    const userId = user?.sub;
    const fetchGatewayData = async () => {
      try {
        const data = await getGatewayByWorkspaceId(workspaceId,userId || '')
        setGatewayData(data)
        console.log(data, 'mmeka')
      } catch (error) {
        console.error('Error fetching gateway data:', error)
      }
    }

    fetchGatewayData()
  }, [workspaceId])

  const renderApplicationNodes = () => {
    yPosApp.current = 0
    yPosDB.current = 0

    if (applicationData) {
      const newNodes = applicationData.map((application, index) => {
        if (index == 0) {
          yPosApp.current += 30
        } else {
          yPosApp.current += 130
        }
        return {
          id: application.appId?.toString() ?? '',
          type: 'AppNode',
          position: {x: 800, y: yPosApp.current},
          data: {value: 123, application: application},
        }
      })

      //--add database nodes--
      const newDBNodes = applicationData.map((application, index) => {
        if (index == 0) {
          yPosDB.current += 46
        } else {
          yPosDB.current += 130
        }
        return {
          id: application.appId?.toString() + 'db' ?? '',
          type: 'ApplicationDatabaseNode',
          position: {x: 1100, y: yPosDB.current},
          data: {value: 123, application: application},
        }
      })

      setNodes((nodes) => [...nodes, ...newNodes])
      setNodes((nodes) => [...nodes, ...newDBNodes])

      //--add edges--
      //--Application edges--
      const newAppEdges = applicationData.map((application, index) => {
        return {
          id: application.appId?.toString()+"ae" ?? '',
          source: 'apigateway-node',
          target: application.appId?.toString() ?? '',
          sourceHandle: 'd',
          animated: true,
        }
      })

      //--database edges--
      const newDBEdges = applicationData.map((application, index) => {
        return {
          id: application.appId?.toString()+"dbe" ?? '',
          source: application.appId?.toString() ?? '',
          target: application.appId?.toString() + 'db' ?? '',
          sourceHandle: application.appId?.toString() ?? '',
          animated: true,
        }
      })

      const combinedEdges = [...newAppEdges, ...newDBEdges]
      setEdges(combinedEdges)
      setEdges((prevData) => [...prevData, ...initialEdges])
    }
  }

  const renderApiGatewayNode = () => {
    if (gatewayData) {
      const newNode = () => {
        return {
          id: 'apigateway-node',
            type: 'APIGateway',
            position: {x: 400, y: 65},
            data: {value: 123, gatewayData:gatewayData},
        }
      }

      setNodes((nodes) => [...nodes, newNode()])
    }else {
      const newNode = () => {
        return {
          id: 'apigateway-node',
            type: 'APIGateway',
            position: {x: 400, y: 65},
            data: {value: 123, gatewayData:gatewayData},
        }
      }

      setNodes((nodes) => [...nodes, newNode()])
    }
  }

  const renderApiGatewayAuthNode = () => {
    if (gatewayData) {
      const newNode = () => {
        return {
          id: 'apiauth-node',
          type: 'APIAuth',
          position: {x: 400, y: -25},
          data: {value: 123, gatewayData:gatewayData},
        }
      }

      setNodes((nodes) => [...nodes, newNode()])
    }else {
      const newNode = () => {
        return {
          id: 'apiauth-node',
          type: 'APIAuth',
          position: {x: 400, y: -25},
          data: {value: 123, gatewayData:gatewayData},
        }
      }

      setNodes((nodes) => [...nodes, newNode()])
    }
  }

  useEffect(() => {
    // Fetch the workspaces when the component mounts
    const userId = user?.sub;
    getAllApplicationsByWorkspaceId(workspaceId,userId||'')
      .then((data) => {
        if (data) {
          setApplicationData(data)
        } else {
          setApplicationData([])
        }
        setLoading(false) // Set loading to false after data is received
      })
      .catch((error) => {
        // Handle errors if needed anujan gobbaya
        console.error('Error fetching applications:', error)
        setLoading(false) // Set loading to false on error
      })
  }, [workspaceId])

  
  useEffect(() => {
    renderApiGatewayNode()
    renderApiGatewayAuthNode()
  }, [gatewayData])

  useEffect(() => {
    renderApplicationNodes()
  }, [applicationData])

  useEffect(() => {
    if (newApplication.appId) {
      // Add the new application to the applicationData array
      setApplicationData((prevData) => [...prevData, newApplication])
    }
  }, [newApplication])

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  )
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  )
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  )
  const [showCreateDtoModal, setshowCreateDtoModal] = useState<boolean>(false)
  const [dtos, setDtos] = useState<Array<Dto>>([])
  const defaultViewport = {x: 85, y: 0, zoom: 0.85}
  // @ts-ignore
  // @ts-ignore
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className='row g-5 g-xxl-8'>
          <div className='col-xl-12'>
            <div className={`card `}>
              {/* begin::Body */}
              <div className='card-body pb-15'>
                {/* begin::Header */}
                <div style={{position: 'relative', height: '680px'}}>
                  <div
                    className='d-flex align-items-center mb-5'
                    style={{width: '100%', height: '100%'}}
                  >
                    <div style={{width: '100%', height: '100%'}}>
                      <ReactFlow
                        nodes={nodes}
                        onNodesChange={onNodesChange}
                        edges={edges}
                        onEdgesChange={onEdgesChange}
                        defaultViewport={defaultViewport}
                        nodeTypes={nodeTypes}
                        style={{width: '100%', height: '100%'}} // Add this style
                      >
                        <Background />
                        <Controls />
                      </ReactFlow>
                    </div>
                  </div>
                </div>

                {/* end::Header */}

                {/* end::Post */}

                {/* begin::Separator */}
                {/* <div className='separator mb-4'></div> */}
                {/* end::Separator */}

                {/* begin::Reply input */}
                {/* <form className='position-relative mb-6'>
              <textarea
                className='form-control border-0 p-0 pe-10 resize-none min-h-25px'
                rows={1}
                placeholder='Reply..'
              ></textarea>
            </form> */}
                {/*<Logger />*/}
                {/*<div className="mb-5"></div>
            <UiManagement />
            <div className="mb-5"></div>
            <AppManagement />*/}
                {/* edit::Reply input */}
              </div>
              {/* end::Body */}
            </div>
          </div>
          <CreateDtoModal
            show={showCreateDtoModal}
            handleCloseModal={() => setshowCreateDtoModal(false)}
            dto={App}
          />
        </div>
      )}
    </>
  )
}
