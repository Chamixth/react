import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import { IconModel } from '../../apps/workspace/core/IWorkspaceModels'

type Props = {
  techstackIcons?: Array<IconModel>
}

const UsersList: FC<Props> = ({techstackIcons = undefined}) => {
  return (
    <>
      {techstackIcons &&
        techstackIcons.map((user, i) => {
          return (
            <OverlayTrigger
              key={`${i}-${user.name}`}
              placement='top'
              overlay={<Tooltip id='tooltip-user-name'>{user.name}</Tooltip>}
            >
              <div className='symbol symbol-35px symbol-circle'>
                {/* {user.avatar && <img src={toAbsoluteUrl(user.avatar)} alt='Pic' />} */}
                {user.avatar && (
                  <span className={`symbol-label text-inverse-primary fw-bolder`} style={{backgroundColor:`${user.color}`}}>
                    {<img src={toAbsoluteUrl(user.avatar)} alt='Pic' className='w-20px h-20px' />}
                  </span>
                )}
              </div>
            </OverlayTrigger>
          )
        })}
    </>
  )
}

export {UsersList}
