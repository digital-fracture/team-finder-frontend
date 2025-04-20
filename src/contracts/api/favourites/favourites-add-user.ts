import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IValidationErrorResponse from "../validation-error-response";

interface IFavouritesAddUserRequest extends IBaseRequest {
  query: {
    user_id: number;
  };
}

interface IFavouritesAddUserResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type IFavouritesAddUserResponse =
  DescriptorResponseType<IFavouritesAddUserResponses>;

export default interface IFavouritesAddUserDescriptor extends IBaseDescriptor {
  method: "PUT";
  name: "v1.favourites.user.add";
  request: IFavouritesAddUserRequest;
  response: IFavouritesAddUserResponse;
}
