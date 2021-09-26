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
