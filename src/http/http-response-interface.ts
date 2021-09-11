export default interface HttpResponseInterface<T> {
    success: boolean;
    code: number;
    data?: T;
}
