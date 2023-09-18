/* tslint:disable */
/* eslint-disable */
/**
 * Tracking Service
 * RMT tracking service API specification.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     * 
     * @type {number}
     * @memberof ErrorResponse
     */
    'code': ErrorResponseCodeEnum;
    /**
     * 
     * @type {string}
     * @memberof ErrorResponse
     */
    'message': string;
    /**
     * 
     * @type {string}
     * @memberof ErrorResponse
     */
    'status': ErrorResponseStatusEnum;
}

export const ErrorResponseCodeEnum = {
    NUMBER_400: 400,
    NUMBER_401: 401,
    NUMBER_404: 404,
    NUMBER_409: 409,
    NUMBER_500: 500
} as const;

export type ErrorResponseCodeEnum = typeof ErrorResponseCodeEnum[keyof typeof ErrorResponseCodeEnum];
export const ErrorResponseStatusEnum = {
    Error: 'error'
} as const;

export type ErrorResponseStatusEnum = typeof ErrorResponseStatusEnum[keyof typeof ErrorResponseStatusEnum];

/**
 * Order item
 * @export
 * @interface OrderItem
 */
export interface OrderItem {
    /**
     * 
     * @type {string}
     * @memberof OrderItem
     */
    'sku': string;
    /**
     * 
     * @type {string}
     * @memberof OrderItem
     */
    'ad_id'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof OrderItem
     */
    'base_price_total_cents'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof OrderItem
     */
    'paid_price_total_cents': number | null;
    /**
     * 
     * @type {number}
     * @memberof OrderItem
     */
    'quantity': number;
    /**
     * 
     * @type {any}
     * @memberof OrderItem
     */
    'custom'?: any | null;
}
/**
 * Track an order
 * @export
 * @interface TrackOrderRequest
 */
export interface TrackOrderRequest {
    /**
     * 
     * @type {string}
     * @memberof TrackOrderRequest
     */
    'order_key': string;
    /**
     * 
     * @type {string}
     * @memberof TrackOrderRequest
     */
    'ordered_at': string;
    /**
     * 
     * @type {string}
     * @memberof TrackOrderRequest
     */
    'catalog_key'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TrackOrderRequest
     */
    'store_key'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof TrackOrderRequest
     */
    'shopper_key'?: string | null;
    /**
     * 
     * @type {Array<OrderItem>}
     * @memberof TrackOrderRequest
     */
    'line_items': Array<OrderItem>;
    /**
     * 
     * @type {any}
     * @memberof TrackOrderRequest
     */
    'custom'?: any | null;
}

/**
 * TrackingApi - axios parameter creator
 * @export
 */
export const TrackingApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Track an ad click with optional SKU without authentication
         * @param {string} adId ID of an ad
         * @param {string} projectId ID of a project
         * @param {string} [sku] ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        publicTrackClick: async (adId: string, projectId: string, sku?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'adId' is not null or undefined
            assertParamExists('publicTrackClick', 'adId', adId)
            // verify required parameter 'projectId' is not null or undefined
            assertParamExists('publicTrackClick', 'projectId', projectId)
            const localVarPath = `/track/c`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (adId !== undefined) {
                localVarQueryParameter['ad_id'] = adId;
            }

            if (projectId !== undefined) {
                localVarQueryParameter['project_id'] = projectId;
            }

            if (sku !== undefined) {
                localVarQueryParameter['sku'] = sku;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Track an ad impression with optional SKU without authentication using a tracking pixel
         * @param {string} adId ID of an ad
         * @param {string} projectId ID of a project
         * @param {string} [sku] ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        publicTrackImpressionPixel: async (adId: string, projectId: string, sku?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'adId' is not null or undefined
            assertParamExists('publicTrackImpressionPixel', 'adId', adId)
            // verify required parameter 'projectId' is not null or undefined
            assertParamExists('publicTrackImpressionPixel', 'projectId', projectId)
            const localVarPath = `/track/i.gif`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (adId !== undefined) {
                localVarQueryParameter['ad_id'] = adId;
            }

            if (projectId !== undefined) {
                localVarQueryParameter['project_id'] = projectId;
            }

            if (sku !== undefined) {
                localVarQueryParameter['sku'] = sku;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Track a product added to cart
         * @param {string} adId ID of an ad
         * @param {string} sku ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackAddToCart: async (adId: string, sku: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'adId' is not null or undefined
            assertParamExists('trackAddToCart', 'adId', adId)
            // verify required parameter 'sku' is not null or undefined
            assertParamExists('trackAddToCart', 'sku', sku)
            const localVarPath = `/track/a/{ad_id}/{sku}`
                .replace(`{${"ad_id"}}`, encodeURIComponent(String(adId)))
                .replace(`{${"sku"}}`, encodeURIComponent(String(sku)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "bearerAuth", ["write-all:event"], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Track an ad click
         * @param {string} adId ID of an ad
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackClick: async (adId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'adId' is not null or undefined
            assertParamExists('trackClick', 'adId', adId)
            const localVarPath = `/track/c/{ad_id}`
                .replace(`{${"ad_id"}}`, encodeURIComponent(String(adId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "bearerAuth", ["write-all:event"], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Track an ad click with SKU
         * @param {string} adId ID of an ad
         * @param {string} sku ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackClickWithSku: async (adId: string, sku: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'adId' is not null or undefined
            assertParamExists('trackClickWithSku', 'adId', adId)
            // verify required parameter 'sku' is not null or undefined
            assertParamExists('trackClickWithSku', 'sku', sku)
            const localVarPath = `/track/c/{ad_id}/{sku}`
                .replace(`{${"ad_id"}}`, encodeURIComponent(String(adId)))
                .replace(`{${"sku"}}`, encodeURIComponent(String(sku)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "bearerAuth", ["write-all:event"], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Track an ad impression
         * @param {string} adId ID of an ad
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackImpression: async (adId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'adId' is not null or undefined
            assertParamExists('trackImpression', 'adId', adId)
            const localVarPath = `/track/i/{ad_id}`
                .replace(`{${"ad_id"}}`, encodeURIComponent(String(adId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "bearerAuth", ["write-all:event"], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Track an ad impression with SKU
         * @param {string} adId ID of an ad
         * @param {string} sku ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackImpressionWithSku: async (adId: string, sku: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'adId' is not null or undefined
            assertParamExists('trackImpressionWithSku', 'adId', adId)
            // verify required parameter 'sku' is not null or undefined
            assertParamExists('trackImpressionWithSku', 'sku', sku)
            const localVarPath = `/track/i/{ad_id}/{sku}`
                .replace(`{${"ad_id"}}`, encodeURIComponent(String(adId)))
                .replace(`{${"sku"}}`, encodeURIComponent(String(sku)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "bearerAuth", ["write-all:event"], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Track an order
         * @param {TrackOrderRequest} [trackOrderRequest] Track an order
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackOrder: async (trackOrderRequest?: TrackOrderRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/track/o`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearerAuth required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "bearerAuth", ["write-all:event"], configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(trackOrderRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TrackingApi - functional programming interface
 * @export
 */
export const TrackingApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TrackingApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Track an ad click with optional SKU without authentication
         * @param {string} adId ID of an ad
         * @param {string} projectId ID of a project
         * @param {string} [sku] ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async publicTrackClick(adId: string, projectId: string, sku?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.publicTrackClick(adId, projectId, sku, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Track an ad impression with optional SKU without authentication using a tracking pixel
         * @param {string} adId ID of an ad
         * @param {string} projectId ID of a project
         * @param {string} [sku] ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async publicTrackImpressionPixel(adId: string, projectId: string, sku?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<File>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.publicTrackImpressionPixel(adId, projectId, sku, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Track a product added to cart
         * @param {string} adId ID of an ad
         * @param {string} sku ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackAddToCart(adId: string, sku: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackAddToCart(adId, sku, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Track an ad click
         * @param {string} adId ID of an ad
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackClick(adId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackClick(adId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Track an ad click with SKU
         * @param {string} adId ID of an ad
         * @param {string} sku ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackClickWithSku(adId: string, sku: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackClickWithSku(adId, sku, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Track an ad impression
         * @param {string} adId ID of an ad
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackImpression(adId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackImpression(adId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Track an ad impression with SKU
         * @param {string} adId ID of an ad
         * @param {string} sku ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackImpressionWithSku(adId: string, sku: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackImpressionWithSku(adId, sku, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Track an order
         * @param {TrackOrderRequest} [trackOrderRequest] Track an order
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async trackOrder(trackOrderRequest?: TrackOrderRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.trackOrder(trackOrderRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TrackingApi - factory interface
 * @export
 */
export const TrackingApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TrackingApiFp(configuration)
    return {
        /**
         * 
         * @summary Track an ad click with optional SKU without authentication
         * @param {string} adId ID of an ad
         * @param {string} projectId ID of a project
         * @param {string} [sku] ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        publicTrackClick(adId: string, projectId: string, sku?: string, options?: any): AxiosPromise<void> {
            return localVarFp.publicTrackClick(adId, projectId, sku, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Track an ad impression with optional SKU without authentication using a tracking pixel
         * @param {string} adId ID of an ad
         * @param {string} projectId ID of a project
         * @param {string} [sku] ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        publicTrackImpressionPixel(adId: string, projectId: string, sku?: string, options?: any): AxiosPromise<File> {
            return localVarFp.publicTrackImpressionPixel(adId, projectId, sku, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Track a product added to cart
         * @param {string} adId ID of an ad
         * @param {string} sku ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackAddToCart(adId: string, sku: string, options?: any): AxiosPromise<void> {
            return localVarFp.trackAddToCart(adId, sku, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Track an ad click
         * @param {string} adId ID of an ad
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackClick(adId: string, options?: any): AxiosPromise<void> {
            return localVarFp.trackClick(adId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Track an ad click with SKU
         * @param {string} adId ID of an ad
         * @param {string} sku ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackClickWithSku(adId: string, sku: string, options?: any): AxiosPromise<void> {
            return localVarFp.trackClickWithSku(adId, sku, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Track an ad impression
         * @param {string} adId ID of an ad
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackImpression(adId: string, options?: any): AxiosPromise<void> {
            return localVarFp.trackImpression(adId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Track an ad impression with SKU
         * @param {string} adId ID of an ad
         * @param {string} sku ID of a product
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackImpressionWithSku(adId: string, sku: string, options?: any): AxiosPromise<void> {
            return localVarFp.trackImpressionWithSku(adId, sku, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Track an order
         * @param {TrackOrderRequest} [trackOrderRequest] Track an order
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        trackOrder(trackOrderRequest?: TrackOrderRequest, options?: any): AxiosPromise<void> {
            return localVarFp.trackOrder(trackOrderRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TrackingApi - object-oriented interface
 * @export
 * @class TrackingApi
 * @extends {BaseAPI}
 */
export class TrackingApi extends BaseAPI {
    /**
     * 
     * @summary Track an ad click with optional SKU without authentication
     * @param {string} adId ID of an ad
     * @param {string} projectId ID of a project
     * @param {string} [sku] ID of a product
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TrackingApi
     */
    public publicTrackClick(adId: string, projectId: string, sku?: string, options?: AxiosRequestConfig) {
        return TrackingApiFp(this.configuration).publicTrackClick(adId, projectId, sku, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Track an ad impression with optional SKU without authentication using a tracking pixel
     * @param {string} adId ID of an ad
     * @param {string} projectId ID of a project
     * @param {string} [sku] ID of a product
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TrackingApi
     */
    public publicTrackImpressionPixel(adId: string, projectId: string, sku?: string, options?: AxiosRequestConfig) {
        return TrackingApiFp(this.configuration).publicTrackImpressionPixel(adId, projectId, sku, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Track a product added to cart
     * @param {string} adId ID of an ad
     * @param {string} sku ID of a product
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TrackingApi
     */
    public trackAddToCart(adId: string, sku: string, options?: AxiosRequestConfig) {
        return TrackingApiFp(this.configuration).trackAddToCart(adId, sku, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Track an ad click
     * @param {string} adId ID of an ad
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TrackingApi
     */
    public trackClick(adId: string, options?: AxiosRequestConfig) {
        return TrackingApiFp(this.configuration).trackClick(adId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Track an ad click with SKU
     * @param {string} adId ID of an ad
     * @param {string} sku ID of a product
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TrackingApi
     */
    public trackClickWithSku(adId: string, sku: string, options?: AxiosRequestConfig) {
        return TrackingApiFp(this.configuration).trackClickWithSku(adId, sku, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Track an ad impression
     * @param {string} adId ID of an ad
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TrackingApi
     */
    public trackImpression(adId: string, options?: AxiosRequestConfig) {
        return TrackingApiFp(this.configuration).trackImpression(adId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Track an ad impression with SKU
     * @param {string} adId ID of an ad
     * @param {string} sku ID of a product
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TrackingApi
     */
    public trackImpressionWithSku(adId: string, sku: string, options?: AxiosRequestConfig) {
        return TrackingApiFp(this.configuration).trackImpressionWithSku(adId, sku, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Track an order
     * @param {TrackOrderRequest} [trackOrderRequest] Track an order
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TrackingApi
     */
    public trackOrder(trackOrderRequest?: TrackOrderRequest, options?: AxiosRequestConfig) {
        return TrackingApiFp(this.configuration).trackOrder(trackOrderRequest, options).then((request) => request(this.axios, this.basePath));
    }
}


