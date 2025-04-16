import React from "react";
import { NavLink } from "react-router-dom";

export const SideBar: React.FC = () => {
    return (
        <aside>
            <nav>
                <ul className="list-none">
                    <li>
                        <NavLink to="/posts">Posts</NavLink>
                    </li>

                    <li>
                        <NavLink to="/social">Social</NavLink>
                    </li>

                    <li>
                        <NavLink to="/chat">Chat</NavLink>
                    </li>

                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>

                    <li>
                        <NavLink to="/inbox">Inbox</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}