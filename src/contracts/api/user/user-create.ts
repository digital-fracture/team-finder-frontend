import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IUser from "../types/user";
import IValidationErrorResponse from "../validation-error-response";

interface ICreateUserRequest extends IBaseRequest {
  body: IUser;
}

interface ICreateUserResponses {
  200: unknown;
  400: unknown;
  422: IValidationErrorResponse;
}

type ICreateUserResponse = DescriptorResponseType<ICreateUserResponses>;

export default interface ICreateUserDescriptor extends IBaseDescriptor {
  method: "POST";
  name: "v1.user.create";
  request: ICreateUserRequest;
  response: ICreateUserResponse;
}
