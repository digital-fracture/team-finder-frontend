import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import ITeamForm from "../types/team-form";
import IValidationErrorResponse from "../validation-error-response";

interface ITeamProfileUpdateRequest extends IBaseRequest {
  path: {
    id: number;
  };
  body: ITeamForm;
}

interface ITeamProfileUpdateResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type ITeamProfileUpdateResponse =
  DescriptorResponseType<ITeamProfileUpdateResponses>;

export default interface ITeamProfileUpdateDescriptor extends IBaseDescriptor {
  method: "PATCH";
  name: "v1.team.profile.update";
  request: ITeamProfileUpdateRequest;
  response: ITeamProfileUpdateResponse;
}
