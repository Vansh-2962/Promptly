import Link from "next/link";
import Image from "next/image";
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col md:px-16 px-6 text-white ">
      <h1 className="text-3xl text-left font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text ">
        {type} Post
      </h1>
      <p className="max-w-md text-left mt-2">Share your idea with the world</p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 "
      >
        <label className="flex flex-col gap-4">
          <span className="font-semibold text-xl">Your AI Prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            className="bg-zinc-900 p-4 backdrop-blur-sm"
          />
        </label>
        <label className="flex flex-col gap-4">
          <span className="font-semibold text-xl">
            Tag <span>(#product, #webdev)</span>{" "}
          </span>
          <input
            type="text"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="Enter tags without # and enter space in between..."
            className="bg-zinc-900 p-4 backdrop-blur-sm"
          />
        </label>
        <div className="flex items-center justify-end mx-3 mb-5 gap-4 ">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="text-gray-300 px-5 bg-indigo-600 rounded-full py-1 text-sm "
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
