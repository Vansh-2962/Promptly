"use client";

import Image from "next/image";
import { pacifico } from "@/app/ui/fonts";
import Link from "next/link";
import Profile from "../public/profile.avif";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { PhilippinePeso } from "lucide-react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setProvidersFn = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvidersFn();
  }, []);

  const signinUser = (providerId) => {
    try {
      setLoading(true);
      signIn(providerId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="w-full flex items-center justify-between p-10  ">
      <div className="flex items-center gap-2 ">
        <Link href={"/"}>
          {" "}
          <h1
            className={`font-semibold text-2xl flex items-end ${pacifico.className}`}
          >
            {" "}
            <span className="text-indigo-500">
              <PhilippinePeso size={35} />
            </span>
            romptly
          </h1>
        </Link>
      </div>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex items-center gap-5">
            <Link
              href="/create-prompt"
              className="border p-2 px-5 rounded-full bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text border-green-600"
            >
              Create Prompt
            </Link>
            <button
              className="border p-2 px-5  rounded-full hover:bg-zinc-800"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={session?.user.image || Profile}
                width={35}
                height={35}
                alt="profile"
                className="rounded-full "
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signinUser(provider.id)}
                  className="border p-2 px-5 rounded-full hover:bg-zinc-800"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex ">
            <Image
              src={Profile}
              width={35}
              height={35}
              alt="profile"
              className="rounded-full "
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="flex items-center px-8 py-5 rounded-lg absolute top-12 right-0 flex-col gap-3 bg-transparent text-white border backdrop-blur-2xl">
                <Link
                  href="/profile"
                  className="text-nowrap text-right w-full "
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="text-nowrap w-full text-right"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create prompt
                </Link>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="border p-1 px-4 rounded-full border-white bg-black text-white w-full "
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signinUser(provider.id)}
                  className="border p-2 px-5  rounded-full hover:bg-zinc-800"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
