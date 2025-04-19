import IBaseResponse from "../base-response";

type MapResponse<T extends {}> = {
    [Key in keyof T & number]: {
        statusCode: Key;
        data: T[Key];
    };
};

type DescriptorResponseType<T extends {}> = MapResponse<T>[keyof T & number];

export default DescriptorResponseType;
