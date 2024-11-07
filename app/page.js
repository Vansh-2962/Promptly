import Feed from "@/components/Feed";

export default function Home() {
  return (
    <section className="w-full flex flex-col justify-center items-center p-5 gap-2">
      <h1 className="md:text-5xl text-3xl font-bold ">Discover & Share</h1>
      <span className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-center">
        AI-Powered Prompts
      </span>
      <p className="text-center">
        Promptly is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
}
