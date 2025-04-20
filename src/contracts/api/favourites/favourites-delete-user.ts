import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IValidationErrorResponse from "../validation-error-response";

interface IFavouritesDeleteUserRequest extends IBaseRequest {
  query: {
    user_id: number;
  };
}

interface IFavouritesDeleteUserResponses {
  200: unknown;
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  404: unknown;
  422: IValidationErrorResponse;
}

type IFavouritesDeleteUserResponse =
  DescriptorResponseType<IFavouritesDeleteUserResponses>;

export default interface IFavouritesDeleteUserDescriptor
  extends IBaseDescriptor {
  method: "DELETE";
  name: "v1.favourites.user.delete";
  request: IFavouritesDeleteUserRequest;
  response: IFavouritesDeleteUserResponse;
}
