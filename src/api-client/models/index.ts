/* tslint:disable */
/* eslint-disable */

/**
 * 
 * @export
 */
export const AssetStatus = {
    pending_review: 'pending-review',
    accepted: 'accepted',
    rejected: 'rejected'
} as const;
export type AssetStatus = typeof AssetStatus[keyof typeof AssetStatus];


/**
 * 
 * @export
 */
export const AssetType = {
    primary: 'primary',
    misc: 'misc',
    source: 'source',
    background_image: 'background-image',
    thumbnail: 'thumbnail'
} as const;
export type AssetType = typeof AssetType[keyof typeof AssetType];

/**
 * 
 * @export
 * @interface AudioPeaks
 */
export interface AudioPeaks {
    /**
     * 
     * @type {number}
     * @memberof AudioPeaks
     */
    sampleRate: number;
    /**
     * 
     * @type {number}
     * @memberof AudioPeaks
     */
    samplesPerPixel: number;
    /**
     * 
     * @type {number}
     * @memberof AudioPeaks
     */
    length: number;
    /**
     * 
     * @type {number}
     * @memberof AudioPeaks
     */
    bits: number;
    /**
     * 
     * @type {Array<Array<number>>}
     * @memberof AudioPeaks
     */
    peaks: Array<Array<number>>;
    /**
     * 
     * @type {number}
     * @memberof AudioPeaks
     */
    channels: number;
}
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
 * @interface CreateIssueRequest
 */
export interface CreateIssueRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateIssueRequest
     */
    fileId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateIssueRequest
     */
    projectId: string;
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
 * @interface CreateIssueResponse
 */
export interface CreateIssueResponse {
    /**
     * 
     * @type {string}
     * @memberof CreateIssueResponse
     */
    issueId: string;
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
    /**
     * 
     * @type {string}
     * @memberof CreateProjectRequest
     */
    subject: string;
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
    projectId: string;
    /**
     * 
     * @type {string}
     * @memberof Issue
     */
    fileId: string;
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
     * @type {string}
     * @memberof Project
     */
    subject: string;
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
 * @interface ProjectAsset
 */
export interface ProjectAsset {
    /**
     * 
     * @type {string}
     * @memberof ProjectAsset
     */
    fileId: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectAsset
     */
    assetName: string;
    /**
     * 
     * @type {AssetType}
     * @memberof ProjectAsset
     */
    assetType: AssetType;
    /**
     * 
     * @type {AssetStatus}
     * @memberof ProjectAsset
     */
    tag: AssetStatus;
    /**
     * 
     * @type {number}
     * @memberof ProjectAsset
     */
    uploadedAt: number;
    /**
     * 
     * @type {string}
     * @memberof ProjectAsset
     */
    contentType: string;
    /**
     * 
     * @type {number}
     * @memberof ProjectAsset
     */
    size: number;
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
     * @type {string}
     * @memberof ProjectDetails
     */
    subject: string;
    /**
     * 
     * @type {number}
     * @memberof ProjectDetails
     */
    createdAt: number;
    /**
     * 
     * @type {Array<ProjectAsset>}
     * @memberof ProjectDetails
     */
    assets: Array<ProjectAsset>;
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
 * @interface UpdateCollectionRequest
 */
export interface UpdateCollectionRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateCollectionRequest
     */
    collectionName: string;
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
    projectName?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateProjectRequest
     */
    subject?: string;
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
