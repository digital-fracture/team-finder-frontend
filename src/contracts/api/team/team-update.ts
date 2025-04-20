import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import ITeam from "../types/team";
import IValidationErrorResponse from "../validation-error-response";

interface ITeamUpdateRequest extends IBaseRequest {
  body: ITeam;
}

interface ITeamUpdateResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type ITeamUpdateResponse = DescriptorResponseType<ITeamUpdateResponses>;

export default interface ITeamUpdateDescriptor extends IBaseDescriptor {
  method: "PATCH";
  name: "v1.team.update";
  request: ITeamUpdateRequest;
  response: ITeamUpdateResponse;
}
