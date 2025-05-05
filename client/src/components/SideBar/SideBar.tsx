import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideItem from "./SideItem";
import { useUserContext } from "../../hooks/useUserContext";

export const SideBar: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { setUser, isAuthenticated } = useUserContext();

    const handleLogout = async () => {
        setUser(null);
    };

    return (
        <aside className="ml-6">
            <nav>
                <ul className="list-none w-[212px] p-0 m-0">
                    <Link to="/">
                        <SideItem active={pathname === "/"} iconActive="/icons/post-selected.png" iconInactive="/icons/post.png">
                            Posts
                        </SideItem>
                    </Link>

                    {
                    isAuthenticated ?    
                    <>
                        <Link to="/social">
                            <SideItem active={pathname === "/social"} iconActive="/icons/social-selected.png" iconInactive="/icons/social.png">
                                Social
                            </SideItem>
                        </Link>
                        
                        <Link to="/chat">
                            <SideItem active={pathname === "/chat"} iconActive="/icons/chat-selected.png" iconInactive="/icons/chat.png">
                                Chat
                            </SideItem>
                        </Link>

                        <Link to="/profile">
                            <SideItem active={pathname === "/profile"} iconActive="/icons/profile-selected.png" iconInactive="/icons/profile.png">
                                Profile
                            </SideItem>
                        </Link>

                        <Link to="/inbox">
                            <SideItem active={pathname === "/inbox"} iconActive="/icons/inbox-selected.png" iconInactive="/icons/inbox.png">
                                Inbox
                            </SideItem>
                        </Link>

                        <button onClick={handleLogout} className="w-full">
                            <li className={`
                                flex
                                items-center
                                cursor-pointer
                                text-[24px]/[29px]
                                mb-4
                                gap-[22px]
                                rounded-md
                                p-3
                                bg-gradient-to-r from-red-500 to-red-400 text-white
                            `}>
                                <img src={"/icons/logout.png"} />
                                Logout
                            </li>
                        </button>
                    </> :
                    <button onClick={() => navigate("/login")} className="w-full">
                        <li className={`
                            flex
                            items-center
                            cursor-pointer
                            text-[24px]/[29px]
                            mb-4
                            gap-[22px]
                            rounded-md
                            p-3
                            bg-gradient-to-r from-emerald-500 to-emerald-400 text-white
                        `}>
                            <img src={"/icons/logout.png"} />
                            Login
                        </li>
                    </button>
                    }
                </ul>
            </nav>
        </aside>
    );
}