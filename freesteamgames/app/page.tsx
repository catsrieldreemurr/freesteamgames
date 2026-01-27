"use client"

import GameBox from "@/components/ui/games";
import Navbar from "@/components/ui/navbar";
import { Spinner } from "@/components/ui/spinner";
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
  gamerpower_url: string
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
              const currentData = dataState[index];
              return <GameBox key={index} 
              title={currentData.title} 
              image={currentData.image}
              description={currentData.description}
              worth={currentData.worth}
              open_giveaway={currentData.open_giveaway}
              gamerpower_url={currentData.gamerpower_url}
              end_date={currentData.end_date}
              ></GameBox>
            })}
          </div> : <div className="flex text-white justify-center items-center gap-10 h-screen">
              <Spinner className="size-10"></Spinner>
              <p className="text-4xl font-bold">Loading....</p>
          </div>
        }
      </div>
    </div>
  );
}
