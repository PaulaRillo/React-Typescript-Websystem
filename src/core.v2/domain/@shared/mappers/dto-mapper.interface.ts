export interface DtoMapperInterface<T> {
  toDto(domainData: T): any;
}
