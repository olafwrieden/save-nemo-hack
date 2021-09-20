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
