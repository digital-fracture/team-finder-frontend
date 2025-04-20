import IGetFeedTeamDescriptor from "./feed-team-get";
import IGetFeedUserDescriptor from "./feed-user-get";
import IGenerateFeedTeamDescriptor from "./feed-team-new";
import IGenerateFeedUserDescriptor from "./feed-user-new";

type FeedDescriptor =
  | IGetFeedTeamDescriptor
  | IGetFeedUserDescriptor
  | IGenerateFeedTeamDescriptor
  | IGenerateFeedUserDescriptor;

export default FeedDescriptor;
