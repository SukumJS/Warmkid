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
