export * from '@/models/UserInfo'

export interface Result<T> {
    code: number;
    data?: T | undefined;
    items?: T[] | undefined;
    totalElements?: number | undefined;
    totalPages?: number | undefined;
}
