import ISkill from "./skill";

export default interface IParticipantForm {
  university: string;
  skills: ISkill[];
  description: string;
  name: string;
  // TBD
}
