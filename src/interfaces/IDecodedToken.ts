export interface IDecodedToken {
  exp: number;
  iss: string;
  roles: string[];
  sub: string;
}
