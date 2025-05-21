import {
  Configuration,
  ProjectsApi,
  AuthApi,
  CollectionsApi,
  FilesApi,
  IssuesApi,
} from '@/api-client'

const configuration = new Configuration({
  basePath: '/api',
})

export const API = {
  Projects: new ProjectsApi(configuration),
  Auth: new AuthApi(configuration),
  Collections: new CollectionsApi(configuration),
  Files: new FilesApi(configuration),
  Issues: new IssuesApi(configuration),
}
