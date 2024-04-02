import { useState } from "react";
import CardsList from "../widgets/CardsList";
import Modal from "../components/Modal";
import SaveInformation from "../widgets/SaveInformation";
import Spinner from "../components/Spinner";
import { useEffect } from "react";

const DragAndDropGridPage = ({}) => {
  const [modalData, setModalData] = useState({ isVisible: false, img: "" });
  const [cardsData, setCardsData] = useState(null);
  const [lastSavedAt, setLastSavedAt] = useState("");
  const [isUnsavedChanges, setIsUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleCardClick = (item) => {
    if (item?.thumbnail) {
      setModalData({ isVisible: true, img: item.thumbnail });
    }
  };

  const handleModalClose = () => {
    setModalData({ isVisible: false, img: "" });
  };

  const handleCardsListChange = () => {
    setIsUnsavedChanges(true);
  };

  const fetchData = async () => {
    fetch("/api/get-cards")
      .then((response) => response.json())
      .then((data) => {
        setCardsData(data.data);
        setLastSavedAt(data.lastSavedAt);
      })
      .catch((error) => console.error(error));
  };

  const postData = async () => {
    setIsSaving(true);
    setCardsData((prev) => {
      const newCardsData = prev?.map((item, index) => {
        return { ...item, position: index + 1 };
      });
      fetch("/api/set-cards", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newCardsData }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.status === "success") setLastSavedAt(data.lastSavedAt);
          else console.error("save failed");
        })
        .finally(() => {
          setIsSaving(false);
        })
        .catch((error) => console.error(error));
      return prev;
    });
  };

  const autoSave = () => {
    //to deal with stale closure we are using state setter function here
    setIsUnsavedChanges((prev) => {
      if (prev) {
        postData();
        return !prev;
      } else return prev;
    });
  };

  useEffect(() => {
    fetchData();
    const autoSaveInterval = setInterval(autoSave, 5000);
    return () => clearInterval(autoSaveInterval);
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">ZANIA FRONTEND ASSIGNMENT</h1>
        {lastSavedAt ? (
          <SaveInformation lastSaved={lastSavedAt} isSaving={isSaving} />
        ) : null}
      </div>
      {cardsData ? (
        <CardsList
          cardsData={cardsData}
          setCardsData={setCardsData}
          onCardClick={handleCardClick}
          onChange={handleCardsListChange}
        />
      ) : (
        <Spinner className="page-loader" />
      )}

      {modalData?.isVisible ? (
        <Modal onClose={handleModalClose}>
          <img src={modalData?.img} className="popup-image" />
        </Modal>
      ) : null}
    </div>
  );
};

export default DragAndDropGridPage;

