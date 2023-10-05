export type IGenericResponse<T>= {

  meta?: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  data?: T;
}

export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: {
    path: string;
    message: string;
  }[];
}
