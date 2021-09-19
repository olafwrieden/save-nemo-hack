import { useUser } from "../hooks/useUser";

export default function Profile() {
  const { user } = useUser();

  // console.log(user);

  return (
    <>
      <h1>Hi {user.name}</h1>
      <p>Welcome to your profile page.</p>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ["admin"],
    },
  };
}
