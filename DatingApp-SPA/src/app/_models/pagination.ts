export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginationResults<T> {
    results: T;
    pagination: Pagination;
}
