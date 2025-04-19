export default interface IUser {
  id: string;
  email: string;
  username: string;
  telegram_username: string;
  collect_telemetry?: string;
  is_premium: boolean;
}
