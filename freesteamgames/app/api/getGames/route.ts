import { NextResponse } from "next/server";

const APICALL = "https://www.gamerpower.com/api/giveaways?platform=steam&type=game"

export async function GET(){
    try{
        const res = await fetch(APICALL);

        const data = await res.json(); 

        if(!res.ok){
            return NextResponse.json({
                Success: false,
                Message: res.statusText,
                ErrCode: res.status
            }, {status: res.status})
        }

        return NextResponse.json({
            Success: true,
            Message: 'Successfully fetched Data',
            Data: data
        }, {status: 200})

    } catch(err){
        return NextResponse.json({
            Success: false,
            Message: "Something bad happened. Our bad.",
        }, {status: 500})
    }
}