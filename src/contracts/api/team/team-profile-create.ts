import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import ITeam from "../types/team";
import ITeamForm from "../types/team-form";
import IValidationErrorResponse from "../validation-error-response";

interface ITeamProfileCreateRequest extends IBaseRequest {
  path: {
    id: number;
  };
  body: ITeamForm;
}

interface ITeamProfileCreateResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type ITeamProfileCreateResponse =
  DescriptorResponseType<ITeamProfileCreateResponses>;

export default interface ITeamProfileCreateDescriptor extends IBaseDescriptor {
  method: "POST";
  name: "v1.team.profile.create";
  request: ITeamProfileCreateRequest;
  response: ITeamProfileCreateResponse;
}
