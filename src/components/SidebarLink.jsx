import React from 'react';
import { Link } from 'react-router-dom';

function SidebarLink(props) {
  const { active, title, link, children } = props;
  return (
    <div
      className={`sidebar__link__item cursor-pointer ${
        active ? 'sidebar__link__active' : ''
      }`}
    >
      <Link to={link} className="flex">
        <span>{children}</span>
        <span className="ml-4 flex-grow">{title}</span>
        {active && <span className="text-white font-semibold">|</span>}
      </Link>
    </div>
  );
}

export default SidebarLink;
