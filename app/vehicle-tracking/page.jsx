import React from "react";
import DeliveryList from "@/componants/DeliveryList";



export default async function Vehicle_Tracking() {

    return (
        <>
            <div className="w-screen justify-center flex mt-10">
                <div className="w-fit"><DeliveryList /></div>
            </div>
        </>
    )
}