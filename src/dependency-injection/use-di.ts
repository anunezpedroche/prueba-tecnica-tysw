import { InjectionToken, DependencyContainer } from "tsyringe"

export function getDi<T>(
  injectionToken: InjectionToken<T>,
  container: DependencyContainer
) {
  return container.resolve<T>(injectionToken)
}
