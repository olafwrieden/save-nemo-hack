# Save-Nemo Hack

Save Nemo Hackathon

Current metadata sent by buoy, flexible on changes given we are redesigning the process.

```javascript
{
  "vatals": {
    "solar_voltage": 0,
    "solar_amperage": 0,
    "ip_address": "192.168.1.0",
    "gsm_strength": -90,
    "battery_level": 100,         // 0-100%
    "latitude": "-00.000000",     // current location as reported by the GPS before this transmission
    "longitude": "000.000000"
  },
  "config": {                     // probably settings we want to change using desired properties
    "is_deployed": true,
    "max_drift_distance": 25,     // meters from deploy coords (stored in db)
    "stay_online": false,         // if true, don't shut down after {uptime} minutes on next boot, stay awake
    "remote_on": false,
    "os_version": "npi-1.0.0",
    "uptime": 10,                 // minutes
    "power_up": "0000",
    "power_down": "2359"
  },
  "sensors: [                     // what if we want to add sensors to a buoy? Do we maintain them in DB or in desired props?
    {
      "serial_number": "123456",
      "type": "AIR_PRESSURE",
      "unit": "kilopascal",
      "symbol": "KPa"
    }
    ...
  ]
}
```

Sensor readings are currently stored like this (again, open to ideas):

```javascript
{
  "sensor": {
    "correction_value": 1.002,          // As sensors degrade over time, we multiply the reading by this value, stored for purpose of undo-ing if required
    "details": {
      "name": "[sensor type]",
      "unit": "[sensor's si unit]"
    },
    "serial_number": "[serial]",
    "name": "[sensor name]
  },
  "value": "14.3333424",            // Reading value
  "error_text": "",
  "datetime": "[datetime string]"
}
```

## Useful Resources

These resources helped in the learning journey.

### API

- [How to Create a Simple REST API using TypeScript and Node.js](https://www.section.io/engineering-education/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/)
- [Cosmos DB client library for JavaScript](https://docs.microsoft.com/en-us/javascript/api/overview/azure/cosmos-readme?view=azure-node-latest)
- [Working with Azure CosmosDB and the JavaScript SDK](https://microsoft.github.io/AzureTipsAndTricks/blog/tip204.html)

### App

- [Deploying Next.js App in Azure App Service](https://parveensingh.com/next-js-deployment-on-azure-app-service/)

### Azure Active Directory

- [Manage custom user attributes in Azure B2C](https://www.locktar.nl/programming/manage-custom-user-attributes-in-azure-b2c/)
- [Fetching custom attributes from Azure Active Directory via the Microsoft Graph](https://www.techmikael.com/2017/11/fetching-custom-attributes-from-azure.html)
- [Use query parameters to customize AAD responses](https://docs.microsoft.com/en-us/graph/query-parameters)
- [Azure AD Authentication using MSAL and Next.js (React)](https://www.daryllukas.me/azure-ad-authentication-using-msal-and-nextjs-react/)
- [Enrich tokens with claims from external sources using API connectors](https://docs.microsoft.com/en-us/azure/active-directory-b2c/add-api-connector-token-enrichment?pivots=b2c-user-flow)

### Auth Functions

- [API Connectors with B2C](https://github.com/Azure-Samples/active-directory-nodejs-external-identities-api-connector-azure-function-validate)
