import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IParticipantForm from "../types/participant-form";
import IValidationErrorResponse from "../validation-error-response";

interface ICreateUserProfileRequest extends IBaseRequest {
  path: {
    id: number;
  };
  body: IParticipantForm;
}

interface ICreateUserProfileResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse;
  422: IValidationErrorResponse;
}

type ICreateUserProfileResponse =
  DescriptorResponseType<ICreateUserProfileResponses>;

export default interface ICreateUserProfileDescriptor extends IBaseDescriptor {
  method: "POST";
  name: "v1.user.profile.create";
  request: ICreateUserProfileRequest;
  response: ICreateUserProfileResponse;
}
