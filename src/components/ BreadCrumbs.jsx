import React from 'react';
import uuid from '../utils/uuid';

function BreadCrumbs({ items }) {
  return (
    <div className="mt-4">
      <ul className="flex text-gray-500">
        {items.map((item, index) => (
          <li className="" key={uuid()}>
            <a href={item.url} className="flex">
              <div className="flex items-center">
                <span>{item.title}</span>
                {index !== items.length - 1 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BreadCrumbs;
