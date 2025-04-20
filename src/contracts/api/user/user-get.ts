import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IUser from "../types/user";
import IValidationErrorResponse from "../validation-error-response";

interface IGetUserRequest extends IBaseRequest {
  path: {
    user_id: number;
  };
}

interface IGetUserResponses {
  200: IUser;
  400: unknown;
  403: JWTErrorResponse; // JWT possibly is expired
  422: IValidationErrorResponse;
}

type IGetUserResponse = DescriptorResponseType<IGetUserResponses>;

export default interface IGetUserDescriptor extends IBaseDescriptor {
  method: "GET";
  name: "v1.user.get";
  request: IGetUserRequest;
  response: IGetUserResponse;
}
