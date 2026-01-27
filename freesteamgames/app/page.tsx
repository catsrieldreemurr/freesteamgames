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
  const [failed, setFailed] = useState(false)

  const [errorMessage, setErrorMessage] = useState("");
  const [errorNumber, setErrorNumber] = useState(0);

  useEffect(() => {
    async function getData(){
      const res = await fetch("/api/getGames")
      const data = await res.json();

      if(res.status === 200){
        setdata(data.Data);
        setFailed(false)
        setErrorNumber(res.status)
      }
      else if (res.status == 201){
        setFailed(false)
        setErrorNumber(res.status)
      }

      else if(res.status === 404 || res.status == 500){
        setFailed(true)
        setErrorNumber(res.status)
        setErrorMessage(res.statusText)
      }
    }
    getData()
    
  }, [])

  return (
    <div className="bg-steam_back h-screen">
      <Navbar></Navbar>

    {
      (!failed && errorNumber === 200) && <div>
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
    }

    {
      (!failed && errorNumber === 201) && <div>
        <h1 className="text-3xl font-bold">No Giveaways found!</h1>
        <h2 className="text-2xl">Come back later!</h2>
      </div>
    }

    {
      failed && <div className="flex flex-col justify-center items-center h-screen text-white bg-steam_back">
        <h1 className="text-3xl font-bold">Something went wrong.</h1>
        <h2 className="text-2xl">Try again later.</h2>

        <div className="mt-10">
          <h3>{errorNumber}, {errorMessage}</h3>
        </div>
      </div>
    }
    </div>
  );
}
