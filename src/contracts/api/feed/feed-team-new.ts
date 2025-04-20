import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import ISkill from "../types/skill";
import IValidationErrorResponse from "../validation-error-response";

interface IGenerateFeedTeamRequest extends IBaseRequest {
  body: {
    university: string;
    skills: ISkill[];
  };
}

interface IFeedResponse {
  feed_id: string;
}

interface IGenerateFeedTeamResponses {
  200: IFeedResponse;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type IGenerateFeedTeamResponse =
  DescriptorResponseType<IGenerateFeedTeamResponses>;

export default interface IGenerateFeedTeamDescriptor extends IBaseDescriptor {
  method: "GET";
  name: "v1.feed.team.new";
  request: IGenerateFeedTeamRequest;
  response: IGenerateFeedTeamResponse;
}
