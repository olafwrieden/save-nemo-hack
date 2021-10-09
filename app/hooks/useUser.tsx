import { createContext, useContext } from "react";
import { OrgRole } from "../utils";

export const UserContext = createContext<IUser>({
  id: "",
  first_name: "",
  last_name: "",
  full_name: "",
  isVolunteer: false,
  roles: [],
});

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  isVolunteer: boolean;
  roles: OrgRole[];
}

export const useUser = (): IUser => {
  return useContext(UserContext);
};
