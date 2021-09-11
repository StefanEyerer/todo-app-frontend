import HttpRequestInterface from './http-request-interface';
import HttpResponseInterface from './http-response-interface';

export default interface HttpClientInterface {
    delete<T, U>(request: HttpRequestInterface<T>): Promise<HttpResponseInterface<U>>;
    get<T, U>(request: HttpRequestInterface<T>): Promise<HttpResponseInterface<U>>;
    post<T, U>(request: HttpRequestInterface<T>): Promise<HttpResponseInterface<U>>;
    put<T, U>(request: HttpRequestInterface<T>): Promise<HttpResponseInterface<U>>;
}
