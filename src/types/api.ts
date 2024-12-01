export interface ApiResponse {
    error?: string
    message?: string
    [key: string]: unknown
  }
  
  export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    pageSize: number
  }
  
  export interface WhereClause {
    category?: string
    status?: string
    [key: string]: unknown
  }
  
  