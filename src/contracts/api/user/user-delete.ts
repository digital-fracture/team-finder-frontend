import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IValidationErrorResponse from "../validation-error-response";

interface IDeleteUserRequest extends IBaseRequest {
  path: {
    user_id: number;
  };
}

interface IDeleteUserResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse;
  422: IValidationErrorResponse;
}

type IDeleteUserResponse = DescriptorResponseType<IDeleteUserResponses>;

export default interface IDeleteUserDescriptor extends IBaseDescriptor {
  method: "DELETE";
  name: "v1.user.delete";
  request: IDeleteUserRequest;
  response: IDeleteUserResponse;
}
