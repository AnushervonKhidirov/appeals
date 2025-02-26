import { HttpException } from '../exceptions/exceptions'

export type TMethodReturnWithError<T> = [T, null] | [null, HttpException]
export type TAsyncMethodReturnWithError<T> = Promise<TMethodReturnWithError<T>>
