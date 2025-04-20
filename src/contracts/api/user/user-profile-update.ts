import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IParticipantForm from "../types/participant-form";
import IValidationErrorResponse from "../validation-error-response";

interface IUpdateUserProfileRequest extends IBaseRequest {
  path: {
    id: number;
  };
  body: IParticipantForm;
}

interface IUpdateUserProfileResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse;
  422: IValidationErrorResponse;
}

type IUpdateUserProfileResponse =
  DescriptorResponseType<IUpdateUserProfileResponses>;

export default interface IUpdateUserProfileDescriptor extends IBaseDescriptor {
  method: "PATCH";
  name: "v1.user.profile.update";
  request: IUpdateUserProfileRequest;
  response: IUpdateUserProfileResponse;
}
