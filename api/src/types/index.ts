export interface IMember {
  user: Number | string;
  role: string;
  joined: Date;
}

export interface IOrganization {
  id: Number;
  name: string;
  category: string;
  plan: string;
  members: IMember[];
}

export interface IBouy {
  id: Number;
  name: string;
  owner_org: string;
}

export interface ISmartBuoyConfig {
  maxDriftDistance: number; // 0 = unknown
  osVersion: string;
  uptime: number;
  powerUpTime: string; // something like '05:30'
  powerDownTime: string; // something like '22:45'
}

export interface ISmartBuoyVitals {
  latitude: string;
  longitude: string;
  gsmStrength: string;
  batteryLevel: number;
  ipAddress: string;
  solarVoltage: string;
  solarAmperage: string;
  lastActivityTime: string;
}
export interface ISmartBuoy {
  id: string;
  deviceId: string;
  ownerId: string;
  isDeployed: boolean;
  isPublic: boolean;
  isEnabled: boolean;
  config: ISmartBuoyConfig;
  vitals: ISmartBuoyVitals;
}
