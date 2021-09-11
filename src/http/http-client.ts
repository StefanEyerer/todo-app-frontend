import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import HttpClientInterface from './http-client-interface';
import HttpRequestInterface from './http-request-interface';
import HttpResponseInterface from './http-response-interface';
import Config from './config.json';

export default class HttpClient implements HttpClientInterface {
    private static instance: HttpClient;
    private http: AxiosInstance;
    private tokens: { accessToken: string; refreshToken: string } = { accessToken: '', refreshToken: '' };

    private constructor() {
        let baseUrl = '';
        if (process.env.NODE_ENV === 'development') baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
        else if (process.env.NODE_ENV === 'production') baseUrl = Config.REACT_APP_BACKEND_BASE_URL;

        this.http = axios.create({
            baseURL: baseUrl,
            headers: { 'Content-Type': 'application/json' },
            responseType: 'json'
        });
    }

    public static getInstance(): HttpClient {
        if (!HttpClient.instance) {
            HttpClient.instance = new HttpClient();
        }
        return HttpClient.instance;
    }

    public getLoggedIn(): boolean {
        return !!(this.tokens && this.tokens.accessToken && this.tokens.refreshToken);
    }

    public getTokens(): { accessToken: string; refreshToken: string } {
        return { ...this.tokens };
    }

    public setTokens(accessToken: string, refreshToken: string): void {
        this.tokens = {
            accessToken,
            refreshToken
        };
    }

    public delete<T, U>(request: HttpRequestInterface<T>): Promise<HttpResponseInterface<U>> {
        return this.makeRequest<T, U>('DELETE', request);
    }

    public get<T, U>(request: HttpRequestInterface<T>): Promise<HttpResponseInterface<U>> {
        return this.makeRequest<T, U>('GET', request);
    }

    public post<T, U>(request: HttpRequestInterface<T>): Promise<HttpResponseInterface<U>> {
        return this.makeRequest<T, U>('POST', request);
    }

    public put<T, U>(request: HttpRequestInterface<T>): Promise<HttpResponseInterface<U>> {
        return this.makeRequest<T, U>('PUT', request);
    }

    private async makeRequest<T, U>(
        method: Method,
        request: HttpRequestInterface<T>
    ): Promise<HttpResponseInterface<U>> {
        const config: AxiosRequestConfig = {};
        if (request.requiresAuth) {
            config.headers = { Authorization: `Bearer ${this.tokens.accessToken}` };
        }

        try {
            let response: AxiosResponse<U>;
            if (method === 'delete' || method === 'DELETE') {
                response = await this.http.delete<U>(request.url, config);
            } else if (method === 'get' || method === 'GET') {
                response = await this.http.get<U>(request.url, config);
            } else if (method === 'post' || method === 'POST') {
                response = await this.http.post<U>(request.url, request.data, config);
            } else if (method === 'put' || method === 'PUT') {
                response = await this.http.put<U>(request.url, request.data, config);
            } else {
                throw new Error('unsupported method');
            }
            return {
                success: true,
                code: response.status,
                data: response.data
            };
            // eslint-disable-next-line
        } catch (error: any) {
            return {
                success: false,
                code: error.response?.status || 500
            };
        }
    }
}
