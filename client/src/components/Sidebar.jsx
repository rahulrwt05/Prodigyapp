import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const linkData = [
  { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Completed", link: "completed", icon: <MdTaskAlt /> },
  {
    label: "In Progress",
    link: "in-progress",
    icon: <MdOutlinePendingActions />,
  },
  { label: "To Do", link: "todo", icon: <MdOutlinePendingActions /> },
  { label: "Team", link: "team", icon: <FaUsers /> },
  { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname;
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      dispatch(setOpenSidebar(false));
    }
  };

  const isActive = (link) => path.startsWith(`/${link}`);

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      {/* Logo */}
      <h1 className="flex gap-1 items-center">
        <p className="bg-blue-600 p-2 rounded-full">
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-black">TaskZen</span>
      </h1>

      {/* Sidebar Links */}
      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((el) => (
          <Link
            key={el.label}
            to={el.link}
            onClick={closeSidebar}
            className={clsx(
              "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
              isActive(el.link) ? "bg-blue-700 text-neutral-100" : ""
            )}
          >
            {el.icon}
            <span className="hover:text-[#2564ed]">{el.label}</span>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div>
        <p className="text-xs text-gray-500 mt-4">
          Copyright © 2024. All Rights Reserved
          <br />
          Made with 💙 by Abhishek
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
