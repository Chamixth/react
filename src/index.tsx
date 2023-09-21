import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// Apps
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider, setupAxios} from './app/modules/auth'
import {Auth0Provider} from '@auth0/auth0-react'
import {LoadingProvider} from './_metronic/layout/core/LoadingProvider'
import SplashScreenComponent from './_metronic/assets/ts/components/_SplashScreenComponent'
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios)
Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <MetronicI18nProvider>

        {process.env.REACT_APP_AUTH0_DOMAIN &&
          process.env.REACT_APP_AUTH0_CLIENTID &&
          process.env.REACT_APP_AUTH0_REDIRECTURI && (
            <Auth0Provider
              domain={process.env.REACT_APP_AUTH0_DOMAIN}
              clientId={process.env.REACT_APP_AUTH0_CLIENTID}
              authorizationParams={{
                redirect_uri: process.env.REACT_APP_AUTH0_REDIRECTURI,
              }}
            >
              <LoadingProvider>
                <AppRoutes />
              </LoadingProvider>
            </Auth0Provider>
          )}
      </MetronicI18nProvider>
    </QueryClientProvider>
  )
}
