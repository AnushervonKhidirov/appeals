import { NotFound, BadRequest, InternalServerError } from 'http-errors';

export class HttpException {
  statusCode: number;
  error: string;
  message: string | string[];

  constructor(status: number, error: string, errorMessage?: string | string[]) {
    this.statusCode = status;
    this.error = error;

    if (errorMessage) this.message = errorMessage;
  }
}

export class NotFoundException extends HttpException {
  constructor(customMessage?: string | string[]) {
    const { status, message } = NotFound();
    super(status, message, customMessage);
  }
}

export class BadRequestException extends HttpException {
  constructor(customMessage?: string | string[]) {
    const { status, message } = BadRequest();
    super(status, message, customMessage);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(customMessage?: string | string[]) {
    const { status, message } = InternalServerError();
    super(status, message, customMessage);
  }
}
