"use client";
import { Inter } from "next/font/google";
import AddStory from "./story/add/page";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
        <AddStory />
  );
}
