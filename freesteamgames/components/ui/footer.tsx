import Link from "next/link";

interface setProps{
    amountOfGames: number
}

export default function Footerbar({amountOfGames}:setProps){
    return (
        <footer>
            <div className={`bg-steam2 p-5 text-white sm:flex sm:fixed inset-x-0 bottom-0`}>
                <div className="sm:w-1/3 flex justify-center flex-col items-center m-3">
                    <p className="text-lg font-bold underline">Created with ♡ by</p>
                    <p>CatsrielDreemurr</p>
                </div>

                <div className="sm:w-1/3 flex justify-center flex-col items-center m-3">
                    <p className="text-center">This website is NOT affiliated with Valve or Steam.</p>
                </div>

                <div className="sm:w-1/3 flex justify-center flex-col items-center m-3">
                    <p className="text-lg font-bold underline">Powered by</p>
                    <Link className="text-red-200 decoration-double hover:underline" href={"https://www.gamerpower.com/api-read"}>Gamerpower's API</Link>
                </div>
            </div>
        </footer>
    )
}