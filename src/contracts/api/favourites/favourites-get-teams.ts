import IBaseDescriptor from "../base-descriptor";
import IBaseRequest from "../base-request";
import JWTErrorResponse from "../jwt-responses";
import DescriptorResponseType from "../lib-types/response-type-from-descriptor";
import ITeamForm from "../types/team-form";
import IValidationErrorResponse from "../validation-error-response";

interface IFavouritesGetTeamsRequest extends IBaseRequest {}

interface IFavouritesGetTeamsResponses {
  200: ITeamForm[];
  400: unknown;
  403: JWTErrorResponse; // Possibly invalid JWT
  422: IValidationErrorResponse;
}

type IFavouritesGetTeamsResponse =
  DescriptorResponseType<IFavouritesGetTeamsResponses>;

export default interface IFavouritesGetTeamsDescriptor extends IBaseDescriptor {
  method: "GET";
  name: "v1.favourites.teams.get";
  request: IFavouritesGetTeamsRequest;
  response: IFavouritesGetTeamsResponse;
}
