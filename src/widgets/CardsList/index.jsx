import Card from "../../components/Card";
import "./style.css";

const CardsList = ({ data, onCardClick }) => {
  const handleCardClick = (item) => {
    onCardClick(item);
  };
  return (
    <div className="cards-list-container">
      {data?.map((item) => {
        return (
          <Card
            key={item.type}
            title={item.title}
            img={item.thumbnail}
            onClick={() => handleCardClick(item)}
          />
        );
      })}
    </div>
  );
};
export default CardsList;

