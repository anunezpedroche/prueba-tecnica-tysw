import { Result } from "../types/infraestructure/Result"

export interface FindEntityRepository<T, Tdto, Param = void> {
  findEntity(param: Param, mapTo: (data: Tdto) => T): Promise<Result<T>>
}
