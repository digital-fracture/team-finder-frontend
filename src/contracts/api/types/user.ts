import IParticipantForm from "./participant-form";
import ISkill from "./skill";

export default interface IUser {
  id: number;
  email: string;
  password?: string;
  username: string;
  telegram_username: string;
  is_premium: boolean;
  collect_telemetry?: boolean;
  skills: ISkill[];
  profile: IParticipantForm;
  teams: number[];
}
