export default interface HttpRequestInterface<T> {
    url: string;
    requiresAuth: boolean;
    data?: T;
}
