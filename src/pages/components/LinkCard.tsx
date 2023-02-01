import Image from "next/image";

interface LinkCard {
  title: string;
  url: string | undefined;
  image: string | null;
}

const LinkCard = ({ title, url, image }: LinkCard) => {
  return (
    <a
      href={url}
      rel="noreferrer"
      target="_blank"
      className="mb-3 flex w-3/4 max-w-3xl items-center rounded-md border border-white bg-white bg-opacity-50 p-1 transition-all hover:scale-105"
    >
      <div className="flex w-full text-center">
        <div className="flex h-10 w-10 items-center justify-center">
          {image ? (
            <Image
              className="rounded-sm w-10 h-10"
              alt={title}
              priority={true}
              src={image}
              width={40}
              height={40}
            />
          ) : (
            <div className="monogram">JSy</div>
          )}
        </div>
        <h2 className="flex w-full items-center justify-center p-2 text-sm text-gray-700 lg:-m-10">
          {title}
        </h2>
      </div>
    </a>
  );
};

export default LinkCard;
