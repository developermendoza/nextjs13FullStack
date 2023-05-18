"use client";
import { useState, useEffect } from "react";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParamas = useSearchParams();
  const promptId = searchParamas.get("id");
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        console.log("data: ", data);
        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (error) {
        console.log(error);
      }
    };
    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Prompt ID not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
