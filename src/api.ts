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
      "api.boards.create": "/api/boards/{user_tracker_id}/create/",
      "api.boards.get": "/api/boards/{user_tracker_id}/get_boards/",
      "api.boards.delete": "/api/boards/{user_tracker_id}/delete/",
      "api.lists.create": "/api/lists/{user_tracker_id}/{board_id}/create/",
      "api.lists.get": "/api/lists/{user_tracker_id}/{board_id}/get/",
      "api.lists.delete":
        "/api/lists/{user_tracker_id}/{board_id}/{list_id}/delete/",
      "api.tasks.create":
        "/api/tasks/{user_tracker_id}/{board_id}/{list_id}/create/",
      "api.tasks.get":
        "/api/tasks/{user_tracker_id}/{board_id}/{list_id}/{task_id}/get/",
      "api.tasks.delete":
        "/api/tasks/{user_tracker_id}/{board_id}/{list_id}/{task_id}/delete/",
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
