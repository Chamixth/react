import {useLayout} from '../layout/core'
import {ThemeModeComponent} from '../assets/ts/layout'

export const toAbsoluteUrl = (pathname: string) => process.env.PUBLIC_URL + pathname

export const useIllustrationsPath = (illustrationName: string): string => {
  const {config} = useLayout()

  const extension = illustrationName.substring(
    illustrationName.lastIndexOf('.'),
    illustrationName.length
  )
  const illustration =
    ThemeModeComponent.getMode() === 'dark'
      ? `${illustrationName.substring(0, illustrationName.lastIndexOf('.'))}-dark`
      : illustrationName.substring(0, illustrationName.lastIndexOf('.'))
  return toAbsoluteUrl(
    `/media/illustrations/${config.illustrations?.set}/${illustration}${extension}`
  )
}

export const useDbPath = (dataName: string): string => {
  const {config} = useLayout()

  const extension = dataName.substring(
    dataName.lastIndexOf('.'),
    dataName.length
  )
  const illustration =
    ThemeModeComponent.getMode() === 'dark'
      ? `${dataName.substring(0, dataName.lastIndexOf('.'))}-dark`
      : dataName.substring(0, dataName.lastIndexOf('.'))
  return toAbsoluteUrl(
    `/media/db/${dataName}`
  )
}
