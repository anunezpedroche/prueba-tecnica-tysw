export type ResultPropsType<T> = {
  status: number
  data?: T
  message?: string
  succeeded: boolean
}

export class Result<T> {
  status: number
  data?: T
  message?: string = ""
  succeeded: boolean

  constructor(props: ResultPropsType<T>) {
    this.status = props.status
    this.data = props.data
    this.message = props.message
    this.succeeded = props.succeeded
  }
}
