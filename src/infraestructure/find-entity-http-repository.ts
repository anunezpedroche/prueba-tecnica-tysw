import { AxiosInstance } from "axios"
import { FindEntityRepository } from "../repositories/find-entity-repository"
import { QueryParams } from "../types/infraestructure/query-params"
import { inject, injectable } from "tsyringe"
import { HTTP_CLIENT } from "../dependency-injection/injection-token"
import { HttpClient } from "../http-client/http-client"
import { Result } from "../types/infraestructure/Result"
import { HttpResponse } from "../types/infraestructure/http-response"

@injectable()
export class FindEntityHttpRepository<T, Tdto, K extends QueryParams<T>>
  implements FindEntityRepository<T, Tdto, K>
{
  private htppInstance: AxiosInstance | undefined = undefined

  constructor(@inject(HTTP_CLIENT) httpClient: HttpClient) {
    this.htppInstance = httpClient.create()
  }

  async findEntity(param: K, mapTo: (data: Tdto) => T): Promise<Result<T>> {
    try {
      const { url } = param
      const { data: response, status } = await (
        this.htppInstance as AxiosInstance
      ).get<HttpResponse<Tdto>>(url as string)

      return new Result<T>({
        status: status,
        data: mapTo(response as Tdto) as T,
        succeeded: true
      })
    } catch (e) {
      return new Result<T>({
        status: e.response.status,
        succeeded: false,
        message: e.response.statusText
      })
    }
  }
}
