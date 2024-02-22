// @ts-nocheck
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { Icon } from "@iconify/react";
import checkmarkCircle2Outline from "@iconify/icons-eva/checkmark-circle-2-outline";
import radioButtonOffOutline from "@iconify/icons-eva/radio-button-off-outline";
// material
import { Paper, Typography, Box, Checkbox } from "@mui/material";
import Label from "../../Label";
import useSettings from "../../../hooks/useSettings";
//

// ----------------------------------------------------------------------

SettingsIndicatorsCard.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  onDeleteTask: PropTypes.func,
};

export default function SettingsIndicatorsCard ({ card, onDeleteTask, index, columnName }) {
  const [openDetails, setOpenDetails] = useState(false);
  const [completed, setCompleted] = useState(false);
  const {handleSelectedIndicator} = useSettings()

  useEffect(() => {
    setCompleted(card?.completed);
  }, []);

  const handleOpenDetails = (card) => {
    handleSelectedIndicator(card);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleChangeComplete = (event) => {
    setCompleted(event.target.checked);
  };

  return (
    <>
      {card && (
        <Draggable  draggableId={card?.id} index={index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <Paper

                sx={{
                  px: 2,
                  width: 1,
                  position: "relative",
                  boxShadow: (theme) => theme.customShadows.z1,
                  "&:hover": {
                    boxShadow: (theme) => theme.customShadows.z16,
                  },
                }}
              >
                <Box onDoubleClickCapture={() => alert('h')} onClick={() => handleOpenDetails(card)} sx={{ cursor: "pointer" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      py: 4,
                      pl: 3,
                      transition: (theme) =>
                        theme.transitions.create("opacity", {
                          duration: theme.transitions.duration.shortest,
                        }),
                      ...(completed && { opacity: 0.48 }),
                    }}
                  >
                    {card && <>{card?.name}</>}
                  </Typography>

                  <Label
                    style={{ position: "absolute", top: "5px", right: '5px' }}
                    variant={"ghost"}
                    color={columnName !== 'Live Indicators' ? "info" : "success"}
                  >
                   
                    {card.group}
                  </Label>
                </Box>

                {/* <Checkbox
                  disableRipple
                  checked={completed}
                  icon={<Icon icon={radioButtonOffOutline} />}
                  checkedIcon={<Icon icon={checkmarkCircle2Outline} />}
                  onChange={handleChangeComplete}
                  sx={{ position: "absolute", bottom: 15 }}
                /> */}
              </Paper>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
}
