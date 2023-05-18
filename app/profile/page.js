"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MyProfile from "@components/MyProfile";
const Profile = () => {
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (session?.user?.id) {
      const fetchPrompts = async () => {
        try {
          const response = await fetch(`/api/users/${session.user.id}/prompts`);
          const data = await response.json();
          setPrompts(data);
        } catch (error) {
          console.log("error: ", error);
        }
      };

      fetchPrompts();
    }
  }, [session]); // Add session to the dependency array
  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    console.log("prompt: ", prompt._id);

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPrompts = prompts.filter(
          (item) => item._id !== prompt._id
        );
        setPrompts(filteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <MyProfile
      name={session?.user.name}
      desc="Welcome to your personalized profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Profile;
