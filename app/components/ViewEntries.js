import React from 'react';
import PropTypes from 'prop-types';
import AuthEntry from '@Components/AuthEntry';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const getItemStyle = (isDragging, draggableStyle, entryColor) => ({
  userSelect: 'none',
  backgroup: isDragging ? 'lightgreen' : entryColor,
  ...draggableStyle
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ViewEntries = ({ entries, onEdit, onRemove, onCopyToken, canEdit, updateEntries }) => {
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
  
    const items = reorder(
      entries,
      result.source.index,
      result.destination.index
    );
  
    updateEntries(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="auth-list"
          >
            {entries.map((entry, index) => (
              <Draggable key={`${entry.service}-${index}`} draggableId={`${entry.service}-${index}`} index={index}>
                {(provided, snapshot) => (
                  <AuthEntry
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    innerRef={provided.innerRef}
                    key={index}
                    id={index}
                    entry={entry}
                    onEdit={onEdit}
                    onRemove={onRemove}
                    onCopyToken={onCopyToken}
                    canEdit={canEdit}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

ViewEntries.propTypes =  {
  entries: PropTypes.arrayOf(PropTypes.object),
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onCopyToken: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
  updateEntries: PropTypes.func.isRequired
};

export default ViewEntries;
