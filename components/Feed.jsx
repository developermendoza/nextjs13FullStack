"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  console.log("data: ", data);
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchPrompts();
  }, []);

  const handleChange = () => {};
  return (
    <section className="feed">
      <input
        type="text"
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleChange}
        required
        className="search_input peer"
      />
      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
