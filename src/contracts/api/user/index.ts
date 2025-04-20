import ICreateUserDescriptor from "./user-create";
import IGetUserDescriptor from "./user-get";
import IDeleteUserDescriptor from "./user-delete";
import IUpdateUserDescriptor from "./user-update";
import ICreateUserProfileDescriptor from "./user-profile-create";
import IGetUserProfileDescriptor from "./user-profile-get";
import IUpdateUserProfileDescriptor from "./user-profile-update";
import IDeleteUserProfileDescriptor from "./user-profile-delete";

type UserDescriptor =
  | ICreateUserDescriptor
  | IGetUserDescriptor
  | IDeleteUserDescriptor
  | IUpdateUserDescriptor
  | ICreateUserProfileDescriptor
  | IGetUserProfileDescriptor
  | IUpdateUserProfileDescriptor
  | IDeleteUserProfileDescriptor;

export default UserDescriptor;
