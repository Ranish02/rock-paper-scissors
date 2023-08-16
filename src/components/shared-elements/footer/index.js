import React from "react";
import { footerIcons } from "../../../data/icons";

// import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex text-xs md:text-xl justify-around py-6 bg-gray-900 text-white font-gamer">
      <span>Made by Ranish Kunwar</span>
      <div>
        <ul className="flex mt-auto">
          {footerIcons.map((icon) => (
            <li key={`footericon contact ${icon.id}`}>
              <a href={icon.link} target="_blank" rel="noopener noreferrer">
                {React.cloneElement(icon.icon, {
                  size: 25,
                  className: "mx-2",
                })}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
