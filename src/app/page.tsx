"use client";
import { addUser, handlePopClick } from "@/serverAction/serverAction";

export default function Home() {
  return (
    <>
      <h1>dasdasdasd</h1>

      <form action={addUser}>
        <input type="name" name="name" />
        <button>submit</button>
      </form>
      <button
        onClick={() => {
          handlePopClick();
        }}
      >
        Pop
      </button>
    </>
  );
}
