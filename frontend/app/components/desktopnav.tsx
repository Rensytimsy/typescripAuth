import { PiUserCircle } from "react-icons/pi";
import Link from "next/link";


export default function DesktopNavigation(){
    return (
        <>
            <div className="w-full flex flex-row justify-around p-4 bg-blue-300 max-h-[60px]">
                <div className="font-semibold">Logo</div>
                <div>
                    <ul className="flex flex-row space-x-4">
                        <li>
                            Home
                        </li>
                        <li>
                            About
                        </li>
                        <li>
                            Contact us
                        </li>
                    </ul>
                </div>
                <div className="flex flex-row justify-between space-x-2 w-[250px] h-auto">
                    <Link
                    href="/pages/signin"
                    >
                        <button
                        className="h-8 p-1 rounded-sm bg-amber-200 font-bold cursor-pointer hover:bg-amber-300"
                        >sign in</button>
                    </Link>
                    <div className="bg-white h-8 rounded-full">
                        <div className="flex flex-row justify-around w-[150px]">
                            <PiUserCircle size={32}/>
                            <p className="mt-1">
                                Hello Timo!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}