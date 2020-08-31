export interface Repository<T> {
    create(item: T): Promise<number>
    find(id: number): Promise<T>
    update(id: number, item: T): Promise<boolean>
    delete(id: number): Promise<boolean>
}
