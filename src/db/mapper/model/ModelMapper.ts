export interface ModelMapper<ObjectType, Model> {
    map(row: ObjectType): Model
}
