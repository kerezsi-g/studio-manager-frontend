import { API } from '@/api'
import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'

export const useProjectData = defineBasicLoader(
  '/projects/[projectId]',
  async (to) => {
    if (typeof to.params.projectId !== 'string') {
      throw new Error('Invalid project id format')
    }

    return API.Projects.getProjectDetails({
      projectId: to.params.projectId,
    })
  },
  {
    lazy: (to, from) => to.name === from?.name,
  },
)
