import STATUS from "$lib/status";

export abstract class APIError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export class ServerError extends APIError {
  constructor(
    message: string = "Internal Server Error",
    statusCode: number = STATUS.HTTP_500_INTERNAL_SERVER_ERROR,
  ) {
    super(message, statusCode);
  }
}

export class UserNotFoundError extends APIError {
  constructor(
    message: string = "User not found",
    statusCode: number = STATUS.HTTP_404_NOT_FOUND,
  ) {
    super(message, statusCode);
  }
}

export class InvalidCredentialsError extends APIError {
  constructor(
    message: string = "Invalid email or password",
    statusCode: number = STATUS.HTTP_401_UNAUTHORIZED,
  ) {
    super(message, statusCode);
  }
}

export class UnauthorizedError extends APIError {
  constructor(
    message: string = "Unauthorized",
    statusCode: number = STATUS.HTTP_401_UNAUTHORIZED,
  ) {
    super(message, statusCode);
  }
}

export class BadRequestError extends APIError {
  constructor(
    message: string = "Bad Request",
    statusCode: number = STATUS.HTTP_400_BAD_REQUEST,
  ) {
    super(message, statusCode);
  }
}

export class UnprocessableContentError extends APIError {
  constructor(
    message: string = "Unprocessable Content",
    statusCode: number = STATUS.HTTP_422_UNPROCESSABLE_CONTENT,
  ) {
    super(message, statusCode);
  }
}

export class InvalidImageError extends APIError {
  constructor(
    message: string = "Invalid image format or content",
    statusCode: number = STATUS.HTTP_400_BAD_REQUEST,
  ) {
    super(message, statusCode);
  }
}

export class AlreadyTimedInError extends APIError {
  constructor(
    message: string = "User has already timed in",
    statusCode: number = STATUS.HTTP_400_BAD_REQUEST,
  ) {
    super(message, statusCode);
  }
}

export class AlreadyTimedOutError extends APIError {
  constructor(
    message: string = "User has already timed out",
    statusCode: number = STATUS.HTTP_400_BAD_REQUEST,
  ) {
    super(message, statusCode);
  }
}

export class ImageTooLargeError extends APIError {
  constructor(
    message: string = "The image data provided is too large.",
    statusCode: number = STATUS.HTTP_413_CONTENT_TOO_LARGE,
  ) {
    super(message, statusCode);
  }
}

export class UserAlreadyExistsError extends APIError {
  constructor(
    message: string = "A user with the provided email already exists.",
    statusCode: number = STATUS.HTTP_409_CONFLICT,
  ) {
    super(message, statusCode);
  }
}

const errors = {
  ServerError,
  UserNotFoundError,
  UserAlreadyExistsError,
  InvalidCredentialsError,
  UnauthorizedError,
  BadRequestError,
  UnprocessableContentError,
  InvalidImageError,
  AlreadyTimedInError,
  AlreadyTimedOutError,
  ImageTooLargeError,
};

export default errors;
