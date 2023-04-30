import { inject, injectable } from "tsyringe"
import { QueryParams } from "../types/infraestructure/query-params"
import { FIND_ENTITY_HTTP_REPOSITORY } from "../dependency-injection/injection-token"
import { FindEntityHttpRepository } from "../infraestructure/find-entity-http-repository"
import { Result } from "../types/infraestructure/Result"
import { Query } from "../types/infraestructure/use-case"

@injectable()
export class GetEntityQry<T, Tdto, K extends QueryParams<T>>
  implements Query<T, Tdto, K>
{
  constructor(
    @inject(FIND_ENTITY_HTTP_REPOSITORY)
    private readonly findEntityHttpRepository: FindEntityHttpRepository<
      T,
      Tdto,
      K
    >
  ) {}
  async execute(param: K, mapTo: (data: Tdto) => T): Promise<Result<T>> {
    return await this.findEntityHttpRepository.findEntity(param, mapTo)
  }
}
