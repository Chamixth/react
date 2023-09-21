import {toAbsoluteUrl} from '../../../helpers'
import {useGLoading} from '../../../layout/core/LoadingProvider'

const SplashScreenComponent = () => {
  const {isLoading} = useGLoading()

  return (
    <>
      {isLoading && (
        <div id='splash-scree' className='splash-screen-cgaas'>
          {<img src={toAbsoluteUrl('/media/misc/splash.gif')} alt='Pic' />}
        </div>
      )}
    </>
  )
}

export default SplashScreenComponent
