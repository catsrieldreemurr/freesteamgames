"use client"

import Footerbar from "@/components/ui/footer";
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

      try{

        if(res.status === 200 && Array.isArray(data.Data)){
          setdata(data.Data);
          setFailed(false)
          setErrorNumber(res.status)
        }
        else{
          setdata([]);
          setFailed(res.status !== 200 || false);
          setErrorNumber(res.status)
          setErrorMessage(data.Message || 'No data returned')
        }
      } catch(err){
        setFailed(true)
        setdata([])
        setErrorNumber(500)
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
          dataState ? <div className="bg-steam_back">
            {dataState.map((key, index) => {
              const currentData = dataState[index];
              return (
              <GameBox key={index} 
              title={currentData.title} 
              image={currentData.image}
              description={currentData.description}
              worth={currentData.worth}
              open_giveaway={currentData.open_giveaway}
              gamerpower_url={currentData.gamerpower_url}
              end_date={currentData.end_date}
              ></GameBox>)
            })}

        <div className={`${(errorNumber === 200 && dataState?.length === 0) && 'hidden'}`}><Footerbar></Footerbar> </div>
          </div> : <div className="flex text-white justify-center items-center gap-10 h-screen">
              <Spinner className="size-10"></Spinner>
              <p className="text-4xl font-bold">Loading....</p>
          </div>
        }
      </div>
    }

    {
      (!failed && (errorNumber === 200 && dataState?.length === 0)) && <div className="text-white flex flex-col justify-center items-center h-screen bg-steam_back"> {/* I have no idea if this works or not, fingers crossed it does */}
        <h1 className="text-3xl font-bold">No Giveaways found!</h1>
        <h2 className="text-2xl">Come back later!</h2>
        <Footerbar></Footerbar>
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
