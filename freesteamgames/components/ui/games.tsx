import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";

interface types{
    title: string
    worth: string
    image: string
    description: string
    end_date: string
    gamerpower_url: string
    open_giveaway: string
}


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]


export default function GameBox({image, title, worth, description, open_giveaway, gamerpower_url, end_date}:types) {
    return (
        <div className="p-5">
            <div className="sm:flex gap-15 justify-center">
                <Image src={image} alt="ImageUrl" height={400} width={400} className="rounded-lg"></Image>

                <div className="sm:w-1/3 text-white text-center sm:text-left bg-steam_back">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="text-sm">{description}</p>
                    <p className="pt-5">Price: <span className="line-through text-red-200">{worth}</span></p>

                    <p>Ends: <span className="font-bold">{end_date.substring(8,10)}. {months[parseInt(end_date.substring(5,7)) - 1]} {end_date.substring(0,4)} at {end_date.substring(11, end_date.length)}</span></p>

                    <div className="flex justify-center items-center sm:justify-normal sm:items-normal mt-5 gap-5">
                        <Link href={open_giveaway}>
                            <Button className="bg-steam hover:bg-steam2">
                                <Image src={"/steamLogo.png"} height={25} width={25} alt="SteamLogo"></Image>
                                Get on Steam
                            </Button>
                        </Link>

                        
                        <Link href={gamerpower_url}>
                            <Button className="bg-steam hover:bg-steam2">
                                <Image src={"/gamerPower.png"} height={25} width={25} alt="SteamLogo"></Image>
                                Open in GamerPower
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    )
}