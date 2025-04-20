import IUser from "@/src/contracts/api/types/user";
import IApiContext from "../../contracts/api/api-context";
import BaseApiModule from "../../contracts/api/base-api-module";
import MethodFromName from "../../contracts/api/lib-types/method-from-name";
import ITeam from "@/src/contracts/api/types/team";

interface IPasswordedUser extends IUser {
  password: string;
}

const users: IPasswordedUser[] = [
  {
    id: 1,
    email: "example@mail.com",
    username: "example",
    telegram_username: "example_tg",
    is_premium: false,
    password: "test",
    collect_telemetry: true,
    skills: [
      {
        name: "Frontend",
        level: 4,
        confirmed_at: Date.now() - 1000000,
      },
    ],
    profile: {
      user_id: 1,
      description: "Любитель поверстать...",
      university: "МФТИ",
    },
    teams: [0],
  },
  {
    id: 2,
    email: "example2@mail.com",
    username: "example2",
    telegram_username: "example2_tg",
    is_premium: false,
    password: "test2",
    collect_telemetry: true,
    skills: [
      {
        name: "Backend",
        level: 3,
        confirmed_at: Date.now() - 1300000,
      },
    ],
    profile: {
      user_id: 2,
      description: "Любитель бэкендить...",
      university: "МФТИ",
    },
    teams: [0],
  },
];

const teams: ITeam[] = [
  {
    id: 0,
    name: "Test team",
    owner: users[0] as IUser,
    members: [users[0], users[1]] as [IUser, IUser],
    profile: {
      id: 0,
      description: "ну крутой хакатон такой...",
      university: "МГУ",
      event: "Идея.Код.Релиз",
    },
  },
];

export default class ApiMocks extends BaseApiModule {
  private _users: IPasswordedUser[] = users;
  private _teams: ITeam[] = teams;
  private _teamCounter: number = teams.length;
  private _userCounter: number = users.length;

  initContext(context: IApiContext) {
    super.initContext(context);

    context.registerMock("v1.authenticate", this.authenticate.bind(this));
  }

  async authenticate(
    method: MethodFromName<"v1.authenticate">["method"],
    request: MethodFromName<"v1.authenticate">["request"]
  ): Promise<MethodFromName<"v1.authenticate">["response"]> {
    for (const user of this._users) {
      if (
        user.email === request.query.login &&
        user.password === request.query.password
      ) {
        return {
          statusCode: 200,
          data: {
            access_token: user.id.toString(),
          },
        };
      }
    }

    return {
      statusCode: 401,
      data: {
        message: "Invalid credentials",
      },
    };
  }

  async createUser(
    method: MethodFromName<"v1.user.create">["method"],
    request: MethodFromName<"v1.user.create">["request"]
  ): Promise<MethodFromName<"v1.user.create">["response"]> {
    this._users.push({
      password: "none",
      ...request.body,
      id: this._userCounter++,
    });

    return {
      statusCode: 200,
      data: null,
    };
  }

  async getUser(
    method: MethodFromName<"v1.user.get">["method"],
    request: MethodFromName<"v1.user.get">["request"]
  ): Promise<MethodFromName<"v1.user.get">["response"]> {
    const user = this._users.find((user) => user.id === request.path.user_id);

    if (!user) {
      return {
        statusCode: 404,
        data: null,
      };
    }

    return {
      statusCode: 200,
      data: user,
    };
  }

  async updateUser(
    method: MethodFromName<"v1.user.update">["method"],
    request: MethodFromName<"v1.user.update">["request"]
  ): Promise<MethodFromName<"v1.user.update">["response"]> {
    const user = this._users.find((user) => user.id === request.body.id);

    if (!user) {
      return {
        statusCode: 400,
        data: null,
      };
    }

    Object.assign(user, request.body);

    return {
      statusCode: 200,
      data: user,
    };
  }

  async createTeam(
    method: MethodFromName<"v1.team.create">["method"],
    request: MethodFromName<"v1.team.create">["request"]
  ): Promise<MethodFromName<"v1.team.create">["response"]> {
    this._teams.push({ ...request.body, id: this._teamCounter++ });

    return {
      statusCode: 200,
      data: null,
    };
  }

  async getTeam(
    method: MethodFromName<"v1.team.get">["method"],
    request: MethodFromName<"v1.team.get">["request"]
  ): Promise<MethodFromName<"v1.team.get">["response"]> {
    const team = this._teams.find((team) => team.id === request.query.team_id);

    if (!team) {
      return {
        statusCode: 404,
        data: null,
      };
    }

    return {
      statusCode: 200,
      data: team,
    };
  }

  async updateTeam(
    method: MethodFromName<"v1.team.update">["method"],
    request: MethodFromName<"v1.team.update">["request"]
  ): Promise<MethodFromName<"v1.team.update">["response"]> {
    const team = this._teams.find((team) => team.id === request.body.id);

    if (!team) {
      return {
        statusCode: 400,
        data: null,
      };
    }

    Object.assign(team, request.body);

    return {
      statusCode: 200,
      data: team,
    };
  }
}
