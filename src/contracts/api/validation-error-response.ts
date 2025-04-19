export default interface IValidationErrorResponse {
  detail: Array<{
    loc: Array<string | number>;
    msg: string;
    type: string;
  }>;
}
