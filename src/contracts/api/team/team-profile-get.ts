import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import ITeamForm from "../types/team-form";
import IValidationErrorResponse from "../validation-error-response";

interface ITeamProfileGetRequest extends IBaseRequest {
  path: {
    id: number;
  };
}

interface ITeamProfileGetResponses {
  200: ITeamForm;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type ITeamProfileGetResponse = DescriptorResponseType<ITeamProfileGetResponses>;

export default interface ITeamProfileGetDescriptor extends IBaseDescriptor {
  method: "GET";
  name: "v1.team.profile.get";
  request: ITeamProfileGetRequest;
  response: ITeamProfileGetResponse;
}
