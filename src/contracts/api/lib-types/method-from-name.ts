import ApiDescriptor from "../descriptor";

type MethodFromName<T extends ApiDescriptor["name"]> = Extract<
    ApiDescriptor,
    { name: T }
>;

export default MethodFromName;
