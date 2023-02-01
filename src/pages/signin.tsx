import { type GetServerSideProps } from "next";
import { type AppProps } from "next/app";
import { getProviders, signIn } from "next-auth/react";

const Home = ({ providers }: { providers: AppProps }) => {
  return (
    <>
      <h1>Sign In</h1>
      <div>
        {Object.values(providers).map((provider) => (
          <button
            key={provider.id}
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: `${window.location.origin}`,
              })
            }
          >
            Sign in with Google
          </button>
        ))}
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};
