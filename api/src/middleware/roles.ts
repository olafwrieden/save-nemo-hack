import { AccessControl } from "accesscontrol";
const ac = new AccessControl();

ac.grant("READER").readOwn("organizations")
    .readOwn("bouys")
    .readOwn("users");
ac.grant("CONTRIBUTOR").extend("READER")
    .updateOwn("bouys")
    .readOwn("organizations");
ac.grant("ADMIN").extend("CONTRIBUTOR")
    .readOwn("organizations")
    .updateOwn('organizations')
    .createOwn('bouys')
    .deleteOwn('bouys')
    .createOwn('users')
    .deleteOwn('users')
    .updateOwn('users');
ac.grant("GLOBALADMIN").extend("ADMIN");
ac.grant("GLOBALADMIN")
    .readAny("organizations")
    .createAny("organizations")
    .deleteAny("organisations")
    .updateAny("organisations")
    .readAny("bouys")
    .createAny("bouys")
    .deleteAny("bouys")
    .updateAny("bouys")
    .readAny("users")
    .createAny("users")
    .deleteAny("users")
    .updateAny("users");


export const roles: any = ac;
