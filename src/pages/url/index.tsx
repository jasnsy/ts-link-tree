import { type NextPage } from "next";
import cryptoRandomString from "crypto-random-string";
import copy from "copy-to-clipboard";
import { useState } from "react";
import Head from "next/head";

import { api } from "../../utils/api";

type Form = {
  slug: string;
  url: string;
};

const Url: NextPage = () => {
  const [form, setForm] = useState<Form>({ slug: "", url: "" });
  const createSlug = api.urls.createSlug.useMutation();

  const validateUrl = (url: string) => {
    try {
      const newUrl = new URL(url);

      return newUrl;
    } catch (e) {
      setForm({
        ...form,
        url: "Invalid Url",
      });

      return false;
    }
  };

  if (createSlug.status === "success") {
    const shortUrl = `${window.location.origin}/url/${form.slug}`;

    return (
      <>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="flex w-full max-w-xl space-x-3">
            <div className="m-auto mt-10 w-full max-w-2xl rounded-lg bg-white px-5 py-10 shadow dark:bg-gray-800">
              <div className="mb-6 text-left text-3xl font-light text-gray-800 dark:text-white">
                Shorten Url
              </div>
              <div className="m-auto grid max-w-xl grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-gray-700" htmlFor="short">
                    <textarea
                      className="w-full flex-1 appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                      id="short"
                      disabled={true}
                      placeholder="ShortUrl will generate here..."
                      name="short"
                      rows={3}
                      cols={40}
                      value={shortUrl}
                    ></textarea>
                  </label>
                </div>
                <div className="col-span-2 text-right">
                  <button
                    className="w-full rounded-lg  bg-purple-700 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
                    onClick={(e) => {
                      e.preventDefault();
                      copy(`${shortUrl}`);
                    }}
                  >
                    Copy
                  </button>
                </div>
                <div className="col-span-2 text-right">
                  <button
                    className="w-full rounded-lg  bg-purple-700 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
                    onClick={() => {
                      createSlug.reset();
                      setForm({ slug: "", url: "" });
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>ShortUrl by Jason</title>
        <meta name="description" content="ShortUrl by Jason" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <form
          className="flex w-full max-w-xl space-x-3"
          onSubmit={(e) => {
            e.preventDefault();

            if (!form.url) {
              const textArr = document.getElementById("long");

              if (textArr) {
                textArr.className = `${textArr?.className} border-4 border-red-300`;
                textArr.setAttribute("placeholder", "URL is required");
              }
            }

            if (!form.slug) {
              const slug = cryptoRandomString({
                length: 6,
                type: "url-safe",
              });
              setForm({
                ...form,
                slug,
              });
            }

            if (validateUrl(form.url) && form.slug) {
              createSlug.mutate({ ...form });
            }
          }}
        >
          <div className="m-auto mt-10 w-full max-w-2xl rounded-lg bg-white px-5 py-10 shadow dark:bg-gray-800">
            <div className="mb-6 text-left text-3xl font-light text-gray-800 dark:text-white">
              Shorten Url
            </div>
            <div className="m-auto grid max-w-xl grid-cols-2 gap-4">
              <div className="col-span-1">
                <input
                  type="text"
                  onChange={(e) => {
                    e.preventDefault();
                    setForm({
                      ...form,
                      slug: e.target.value,
                    });
                  }}
                  className="w-full flex-1 appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  id="slug"
                  placeholder="Desired Slug"
                  value={form.slug}
                ></input>
              </div>
              <div className="col-span-1 text-right">
                <button
                  className="w-full rounded-lg  bg-purple-700 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
                  onClick={(e) => {
                    e.preventDefault();
                    const slug = cryptoRandomString({
                      length: 6,
                      type: "url-safe",
                    });
                    setForm({
                      ...form,
                      slug,
                    });
                  }}
                >
                  Random
                </button>
              </div>
              <div className="col-span-2">
                <label className="text-gray-700" htmlFor="long">
                  <textarea
                    className="w-full flex-1 appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                    id="long"
                    onChange={(e) => {
                      setForm({
                        ...form,
                        url: e.target.value,
                      });
                    }}
                    placeholder="Enter your long URL here..."
                    name="long"
                    rows={3}
                    cols={40}
                    value={form.url}
                  ></textarea>
                </label>
              </div>
              <div className="col-span-2 text-right">
                <button
                  type="submit"
                  className="w-full rounded-lg  bg-purple-700 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default Url;
