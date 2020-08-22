export interface RowMapper<T> {
    map(row: any): T | undefined
}
