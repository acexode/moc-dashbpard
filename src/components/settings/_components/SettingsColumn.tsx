// @ts-nocheck
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// material
import { Paper, Stack, Button } from '@mui/material';

import SettingsIndicatorsCard from './SettingsIndicatorsCard';
import SettingsColumnToolBar from './SettingsColumnToolBar';
import { indicatorBoard } from "../board";

// ----------------------------------------------------------------------

SettingsColumn.propTypes = {
  column: PropTypes.object,
  index: PropTypes.number
};

export default function SettingsColumn({ column, index }) {

  const { enqueueSnackbar } = useSnackbar();
  const [board, setboard] = useState(indicatorBoard)
  const [open, setOpen] = useState(false);
  const { name, cardIds, id } = column;
  const handleOpenAddTask = () => {
    setOpen((prev) => !prev);
  };

  const handleCloseAddTask = () => {
    setOpen(false);
  };

  const handleDeleteTask = (cardId) => {
    // dispatch(deleteTask({ cardId, columnId: id }));
    enqueueSnackbar('Delete success', { variant: 'success' });
  };

  const handleUpdateColumn = async (newName) => {
    try {
      if (newName !== name) {
        // dispatch(updateColumn(id, { ...column, name: newName }));
        enqueueSnackbar('Update success', { variant: 'success' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
    //   dispatch(deleteColumn(id));
      enqueueSnackbar('Delete success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = (task) => {
    // dispatch(addTask({ card: task, columnId: id }));
    enqueueSnackbar('Add success', { variant: 'success' });
    handleCloseAddTask();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          sx={{ px: 2, bgcolor: 'grey.5008' }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <SettingsColumnToolBar
              columnId={id}
              columnName={name}
              onDelete={handleDeleteColumn}
              onUpdate={handleUpdateColumn}
            />

            <Droppable droppableId={id} type="task">
              {(provided) => (
                <Stack ref={provided.innerRef} {...provided.droppableProps} spacing={2} width={400} style={{height: '2500px'}}>
                  {cardIds.map((cardId, index) => {
                    const card = board?.cards[cardId];
                    return <SettingsIndicatorsCard columnName={column.name} key={cardId} onDeleteTask={handleDeleteTask} card={card} index={index} />;
                  })}
                  {provided.placeholder}
                 
                </Stack>
              )}
            </Droppable>

            
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
