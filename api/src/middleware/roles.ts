import { AccessControl } from "accesscontrol";
const ac = new AccessControl();

ac.grant("READER").readOwn("organizations", ['!name']);

ac.grant("ADMIN").read('organizations')

export const roles: any = ac;
