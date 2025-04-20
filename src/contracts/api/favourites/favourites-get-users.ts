import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import IParticipantForm from "../types/participant-form";
import IValidationErrorResponse from "../validation-error-response";

interface IFavouritesGetUsersRequest extends IBaseRequest {}

interface IFavouritesGetUsersResponses {
  200: IParticipantForm[];
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type IFavouritesGetUsersResponse =
  DescriptorResponseType<IFavouritesGetUsersResponses>;

export default interface IFavouritesGetUsersDescriptor extends IBaseDescriptor {
  method: "GET";
  name: "v1.favourites.users.get";
  request: IFavouritesGetUsersRequest;
  response: IFavouritesGetUsersResponse;
}
