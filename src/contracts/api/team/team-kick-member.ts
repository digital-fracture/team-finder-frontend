import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IUser from "../types/user";
import IValidationErrorResponse from "../validation-error-response";

interface ITeamKickMemberRequest extends IBaseRequest {
  query: {
    id: number;
  };
  body: {
    user_id: number;
  };
}

interface ITeamKickMemberResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type ITeamKickMemberResponse = DescriptorResponseType<ITeamKickMemberResponses>;

export default interface ITeamKickMemberDescriptor extends IBaseDescriptor {
  method: "DELETE";
  name: "v1.team.member.kick";
  request: ITeamKickMemberRequest;
  response: ITeamKickMemberResponse;
}
