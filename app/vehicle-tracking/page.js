"use client";
import Link from "next/link"
import Image from "next/image"
import React,{useEffect} from "react";

export default function Vehicle_Tracking() {
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link href="/vehicle-tracking"><p>Vehicle Tracking</p></Link></li>
                            <li><Link href="/archive"><p>Archive</p></Link></li>
                            
                        </ul>
                    </div>
                    <Link href="/"><p className="btn btn-ghost text-xl"><Image src="/Screenshot 2025-02-19 230734.png" alt="logo" height={100} width={100} /></p></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/vehicle-tracking"><p>Vehicle Tracking</p></Link></li>
                        <li><Link href="/archive"><p>Archive</p></Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                </div>
            </div>

        </>
    )
}