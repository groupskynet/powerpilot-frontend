import React from 'react';
import '../assets/table.css';
import uuid from '../utils/uuid';

function Table({ columns, children }) {
  return (
    <div className="p-3 border rounded-lg">
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              {columns.map((item) => (
                <th key={uuid()}>
                  <div className="font-semibold text-left">{item}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
