import Api from "./api";
import BaseApiModule from "./contracts/api/base-api-module";
import BaseModule from "./contracts/base-module";

class App {
  readonly api: Api;

  constructor(modules: BaseModule[]) {
    this.api = new Api(
      window.location.origin,
      modules.filter(
        (module) => module.moduleType === "ApiModule"
      ) as BaseApiModule[]
    );
  }
}

export default App;
