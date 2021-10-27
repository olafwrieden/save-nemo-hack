import * as yup from "yup";

const ORG_CATEGORIES = [
  "HOTEL/MOTEL",
  "DIVING_SCHOOL",
  "DIY_PURPOSES",
  "OTHER",
];

export const createOrganizationSchema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().oneOf(ORG_CATEGORIES).required(),
  description: yup.string().max(100),
});

export const updateOrganizationSchema = yup.object().shape({
  name: yup.string(),
  category: yup.string().oneOf(ORG_CATEGORIES),
  description: yup.string().max(100),
});
