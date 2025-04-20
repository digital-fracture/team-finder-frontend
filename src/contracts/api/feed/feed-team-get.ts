import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import ISkill from "../types/skill";
import IValidationErrorResponse from "../validation-error-response";

interface IGetFeedTeamRequest extends IBaseRequest {
  query: {
    feed_id: string;
    limit: number;
    offset: number;
  };
}

interface IFeedResponse {
  feed_id: string;
}

interface IGetFeedTeamResponses {
  200: IFeedResponse;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  404: unknown; // Expired feed
  422: IValidationErrorResponse;
}

type IGetFeedTeamResponse = DescriptorResponseType<IGetFeedTeamResponses>;

export default interface IGetFeedTeamDescriptor extends IBaseDescriptor {
  method: "GET";
  name: "v1.feed.team.get";
  request: IGetFeedTeamRequest;
  response: IGetFeedTeamResponse;
}
