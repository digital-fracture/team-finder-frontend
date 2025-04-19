import IUser from "./user";

export default interface ITeamForm {
  id: number;
  description: string;
  name: string;
  event: string;
  owner: IUser;
  members: IUser[];
}
