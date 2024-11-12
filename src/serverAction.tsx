"use server";
import { cookies } from "next/headers";

export const addUser = async (formData: FormData) => {
  const cookieStore = await cookies();
  const response = await fetch("http://localhost:3000/api/user", {
    method: "POST",
    body: JSON.stringify({ name: formData.get("name") }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  cookieStore.set({
    name: "user_id",
    value: data._id,
    httpOnly: true,
    path: "/",
  });
  console.log(data);
};

export const handlePopClick = async () => {
  const cookieStore = await cookies();
  const userID = cookieStore.get("user_id");
  await fetch("http://localhost:3000/api/score/", {
    method: "POST",
    body: JSON.stringify({ userID: userID?.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getScore = async () => {
  const cookieStore = await cookies();
  const userID = cookieStore.get("user_id")?.value;
  
  const response = await fetch(`http://localhost:3000/api/score/${userID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch score");
    return 0; // or handle error appropriately
  }

  const data = await response.json();
  return data.user.counter; // Assuming the response has a score property
};

