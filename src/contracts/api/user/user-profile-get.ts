import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IParticipantForm from "../types/participant-form";
import IValidationErrorResponse from "../validation-error-response";

interface IGetUserProfileRequest extends IBaseRequest {
  path: {
    id: number;
  };
}

interface IGetUserProfileResponses {
  200: IParticipantForm;
  400: unknown;
  403: JWTErrorResponse;
  422: IValidationErrorResponse;
}

type IGetUserProfileResponse = DescriptorResponseType<IGetUserProfileResponses>;

export default interface IGetUserProfileDescriptor extends IBaseDescriptor {
  method: "GET";
  name: "v1.user.profile.get";
  request: IGetUserProfileRequest;
  response: IGetUserProfileResponse;
}
