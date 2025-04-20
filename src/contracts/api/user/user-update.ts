import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IUser from "../types/user";
import IValidationErrorResponse from "../validation-error-response";

interface IUpdateUserRequest extends IBaseRequest {
  body: IUser;
}

interface IUpdateUserResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse;
  422: IValidationErrorResponse;
}

type IUpdateUserResponse = DescriptorResponseType<IUpdateUserResponses>;

export default interface IUpdateUserDescriptor extends IBaseDescriptor {
  method: "PATCH";
  name: "v1.user.update";
  request: IUpdateUserRequest;
  response: IUpdateUserResponse;
}
