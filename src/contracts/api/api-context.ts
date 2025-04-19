import ApiDescriptor from "./descriptor";
import MethodFromName from "./lib-types/method-from-name";

type ApiMocks = {
  [T in ApiDescriptor["name"]]: (
    method: MethodFromName<T>["method"],
    request: MethodFromName<T>["request"]
  ) => Promise<MethodFromName<T>["response"]>;
};

export default interface IApiContext {
  registerMock<T extends ApiDescriptor["name"]>(
    name: T,
    method: ApiMocks[T]
  ): void;
  send<T extends ApiDescriptor["name"]>(
    name: T,
    method: MethodFromName<T>["method"],
    request: MethodFromName<T>["request"]
  ): Promise<MethodFromName<T>["response"]>;
}

export { type ApiMocks };
