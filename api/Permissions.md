# Endpoints

| Method | Endpoint                           | Retuns                                 |
| :----- | :--------------------------------- | :------------------------------------- |
| GET    | `/me`                              | Profile info of the current user       |
| --     | --                                 | --                                     |
| GET    | `/users`                           | Every user in AAD                      |
| GET    | `/users/{id}`                      | AAD user by ID                         |
| PATCH  | `/users/{id}`                      | Updates the AAD user by ID             |
| --     | --                                 | --                                     |
| GET    | `/organizations`                   | All organisations                      |
| POST   | `/organizations`                   | Creates a new organisation             |
| GET    | `/organizations/{id}`              | A specific organisation                |
| PATCH  | `/organizations/{id}`              | Update specific organisation           |
| DELETE | `/organizations/{id}`              | Deletes a specific organisation        |
| GET    | `/organizations/{id}/billing`      | Org's billing information              |
| PATCH  | `/organizations/{id}/billing`      | Update billing details                 |
| GET    | `/organizations/{id}/members`      | All members in a specific organisation |
| POST   | `/organizations/{id}/members`      | Add member to an organisation          |
| PATCH  | `/organizations/{id}/members/{id}` | Update membership (e.g. access level)  |
| DELETE | `/organizations/{id}/members/{id}` | Remove member from an organisation     |
| --     | --                                 | --                                     |
| GET    | `/buoys`                           | All buoys                              |
| POST   | `/buoys`                           | Register new buoy in the system        |
| GET    | `/buoys/{id}`                      | Get a specific buoy                    |

# Account Permissions

| Permission            | Owner | Admin | Member |
| :-------------------- | :---: | :---: | :----: |
| **Account Settings**  |       |
| `account:create`      |  n/a  |  n/a  |  n/a   |
| `account:read`        |   1   |   1   |   1    |
| `account:update`      |   1   |   0   |   0    |
| `account:delete`      |   1   |   0   |   0    |
| **Account Billing**   |       |
| `billing:create`      |   1   |   0   |   0    |
| `billing:read`        |   1   |   0   |   0    |
| `billing:update`      |   1   |   0   |   0    |
| `billing:delete`      |   1   |   0   |   0    |
| **Account Members**   |       |
| `member:create`       |   1   |   1   |   0    |
| `member:read`         |   1   |   1   |   1    |
| `member:update`       |   1   |   1   |   0    |
| `member:delete`       |   1   |   1   |   0    |
| **Account Buoys**     |       |
| `buoy:create`         |   1   |   0   |   0    |
| `buoy:read`           |   1   |   1   |   1    |
| `buoy:update`         |   1   |   1   |   0    |
| `buoy:delete`         |   1   |   0   |   0    |
| **Buoy Sensors**      |       |
| `sensor:add`          |   1   |   0   |   0    |
| `sensor:read`         |   1   |   1   |   1    |
| `sensor:update`       |   1   |   1   |   1    |
| `sensor:delete`       |   1   |   0   |   0    |
| **Buoy Transmission** |       |
| `transmission:read`   |   1   |   1   |   1    |
| `transmission:update` |   1   |   1   |   0    |
| `transmission:delete` |   1   |   0   |   0    |

## Parsing Org Roles Claim

Open in a demo environment - [click here](https://www.typescriptlang.org/play?ssl=32&ssc=2&pln=1&pc=1#code/JYOwLgpgTgZghgYwgAgPJQOYCUD2AbFAbwChlkdMBJAEwC5kBnMKUDAblOSnwnqZZDtiAX2LEEOEE2QAHOFAYRcBAMJ44wALbIAvMgAUCdVr7NWASnrpsPANoBdXQD5kJMhKlhZGhbuRGNTQA6M019cyCGGTxgMH0AcjZ4iJhgPEgofWBnZGBzTg9pChsCBj85YAUgzTgZfX0KqFMBDHMctzJkAi85KDAyvUbI6NiE2mSg1PToLJy8zjJgGANe-tsABkcAQh09AFcQaghUkAhqZAAyC+8+hlsARm3d5AOjk7O2js7-SWlNAE8AIIIJAMBhWTDKFB6QjkKh0G5rTYAGi4PHoqzuj2Qom+UAgYD2UBAyABwNBDAWOKp+MJxM4whSaQy9ViEE0llykG0wDK1ihOS2WzZHIKvx4QTwOAw+gARI0GLLUQr8u5xQRJdK5cUoYrUTqeAxVVwCUSSQbSiIOOJfl4ySCIGDyvJFFC1IE5fdaICACIAWUoADk2AAmWgqVCBgAqWEoACEAKpR1BYNiy8zWwo9OBgAAWWEdZgQYGAkj8tniEejscTyaw8XsNs8JoYOCJSBofni93iYizpP+UIAYhQo7neQXW+3oQPyY6GJNQNR9DgcjggsVO7s9Pip1AO9RzAB+ILcAjIAA+F+QstlYiWKxz+cLLGLpZAQSXEAAHqgYPoAWHUdxwYSc233CA2h2PQAFp7k+MUpAlKUZXiABNNtkFzOAADcUEQCktmSERkAgPBFFcRDWw1FCEkDVc5zBIj8mEIA)

```typescript
interface OrgRole {
  orgId: string;
  role: string;
}

const parseRoleClaim = (claim: string): OrgRole[] => {
  const pairs = claim
    .trim()
    .split(";")
    .filter((i) => i);
  const orgRoles = pairs
    .map((pair: string) => {
      let parts = pair.split(":").filter((i) => i);
      if (parts[0] !== undefined && parts[1] !== undefined) {
        const myAccess: OrgRole = { orgId: parts[0], role: parts[1] };
        return myAccess;
      }
      return;
    })
    .filter((item): item is OrgRole => !!item);
  console.log("pairs", pairs);
  console.log("orgRoles", orgRoles);
  return orgRoles;
};

const myAccess = parseRoleClaim("1:ADMIN;2:CONTRIBUTOR;");

const pathRestriction = ["CONTRIBUTOR"];
const resourceId = "1";

const myRoleForThisResource =
  myAccess.find((o) => o.orgId === resourceId)?.role || "";

if (pathRestriction.indexOf(myRoleForThisResource) !== -1) {
  console.log("You have access!");
} else {
  console.log("No Access!");
}
```

## Output

```text
[LOG]: "pairs",  ["1:ADMIN", "2:CONTRIBUTOR"]
[LOG]: "orgRoles",  [{
         "orgId": "1",
         "role": "ADMIN"
       }, {
         "orgId": "2",
         "role": "CONTRIBUTOR"
       }]
[LOG]: "No Access!"
```
