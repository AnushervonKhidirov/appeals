import { NotFound, BadRequest, InternalServerError } from 'http-errors'

export class HttpException extends Error {
  statusCode: number
  error: string
  message: string

  constructor(status: number, error: string, errorMessage?: string) {
    super()
    this.statusCode = status
    this.error = error

    if (errorMessage) this.message = errorMessage
  }
}

export class NotFoundException extends HttpException {
  constructor(customMessage?: string) {
    const { status, message } = NotFound()
    super(status, message, customMessage)
  }
}

export class BadRequestException extends HttpException {
  constructor(customMessage?: string) {
    const { status, message } = BadRequest()
    super(status, message, customMessage)
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(customMessage?: string) {
    const { status, message } = InternalServerError()
    super(status, message, customMessage)
  }
}
