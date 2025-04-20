import ITeamForm from "./team-form";
import IUser from "./user";

export default interface ITeam {
  id: number;
  name: string;
  owner: IUser;
  members: IUser[];
  profile: ITeamForm;
}
