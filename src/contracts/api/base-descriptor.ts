import IBaseRequest from "./base-request";
import IBaseResponse from "./base-response";
import RestAPIMethod from "./rest-api-method";

export default interface IBaseDescriptor {
  method: RestAPIMethod;
  name: string;
  request: IBaseRequest;
  response: IBaseResponse;
}
