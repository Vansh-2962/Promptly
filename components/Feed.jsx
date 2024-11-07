"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 grid md:grid-cols-3 grid-cols-1 gap-3">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]); // Store the original list of posts
  const [filteredPosts, setFilteredPosts] = useState([]); // Store filtered posts

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    if (searchText) {
      const filtered = allPosts?.filter(
        (post) =>
          post?.tag.toLowerCase().includes(searchText.toLowerCase()) ||
          post?.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
          post?.creator?.username
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(allPosts);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt`);
      const data = await response.json();
      setAllPosts(data);
      setFilteredPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="w-full flex items-center justify-center flex-col">
      <form className="flex justify-center w-full">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="bg-transparent border md:w-1/2 w-full rounded-full mt-5 p-2"
        />
      </form>
      <div className="md:w-3/4 md:mx-auto w-full ">
        <PromptCardList
          data={filteredPosts}
          handleTagClick={(tag) => {
            setSearchText(tag);
          }}
        />
      </div>
    </section>
  );
};

export default Feed;
