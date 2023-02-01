import { useRouter } from "next/router";
import Image from "next/image";
import { api } from "../utils/api";
import LinkCard from "./components/LinkCard";

function LinksPage() {
  const router = useRouter();

  function getUser() {
    const name = router?.query?.name as string;

    const { data } = api.links.getLinks.useQuery({ name: name }, { enabled: router.isReady });

    if (!data) return (
      <>
      <div className="mx-auto mt-16 flex w-full flex-col items-center justify-center">
          <h1 className="mt-4 text-xl font-bold text-white">No User Found</h1>
      </div>
      </>
    )

    return (
      <div>
        <h1>
          {data && (
            <div className="mx-auto mt-16 flex w-full flex-col items-center justify-center">
              <Image
                className="rounded-full"
                alt={data?.name}
                src={data?.avatar}
                width={100}
                height={100}
              />
              <h1 className="mt-4 text-xl font-bold text-white">{data?.name}</h1>
              <h2 className="text-m mt-1 mb-8 flex w-full items-center justify-center px-2 text-center text-white">
                {data?.description}
              </h2>
              {data.links.map((link) => (
                <LinkCard key={link?.url} {...link} />
              ))}
            </div>
          )}
        </h1>
      </div>
    )
  }

  return (
    getUser()
  )
}

export default LinksPage;
