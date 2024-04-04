import { useState } from "react";
import "./style.css";
const Modal = ({ onClose, title, category, desc, onSave, id }) => {
  const [item, setItem] = useState({
    title: title,
    category: category,
    desc: desc,
    id: id,
  });

  return (
    <div className="modalContainer">
      <div className="modalBody">
        <input
          type="text"
          value={item.title}
          onChange={(e) =>
            setItem({
              title: e.target.value,
              category: category,
              desc: desc,
              id: id,
            })
          }
        />
        <input
          type="text"
          value={item.category}
          onChange={(e) =>
            setItem({
              title: title,
              category: e.target.value,
              desc: desc,
              id: id,
            })
          }
        />
        <input
          type="text"
          value={item.desc}
          onChange={(e) =>
            setItem({
              title: title,
              category: category,
              desc: e.target.value,
              id: id,
            })
          }
        />
        <button onClick={() => onSave(item)}>save</button>
      </div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

export default Modal;

