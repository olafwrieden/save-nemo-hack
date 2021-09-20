import { useMsal } from "@azure/msal-react";
import { GetStaticPropsContext } from "next";

export default function Profile() {
  const { accounts } = useMsal();
  const name = accounts[0].name;

  return (
    <>
      <h1>Hi {name}</h1>
      <p>Welcome to your profile page.</p>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      protected: false,
      userTypes: ["admin"],
    },
  };
}
