import BaseModule from "../base-module";
import IApiContext from "./api-context";

export default abstract class BaseApiModule extends BaseModule {
  protected _context: IApiContext | null = null;

  initContext(context: IApiContext) {
    this._context = context;
  }

  get moduleType(): "ApiModule" {
    return "ApiModule";
  }
}
