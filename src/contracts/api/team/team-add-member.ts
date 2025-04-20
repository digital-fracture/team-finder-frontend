import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IUser from "../types/user";
import IValidationErrorResponse from "../validation-error-response";

interface ITeamAddMemberRequest extends IBaseRequest {
  query: {
    id: number;
  };
  body: {
    user_id: number;
  };
}

interface ITeamAddMemberResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type ITeamAddMemberResponse = DescriptorResponseType<ITeamAddMemberResponses>;

export default interface ITeamAddMemberDescriptor extends IBaseDescriptor {
  method: "POST";
  name: "v1.team.member.add";
  request: ITeamAddMemberRequest;
  response: ITeamAddMemberResponse;
}
