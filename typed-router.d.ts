/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'unplugin-vue-router/types'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    'list-projects': RouteRecordInfo<'list-projects', '/collections/:collectionId', { collectionId: ParamValue<true> }, { collectionId: ParamValue<false> }>,
    '/files/[fileId]': RouteRecordInfo<'/files/[fileId]', '/files/:fileId', { fileId: ParamValue<true> }, { fileId: ParamValue<false> }>,
    'collections-list': RouteRecordInfo<'collections-list', '/home', Record<never, never>, Record<never, never>>,
    'project-page-root': RouteRecordInfo<'project-page-root', '/projects/:projectId/:fileId?', { projectId: ParamValue<true>, fileId?: ParamValueZeroOrOne<true> }, { projectId: ParamValue<false>, fileId?: ParamValueZeroOrOne<false> }>,
  }
}
