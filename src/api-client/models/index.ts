/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface AuthParams
 */
export interface AuthParams {
    /**
     * 
     * @type {string}
     * @memberof AuthParams
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof AuthParams
     */
    password: string;
}
/**
 * 
 * @export
 * @interface Collection
 */
export interface Collection {
    /**
     * 
     * @type {string}
     * @memberof Collection
     */
    collectionId: string;
    /**
     * 
     * @type {string}
     * @memberof Collection
     */
    collectionName: string;
    /**
     * 
     * @type {number}
     * @memberof Collection
     */
    createdAt: number;
    /**
     * 
     * @type {number}
     * @memberof Collection
     */
    projectCount: number;
    /**
     * 
     * @type {number}
     * @memberof Collection
     */
    lastModified: number;
}
/**
 * 
 * @export
 * @interface CreateCollection200Response
 */
export interface CreateCollection200Response {
    /**
     * 
     * @type {string}
     * @memberof CreateCollection200Response
     */
    collectionId: string;
}
/**
 * 
 * @export
 * @interface CreateCollectionRequest
 */
export interface CreateCollectionRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateCollectionRequest
     */
    collectionName: string;
}
/**
 * 
 * @export
 * @interface CreateIssue200Response
 */
export interface CreateIssue200Response {
    /**
     * 
     * @type {string}
     * @memberof CreateIssue200Response
     */
    issueId: string;
}
/**
 * 
 * @export
 * @interface CreateIssueRequest
 */
export interface CreateIssueRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateIssueRequest
     */
    description: string;
    /**
     * 
     * @type {number}
     * @memberof CreateIssueRequest
     */
    timestamp?: number;
    /**
     * 
     * @type {number}
     * @memberof CreateIssueRequest
     */
    duration?: number;
}
/**
 * 
 * @export
 * @interface CreateProject200Response
 */
export interface CreateProject200Response {
    /**
     * 
     * @type {string}
     * @memberof CreateProject200Response
     */
    projectId: string;
}
/**
 * 
 * @export
 * @interface CreateProjectRequest
 */
export interface CreateProjectRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateProjectRequest
     */
    projectName: string;
    /**
     * 
     * @type {string}
     * @memberof CreateProjectRequest
     */
    projectType: string;
}
/**
 * 
 * @export
 * @interface CreateUploadUrl200Response
 */
export interface CreateUploadUrl200Response {
    /**
     * 
     * @type {string}
     * @memberof CreateUploadUrl200Response
     */
    uploadUrl: string;
}
/**
 * 
 * @export
 * @interface GetAccessUrl200Response
 */
export interface GetAccessUrl200Response {
    /**
     * 
     * @type {string}
     * @memberof GetAccessUrl200Response
     */
    url: string;
}
/**
 * 
 * @export
 * @interface Issue
 */
export interface Issue {
    /**
     * 
     * @type {string}
     * @memberof Issue
     */
    issueId: string;
    /**
     * 
     * @type {string}
     * @memberof Issue
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof Issue
     */
    description: string;
    /**
     * 
     * @type {number}
     * @memberof Issue
     */
    timestamp: number | null;
    /**
     * 
     * @type {number}
     * @memberof Issue
     */
    duration: number | null;
    /**
     * 
     * @type {number}
     * @memberof Issue
     */
    createdAt: number;
    /**
     * 
     * @type {number}
     * @memberof Issue
     */
    resolvedAt: number | null;
}
/**
 * 
 * @export
 * @interface Project
 */
export interface Project {
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    projectId: string;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    projectName: string;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    projectType: string;
    /**
     * 
     * @type {number}
     * @memberof Project
     */
    createdAt: number;
}
/**
 * 
 * @export
 * @interface ProjectDetails
 */
export interface ProjectDetails {
    /**
     * 
     * @type {string}
     * @memberof ProjectDetails
     */
    projectId: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectDetails
     */
    projectName: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectDetails
     */
    projectType: string;
    /**
     * 
     * @type {number}
     * @memberof ProjectDetails
     */
    createdAt: number;
    /**
     * 
     * @type {Array<ProjectMedia>}
     * @memberof ProjectDetails
     */
    files: Array<ProjectMedia>;
    /**
     * 
     * @type {Array<Issue>}
     * @memberof ProjectDetails
     */
    issues: Array<Issue>;
}
/**
 * 
 * @export
 * @interface ProjectMedia
 */
export interface ProjectMedia {
    /**
     * 
     * @type {string}
     * @memberof ProjectMedia
     */
    sha256: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectMedia
     */
    contentType: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectMedia
     */
    fileName: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectMedia
     */
    path: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectMedia
     */
    tag: string;
    /**
     * 
     * @type {number}
     * @memberof ProjectMedia
     */
    addedAt: number;
}
/**
 * 
 * @export
 * @interface SignIn200Response
 */
export interface SignIn200Response {
    /**
     * 
     * @type {string}
     * @memberof SignIn200Response
     */
    msg: string;
}
/**
 * 
 * @export
 * @interface UpdateProjectRequest
 */
export interface UpdateProjectRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateProjectRequest
     */
    projectName: string;
}
/**
 * 
 * @export
 * @interface UserData
 */
export interface UserData {
    /**
     * 
     * @type {string}
     * @memberof UserData
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof UserData
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof UserData
     */
    email: string;
}
