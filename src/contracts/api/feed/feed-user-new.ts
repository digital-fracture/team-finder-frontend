import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import ISkill from "../types/skill";
import IValidationErrorResponse from "../validation-error-response";

interface IGenerateFeedUserRequest extends IBaseRequest {
  body: {
    university: string;
    skills: ISkill[];
  };
}

interface IFeedResponse {
  feed_id: string;
}

interface IGenerateFeedUserResponses {
  200: IFeedResponse;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type IGenerateFeedUserResponse =
  DescriptorResponseType<IGenerateFeedUserResponses>;

export default interface IGenerateFeedUserDescriptor extends IBaseDescriptor {
  method: "GET";
  name: "v1.feed.user.new";
  request: IGenerateFeedUserRequest;
  response: IGenerateFeedUserResponse;
}
