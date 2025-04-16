import React from "react";
import { Link, useLocation } from "react-router-dom";
import SideItem from "./SideItem";

export const SideBar: React.FC = () => {
    const { pathname } = useLocation();

    return (
        <aside className="ml-6">
            <nav>
                <ul className="list-none w-[212px] p-0 m-0">
                    <Link to="/posts">
                        <SideItem active={pathname === "/posts"} iconActive="/icons/post-selected.png" iconInactive="/icons/post.png">
                            Posts
                        </SideItem>
                    </Link>

                    <Link to="/social">
                        <SideItem active={pathname === "/social"} iconActive="/icons/post-selected.png" iconInactive="/icons/post.png">
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
                </ul>
            </nav>
        </aside>
    );
}