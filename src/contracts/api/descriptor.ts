import AuthenticationDescriptor from "./auth";
import FeedDescriptor from "./feed";
import TeamDescriptor from "./team";
import UserDescriptor from "./user";

type ApiDescriptor =
  | AuthenticationDescriptor
  | FeedDescriptor
  | UserDescriptor
  | TeamDescriptor;

export default ApiDescriptor;
