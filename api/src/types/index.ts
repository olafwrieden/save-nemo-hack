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

export interface IBouy{
  id: Number;
  name: string;
  owner_org: string;

}