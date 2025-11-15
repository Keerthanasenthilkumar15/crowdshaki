"use server"

import { NextRequest } from "next/server"
import nodemailer from "nodemailer";

export const personalDetails = async(formdata: FormData, userId: string|null) => {
    
    const firstName = formdata.get("firstName")
    const lastName = formdata.get("lastName")
    const mailid = formdata.get("email")
    const mobile = formdata.get("mobile")
    const address = formdata.get("address")
    const pincode = formdata.get("pincode")

    const res = await fetch("https://crowdshaki.vercel.app/api/personalDetails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName,
            lastName,
            mailid,
            mobile,
            address,
            pincode,
            userId
        })
    })

    // const data = await res.json()
    // console.log(data)
    // return data
}