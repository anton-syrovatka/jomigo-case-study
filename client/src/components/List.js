import { useState } from "react";

import "./List.css";

const getItemTitle = (doc = {}) =>
  [
    `#${doc.flight_number}`,
    doc.name,
    doc.date_utc?.split("T")[0],
    doc.success ? "😀" : "😔",
  ].join(" | ");

const List = ({ launches, loading }) => {
  const [selectedItem, setSelectedItem] = useState();

  if (loading) {
    return "Loading ...";
  }

  const onItemClick = (e) => {
    const id = e?.currentTarget?.dataset?.id;
    setSelectedItem((prevId) => (prevId !== id ? id : null));
  };

  return (
    <div className="List">
      {launches.length === 0 && <div className="List-item">No Content</div>}
      {launches.map((doc) => (
        <div
          key={doc.id}
          className="List-item"
          data-id={doc.id}
          onClick={onItemClick}
        >
          <div>{getItemTitle(doc)}</div>
          {selectedItem === doc.id && (
            <div>
              <i>{doc.details || "No details"}</i>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
