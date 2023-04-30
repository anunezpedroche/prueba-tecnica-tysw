import { DependencyContainer } from "tsyringe"
import { QueryParams } from "../types/infraestructure/query-params"
import { getDi } from "../dependency-injection/use-di"
import { GetEntityQry } from "../application/get-entity-qry"

export async function getEntityUseCase<T, Tdto, K extends QueryParams<T>>(
  container: DependencyContainer,
  params: K,
  mapTo: (data: Tdto) => T
) {
  const GetAllQryResolution = getDi<GetEntityQry<T, Tdto, K>>(
    GetEntityQry,
    container
  )

  return await GetAllQryResolution.execute(params, mapTo)
}
