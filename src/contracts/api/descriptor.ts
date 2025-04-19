import BoardApiDescriptor from "./boards";
import ListApiDescriptor from "./lists";
import TaskApiDescriptor from "./tasks";

type ApiDescriptor = BoardApiDescriptor | ListApiDescriptor | TaskApiDescriptor;

export default ApiDescriptor;
