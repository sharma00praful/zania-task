import { useState } from "react";
import CardsList from "../widgets/CardsList";
import Modal from "../components/Modal";

const DragAndDropGridPage = ({}) => {
  const [modalData, setModalData] = useState({ isVisible: false, img: "" });

  const handleCardClick = (item) => {
    if (item?.thumbnail) {
      setModalData({ isVisible: true, img: item.thumbnail });
    }
  };
  const handleModalClose = () => {
    setModalData({ isVisible: false, img: "" });
  };
  const DATA = [
    {
      type: "bank-draft",
      title: "Bank Draft",
      position: 0,
      thumbnail:
        "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      type: "bill-of-lading",
      title: "Bill of Lading",
      position: 1,
      thumbnail:
        "https://static.scientificamerican.com/sciam/cache/file/F766A67E-A8AA-4C90-A929C9AC67075D4B_source.jpg?w=1200",
    },
    {
      type: "invoice",
      title: "Invoice",
      position: 2,
      thumbnail:
        "https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k",
    },
    {
      type: "bank-draft-2",
      title: "Bank Draft 2",
      position: 3,
      thumbnail:
        "https://headsupfortails.com/cdn/shop/articles/Cat_s_Mind.jpg?v=1624444348",
    },
    {
      type: "bill-of-lading-2",
      title: "Bill of Lading 2",
      position: 4,
      thumbnail:
        "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
    },
  ];
  return (
    <div className="page-container">
      <h1 className="page-title">ZANIA FRONTEND ASSIGNMENT</h1>
      <CardsList data={DATA} onCardClick={handleCardClick} />
      {modalData?.isVisible ? (
        <Modal onClose={handleModalClose}>
          <img src={modalData?.img} className="popup-image" />
        </Modal>
      ) : null}
    </div>
  );
};
export default DragAndDropGridPage;

