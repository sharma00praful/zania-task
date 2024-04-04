import "./style.css";

const TaskTile = ({ title, onClick }) => {
  return (
    <div className="task-tile-container task-tile-box" onClick={onClick}>
      <div>{title}</div>
      <div className="task-tile-container">
        <button>Done</button>
        <button>&times;</button>
      </div>
    </div>
  );
};
export default TaskTile;

