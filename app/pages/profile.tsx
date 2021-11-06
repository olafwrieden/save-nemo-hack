import { useUser } from "../hooks/useUser";

export default function Profile() {
  const { full_name } = useUser();

  return (
    <>
      <h1>Hi {full_name}</h1>
      <p>Welcome to your profile page.</p>
    </>
  );
}

Profile.requireAuth = true;
