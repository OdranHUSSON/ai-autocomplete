export interface PaginationLink {
    first?: string;
    last?: string;
    prev?: string | null;
    next?: string | null;
}
  
export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: PaginationLink[];
}
  
  