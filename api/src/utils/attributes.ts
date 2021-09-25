import { extensions } from "../auth/config.json";
const extClientId = extensions.clientID;

/**
 * Case sensitive names of our custom attributes in AAD.
 */
type CustomAttributes = "Volunteer" | "IsNew";

export const getAttribute = (name: CustomAttributes) =>
  `extension_${extClientId.replace(/-/g, "")}_${name}`;
