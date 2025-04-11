import { ProjectsApi, AuthApi, CollectionsApi, FilesApi, Configuration } from '@/api-client'

const configuration = new Configuration({
  basePath: '/api',
})

export const API = {
  Projects: new ProjectsApi(configuration),
  Auth: new AuthApi(configuration),
  Collections: new CollectionsApi(configuration),
  Files: new FilesApi(configuration),
}
