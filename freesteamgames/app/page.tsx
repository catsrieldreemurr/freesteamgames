"use client"

import Navbar from "@/components/ui/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

interface gameInfo{
  id: number
  title: string
  worth: string
  thumbnail: string
  image: string
  description: string
  instructions: string
  open_giveaway_url: string
  published_date: string
  type: string
  platforms: string
  end_date: string
  users: number
  status: string
  gamepower_url: string
  open_giveaway: string
}

interface dataInt{
  Success: boolean
  Message: string
  Data: gameInfo[];
}

export default function Home() {
  const [dataState, setdata] = useState<gameInfo[] | null>(null)

  useEffect(() => {
    async function getData(){
      const res = await fetch("/api/getGames")
      const data = await res.json();

      setdata(data.Data);
    }
    getData()
  }, [])

  return (
    <div className="bg-steam_back h-screen">
      <Navbar></Navbar>
      <div>
        {
          dataState ? <div>
            {dataState.map((key, index) => {
              return <h1 key={index}>{dataState[index].id}</h1>
            })}
          </div> : "loading"
        }
      </div>
    </div>
  );
}
