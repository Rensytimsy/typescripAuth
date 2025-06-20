import { HiHome } from "react-icons/hi2";
import { PiUserCircleFill } from "react-icons/pi";



export default function SideBar(){
    return (
        <div className="fixed top-0 bg-blue-300 w-[50px] h-[100vh] flex flex-col">
            <div className="mt-12">
                {/* <p className="ml-2">Logo</p> */}
            </div>
            <div className="mt-8 justify-center  align-center space-y-4">
                <div className="hover:bg-white hover:text-black p-2 cursor-pointer">
                    <HiHome size={24}/>
                </div>
                <div className="hover:bg-white hover:text-black p-2 cursor-pointer">
                    <PiUserCircleFill size={24}/>
                </div>
            </div>
        </div>
    )
}