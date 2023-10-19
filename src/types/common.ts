export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export const LocationEnum = [
  "Cox Bazar",
  "Dhaka",
  "Sylhet",
  "Chittagong",
  "Sreemangal",
  "Kuakata",
  "Rajshahi",
  "Bandarban",
  "Gazipur",
  "Khulna",
];
export const StatusEnum = ["pending", "accepted", "rejected"];
