import IApiContext, { ApiMocks } from "./contracts/api/api-context";
import BaseApiModule from "./contracts/api/base-api-module";
import ApiDescriptor from "./contracts/api/descriptor";
import MethodFromName from "./contracts/api/lib-types/method-from-name";
import RestAPIMethod from "./contracts/api/rest-api-method";

class Api {
  private _apiUrlsMap: Record<ApiDescriptor["name"], string>;
  private _apiMocks: Partial<ApiMocks> = {};

  constructor(
    private readonly _urlBase: string,
    private readonly _modules: BaseApiModule[]
  ) {
    this._apiUrlsMap = {
      "v1.authenticate": "/api/auth",
      "v1.feed.user.new": "/api/feed/user/new",
      "v1.feed.team.new": "/api/feed/team/new",
      "v1.feed.user.get": "/api/feed/user",
      "v1.feed.team.get": "/api/feed/team",
      "v1.user.create": "/api/user",
      "v1.user.get": "/api/user",
      "v1.user.update": "/api/user",
      "v1.user.delete": "/api/user",
      "v1.user.profile.create": "/api/user/{id}/profile",
      "v1.user.profile.get": "/api/user/{id}/profile",
      "v1.user.profile.update": "/api/user/{id}/profile",
      "v1.user.profile.delete": "/api/user/{id}/profile",
      "v1.team.create": "/api/team",
      "v1.team.get": "/api/team",
      "v1.team.update": "/api/team",
      "v1.team.delete": "/api/team",
      "v1.team.profile.create": "/api/team/{id}/profile",
      "v1.team.profile.get": "/api/team/{id}/profile",
      "v1.team.profile.update": "/api/team/{id}/profile",
      "v1.team.profile.delete": "/api/team/{id}/profile",
      "v1.team.member.add": "/api/team/{id}/member",
      "v1.team.member.kick": "/api/team/{id}/member",
    };

    const context: IApiContext = {
      registerMock: this.registerMock.bind(this),
      send: this.send.bind(this),
    };

    for (const module of this._modules) {
      module.initContext(context);
    }
  }

  /**
   * Registers mock for specified API method.
   */
  registerMock<T extends ApiDescriptor["name"]>(
    name: T,
    callback: ApiMocks[T]
  ) {
    this._apiMocks[name] = callback;
  }

  /**
   * API calling function. Calls mock to evaluate request or performs a real fetch.
   * @param name - method name
   * @param method - rest api method type
   * @param request - request parameters, separated with `path` and `body` parameters
   * @returns response data with status code
   */
  async send<T extends ApiDescriptor["name"]>(
    name: T,
    method: MethodFromName<T>["method"],
    request: MethodFromName<T>["request"]
  ): Promise<MethodFromName<T>["response"]> {
    // Check for mock first

    const mock = this._apiMocks[name];

    if (mock) {
      return mock(method, request);
    }

    // Build url with path parameters

    let urlBase = this._urlBase + this._apiUrlsMap[name];

    for (const [name, value] of Object.entries(request.path ?? {})) {
      urlBase = urlBase.replace(`{${name}}`, value.toString());
    }

    const url = new URL(urlBase);

    for (const [name, value] of Object.entries(request.query ?? {})) {
      url.searchParams.set(name, value.toString());
    }

    const fetchParameters = {
      method,
    };

    // Fetch throws an error when finds `body` in HEAD or GET request
    if (!["HEAD", "GET"].includes(method) && "body" in request) {
      Object.assign(fetchParameters, {
        body: JSON.stringify(request.body),
      });
    }

    const res = await fetch(url, fetchParameters);

    return {
      statusCode: res.status,
      data: await res.json(),
    } as MethodFromName<T>["response"];
  }
}

export default Api;
