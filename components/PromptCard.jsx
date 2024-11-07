"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const postTags = post?.tag?.split(" ");

  return (
    <div
      className={` transition-all duration-300 flex flex-col justify-between bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-slate-700
${copied === post.prompt ? "animate-pulse" : ""}`}
    >
      <div className="flex justify-between items-start gap-5 p-3 ">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post?.creator?.image || "/user.png"}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full bg-zinc-500"
          />
          <div className="flex flex-col">
            <h3 className="font-sans font-semibold">
              {post?.creator?.username || "Unknown"}
            </h3>
            <small className="text-gray-400">
              {post?.creator?.email || "Unknow@test.com"}
            </small>
          </div>
        </div>
        <div className="cursor-pointer" onClick={handleCopy}>
          {copied === post.prompt ? (
            <Check size={15} className="text-green-600" />
          ) : (
            <Copy size={15} className="text-gray-500" />
          )}
        </div>
      </div>
      <div className="p-3 h-full flex flex-col justify-between">
        <p className="my-3 font-sans text-lg text-gray-300 ">{post.prompt}</p>
        <p className="text-sm text-sky-500 cursor-pointer">
          {postTags?.map((tag, index) => {
            return (
              <span
                key={index}
                onClick={() => handleTagClick && handleTagClick(post.tag)}
              >
                #{tag}{" "}
              </span>
            );
          })}
        </p>
        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className="flex items-center justify-center mt-5 gap-1">
            <small
              onClick={handleEdit}
              className="cursor-pointer font-bold text-sky-400 hover:bg-sky-500 hover:text-white px-4 py-1 rounded-full transition-all duration-300 ring-1 ring-inset  ring-sky-500/20"
            >
              Edit
            </small>
            <small
              onClick={handleDelete}
              className="cursor-pointer font-bold text-red-400 hover:bg-red-500 hover:text-white px-4 py-1 rounded-full transition-all duration-300 ring-1 ring-inset  ring-red-500/20"
            >
              Delete
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptCard;
