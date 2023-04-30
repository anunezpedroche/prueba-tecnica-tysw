import { container } from "tsyringe"
import { FIND_ENTITY_HTTP_REPOSITORY, HTTP_CLIENT } from "./injection-token"
import { HttpClient } from "../http-client/http-client"
import { FindEntityHttpRepository } from "../infraestructure/find-entity-http-repository"

export function useContainer() {
  container.register<HttpClient>(HTTP_CLIENT, {
    useValue: new HttpClient()
  })
  container.register(FIND_ENTITY_HTTP_REPOSITORY, FindEntityHttpRepository)
  return container
}
