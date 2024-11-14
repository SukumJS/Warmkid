"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { baseURL } from "@/config/config";

export const checkCoookie = async () => {
  const cookieStore = await cookies();
  const userID = cookieStore.get("user_id");

  if (userID) return true;
  else return false;
};

export const addUser = async (formData: FormData) => {
  const cookieStore = await cookies();
  const response = await fetch(baseURL + "/api/user", {
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
  redirect('/')
};

export const handlePopClick = async () => {
  try {
    const cookieStore = await cookies();
    const userID = cookieStore.get("user_id")?.value;
    await fetch(baseURL + `/api/score`, {
      method: "POST",
      body: JSON.stringify({ userID: userID }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const handleAnswerSubmit = async (resultArray: boolean[]) => {
  try {
    const cookieStore = await cookies();
    console.log("letgo : " + resultArray);

    const userID = cookieStore.get("user_id")?.value;
    const response = await fetch(`http://localhost:3000/api/quizz`, {
      method: "POST",
      body: JSON.stringify({ id: userID, answer: resultArray }),
      headers: {
      "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to submit answers");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getScore = async () => {
  const cookieStore = await cookies();
  const userID = cookieStore.get("user_id")?.value;

  // Check if userID is available in the cookies
  if (!userID) {
    console.error("User ID not found in cookies.");
    return 0;
  }

  const response = await fetch(baseURL + `/api/score/${userID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch score");
    return 0; // Return 0 if fetching the score fails
  }

  try {
    const data = await response.json();

    // Check if the response has the user object with the counter
    if (data?.user?.counter !== undefined) {
      return data.user.counter; // Return the counter if it's available
    } else {
      console.error("Counter is undefined or not available.");
      return 0; // Return 0 if counter is undefined
    }
  } catch (error) {
    console.error("Error parsing response JSON:", error);
    return 0; // Return 0 if parsing fails
  }
};

export const getTotalScore = async () => {
  const response = await fetch(baseURL + "/api/score/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch total score");
    return 0;
  }

  const data = await response.json();
  return data.total;
};

export const getLeaderboard = async () => {
  const response = await fetch(baseURL + "/api/leaderboard/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
