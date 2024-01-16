export interface DomainMapperInterface<T> {
  toDomain(dto: any): T;
}
