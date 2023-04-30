export interface HttpResponse<T> {
  succeeded: boolean
  message: string | null
  data: null | T
  errors: null | string
}
