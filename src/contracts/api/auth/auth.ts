import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IValidationErrorResponse from "../validation-error-response";

interface IAuthenticateRequest extends IBaseRequest {
  query: {
    login: string;
    password: string;
  };
}

interface IJWTokenResponse {
  access_token: string;
}

interface IInvalidCredentialsResponse {
  message: "Invalid credentials";
}

interface IAuthenticateResponses {
  200: IJWTokenResponse;
  401: unknown;
  403: IInvalidCredentialsResponse;
  422: IValidationErrorResponse;
}

type IAuthenticateResponse = DescriptorResponseType<IAuthenticateResponses>;

export default interface IAuthenticateDescriptor extends IBaseDescriptor {
  method: "GET";
  name: "v1.authenticate";
  request: IAuthenticateRequest;
  response: IAuthenticateResponse;
}
