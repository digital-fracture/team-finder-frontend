import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import ITeamForm from "../types/team-form";
import IValidationErrorResponse from "../validation-error-response";

interface ITeamProfileDeleteRequest extends IBaseRequest {
  path: {
    id: number;
  };
}

interface ITeamProfileDeleteResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type ITeamProfileDeleteResponse =
  DescriptorResponseType<ITeamProfileDeleteResponses>;

export default interface ITeamProfileDeleteDescriptor extends IBaseDescriptor {
  method: "DELETE";
  name: "v1.team.profile.delete";
  request: ITeamProfileDeleteRequest;
  response: ITeamProfileDeleteResponse;
}
