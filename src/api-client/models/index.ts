/* tslint:disable */
/* eslint-disable */

/**
 * 
 * @export
 */
export const AssetTag = {
    accepted: 'accepted',
    rejected: 'rejected',
    pending_review: 'pending-review',
    misc: 'misc'
} as const;
export type AssetTag = typeof AssetTag[keyof typeof AssetTag];


/**
 * 
 * @export
 */
export const AssetType = {
    audio: 'audio',
    video: 'video',
    image: 'image'
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
 * @interface CreateAsset200Response
 */
export interface CreateAsset200Response {
    /**
     * 
     * @type {string}
     * @memberof CreateAsset200Response
     */
    assetId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAsset200Response
     */
    assetName: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAsset200Response
     */
    assetType: CreateAsset200ResponseAssetTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof CreateAsset200Response
     */
    createdAt: number;
}


/**
 * @export
 */
export const CreateAsset200ResponseAssetTypeEnum = {
    audio: 'audio',
    video: 'video',
    image: 'image'
} as const;
export type CreateAsset200ResponseAssetTypeEnum = typeof CreateAsset200ResponseAssetTypeEnum[keyof typeof CreateAsset200ResponseAssetTypeEnum];

/**
 * 
 * @export
 * @interface CreateAssetRequest
 */
export interface CreateAssetRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateAssetRequest
     */
    assetName: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAssetRequest
     */
    assetType: CreateAssetRequestAssetTypeEnum;
}


/**
 * @export
 */
export const CreateAssetRequestAssetTypeEnum = {
    audio: 'audio',
    video: 'video',
    image: 'image'
} as const;
export type CreateAssetRequestAssetTypeEnum = typeof CreateAssetRequestAssetTypeEnum[keyof typeof CreateAssetRequestAssetTypeEnum];

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
    assetId: string;
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
 * @interface GetPublicAccessUrl200Response
 */
export interface GetPublicAccessUrl200Response {
    /**
     * 
     * @type {string}
     * @memberof GetPublicAccessUrl200Response
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
    assetId: string;
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
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    thumbnail: string | null;
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
    assetId: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectAsset
     */
    assetName: string;
    /**
     * 
     * @type {AssetTag}
     * @memberof ProjectAsset
     */
    tag: AssetTag;
    /**
     * 
     * @type {number}
     * @memberof ProjectAsset
     */
    addedAt: number;
    /**
     * 
     * @type {number}
     * @memberof ProjectAsset
     */
    uploadedAt: number;
    /**
     * 
     * @type {number}
     * @memberof ProjectAsset
     */
    createdAt: number;
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
    projectType: ProjectDetailsProjectTypeEnum;
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
 * @export
 */
export const ProjectDetailsProjectTypeEnum = {
    audio: 'audio',
    video: 'video',
    image: 'image'
} as const;
export type ProjectDetailsProjectTypeEnum = typeof ProjectDetailsProjectTypeEnum[keyof typeof ProjectDetailsProjectTypeEnum];


/**
 * 
 * @export
 */
export const ProjectType = {
    audio: 'audio',
    video: 'video',
    image: 'image'
} as const;
export type ProjectType = typeof ProjectType[keyof typeof ProjectType];

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
