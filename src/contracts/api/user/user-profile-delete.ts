import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IValidationErrorResponse from "../validation-error-response";

interface IDeleteUserProfileRequest extends IBaseRequest {
  path: {
    id: number;
  };
}

interface IDeleteUserProfileResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse;
  422: IValidationErrorResponse;
}

type IDeleteUserProfileResponse =
  DescriptorResponseType<IDeleteUserProfileResponses>;

export default interface IDeleteUserProfileDescriptor extends IBaseDescriptor {
  method: "DELETE";
  name: "v1.user.profile.delete";
  request: IDeleteUserProfileRequest;
  response: IDeleteUserProfileResponse;
}
