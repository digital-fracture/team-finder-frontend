import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import ITeam from "../types/team";
import IValidationErrorResponse from "../validation-error-response";

interface ITeamCreateRequest extends IBaseRequest {
  body: ITeam;
}

interface ITeamCreateResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type ITeamCreateResponse = DescriptorResponseType<ITeamCreateResponses>;

export default interface ITeamCreateDescriptor extends IBaseDescriptor {
  method: "POST";
  name: "v1.team.create";
  request: ITeamCreateRequest;
  response: ITeamCreateResponse;
}
