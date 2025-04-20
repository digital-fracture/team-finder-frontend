import ITeamCreateDescriptor from "./team-create";
import ITeamGetDescriptor from "./team-get";
import ITeamUpdateDescriptor from "./team-update";
import ITeamDeleteDescriptor from "./team-delete";
import ITeamProfileCreateDescriptor from "./team-profile-create";
import ITeamProfileGetDescriptor from "./team-profile-get";
import ITeamProfileUpdateDescriptor from "./team-profile-update";
import ITeamProfileDeleteDescriptor from "./team-profile-delete";
import ITeamAddMemberDescriptor from "./team-add-member";
import ITeamKickMemberDescriptor from "./team-kick-member";

type TeamDescriptor =
  | ITeamCreateDescriptor
  | ITeamGetDescriptor
  | ITeamUpdateDescriptor
  | ITeamDeleteDescriptor
  | ITeamProfileCreateDescriptor
  | ITeamProfileGetDescriptor
  | ITeamProfileUpdateDescriptor
  | ITeamProfileDeleteDescriptor
  | ITeamAddMemberDescriptor
  | ITeamKickMemberDescriptor;

export default TeamDescriptor;
