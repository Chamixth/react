import { ApplicationModel } from "../../../../../models/application_model"

export interface IAppBasic {
    appName: string
    appType: 'Quick Online Courses' | 'Face to Face Discussions' | 'Full Intro Training'
  }
  
  export type TAppFramework = 'HTML5' | 'ReactJS' | 'Angular' | 'Vue'
  
  export interface IAppDatabase {
    databaseName: string
    databaseSolution: 'MySQL' | 'Firebase' | 'DynamoDB' | 'MongoDB'
  }
  
  export type TAppStorage = 'Basic Server' | 'AWS' | 'Google'
  
  export interface ICreateAppData {
    appBasic: IAppBasic
    appFramework: TAppFramework
    appDatabase: IAppDatabase
    appStorage: TAppStorage
  }
  
  export const defaultCreateAppData: ICreateAppData = {
    appBasic: {appName: '', appType: 'Quick Online Courses'},
    appFramework: 'HTML5',
    appDatabase: {databaseName: 'db_name', databaseSolution: 'MySQL'},
    appStorage: 'Basic Server',
  }
  
  export type StepProps = {
    data: ApplicationModel
    updateData: (fieldsToUpdate: Partial<ApplicationModel>) => void
    hasError: boolean
  }
  