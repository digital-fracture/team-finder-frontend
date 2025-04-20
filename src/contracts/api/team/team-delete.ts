import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IValidationErrorResponse from "../validation-error-response";

interface ITeamDeleteRequest extends IBaseRequest {
  query: {
    team_id: number;
  };
}

interface ITeamDeleteResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type ITeamDeleteResponse = DescriptorResponseType<ITeamDeleteResponses>;

export default interface ITeamDeleteDescriptor extends IBaseDescriptor {
  method: "DELETE";
  name: "v1.team.delete";
  request: ITeamDeleteRequest;
  response: ITeamDeleteResponse;
}
