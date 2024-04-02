import { useState } from "react";
import Card from "../../components/Card";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import "./style.css";

const CardsList = ({ cardsData, setCardsData, onCardClick, onChange }) => {
  const [activeElement, setActiveElement] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleCardClick = (item) => {
    onCardClick(item);
  };

  const handleDragStart = (event) => {
    setActiveElement(
      cardsData.filter((item) => item.position === event.active.id)[0]
    );
  };

  const handleDragEnd = (event) => {
    setActiveElement(null);
    const { active, over } = event;
    if (!over || !active) {
      return;
    }
    if (active.id !== over.id) {
      setCardsData((items) => {
        const oldIndex = items.findIndex((item) => item.position === active.id);
        const newIndex = items.findIndex((item) => item.position === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      onChange();
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="cards-list-container">
        <SortableContext items={cardsData} strategy={rectSortingStrategy}>
          {cardsData?.map((item) => {
            return (
              <Card
                key={item.type}
                position={item.position}
                title={item.title}
                img={item.thumbnail}
                onClick={() => handleCardClick(item)}
              />
            );
          })}

          <DragOverlay>
            {activeElement ? (
              <Card
                isGrabbing
                position={activeElement?.position}
                title={activeElement?.title}
                img={activeElement?.thumbnail}
              />
            ) : null}
          </DragOverlay>
        </SortableContext>
      </div>
    </DndContext>
  );
};
export default CardsList;

