# Frontend Task Zania

I have followed a bottom-up approach while designing the architecture of the app. First I have created the components like cards, spinner, modal and then use those components to create widgets like cardsList and SaveInfo. In the end I binded it up to a page called DragAndDropGridPage. 

## Spinner

For the spinner I first used a gif background image to show until the image is loaded. As no extra code was required for the functionality. But I found that by doing this we are increasing the size of the project as we need to keep a gif within the project which will itself take some time to load. So I scrap that idea and created a universal spinner component which I used in multiple places. It contains the size prop so that we can make it small if we want. It can also take custom class name so that it can work fine in any location.

## Cards

The Card component is a reusable React component designed to represent a card element with drag-and-drop functionality. It's intended to be used within a sortable list or grid, such as a Kanban board or a gallery. I have used useState for Image Loading State, useSortable (DND-KIT) for Drag-and-Drop Functionality and it handles two events one is for click and one is for drag.

## Modal

The component defines two event handlers: handleOutsideClick and handleBodyClick.
The component utilizes the useEffect hook to add and remove a keydown event listener on the window object.
When the component mounts, it adds an event listener for the escape key (ESC_KEY_CODE) to trigger the onClose callback.
When the component unmounts, it removes the event listener to prevent memory leaks.
The component renders the children prop, allowing the parent component to provide custom content inside the modal.

## CardsList

It utilizes the @dnd-kit/core and @dnd-kit/sortable libraries to implement drag-and-drop functionality seamlessly. The component utilizes the useSensors hook from @dnd-kit/core to create drag sensors. It uses a PointerSensor with an activation constraint to detect drag movements. 

## Use of MSW
I used MSW to mock the get and post apis. Also added a small delay into it. 
