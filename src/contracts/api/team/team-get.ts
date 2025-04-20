import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import ITeam from "../types/team";
import IValidationErrorResponse from "../validation-error-response";

interface ITeamGetRequest extends IBaseRequest {
  query: {
    team_id: number;
  };
}

interface ITeamGetResponses {
  200: ITeam;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  404: unknown;
  422: IValidationErrorResponse;
}

type ITeamGetResponse = DescriptorResponseType<ITeamGetResponses>;

export default interface ITeamGetDescriptor extends IBaseDescriptor {
  method: "GET";
  name: "v1.team.get";
  request: ITeamGetRequest;
  response: ITeamGetResponse;
}
