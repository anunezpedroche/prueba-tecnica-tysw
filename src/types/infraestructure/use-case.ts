import { Result } from "./Result"

export interface Query<Res, ResDto, Param> {
  execute(param: Param, mapTo: (data: ResDto) => Res): Promise<Result<Res>>
}
