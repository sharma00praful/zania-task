import { useEffect, useState } from "react";
import Header from "../widgets/TEST/Header";
import TaskTile from "../widgets/TEST/TaskTile";
import Modal from "../components/TEST/Modal";

const TestPage = ({}) => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const getTasks = () => {
    fetch("http://localhost:8000/tasks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  };

  const handleTileClick = (item) => {
    setModalData(item);
    setShowModal(true);
  };
  const handleOnSave = (item) => {
    fetch(`http://localhost:8000/tasks/${item.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="page-container">
      <div>ZANIA TMS</div>
      <Header />
      {tasks.map((item, index) => {
        return (
          <TaskTile
            title={item.title}
            key={`tasktile-${index}`}
            onClick={() => handleTileClick(item)}
          />
        );
      })}
      {showModal ? (
        <Modal
          title={modalData?.title}
          desc={modalData?.description}
          category={modalData?.category}
          id={modalData?.id}
          onSave={handleOnSave}
        />
      ) : null}
    </div>
  );
};

export default TestPage;

