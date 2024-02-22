// @ts-nocheck
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
// material
import { Container, Stack, Skeleton, Grid, Paper } from "@mui/material";

// components
import Page from "../Page";
import HeaderBreadcrumbs from "../HeaderBreadcrumbs";
import { indicatorBoard, indicatorGroupNo } from "./board";
import SettingsColumn from "./_components/SettingsColumn";
import { indicatorSettings } from "../../constants";
import SettingsColumnToolBar from "./_components/SettingsColumnToolBar";
import { AllIndicators } from "./allIndicators";
import useSettings from "../../hooks/useSettings";
import PreviewRenderer from "../_dashboard/PreviewCards";
const SkeletonLoad = (
  <>
    {[...Array(3)].map((_, index) => (
      <Grid item xs={12} md={3} key={index}>
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{ paddingTop: "115%", borderRadius: 2 }}
        />
      </Grid>
    ))}
  </>
);

export default function IndicatorSettings() {
  const { handleIndicatorUpdates, selectedIndicator, indicatorUpdates } = useSettings();
  const [board, setboard] = useState<{
    cards: any;
    columnOrder: any;
    columns: any;
  }>({ cards: {}, columnOrder: [], columns: [] });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log();
    if (localStorage.getItem(indicatorSettings)) {
      const bd = JSON.parse(localStorage.getItem(indicatorSettings) || "");
      // console.log(bd);
      setboard(bd);
      handleIndicatorUpdates(bd);
    } else {
      setboard(indicatorBoard);
      handleIndicatorUpdates(indicatorBoard);
    }
  }, []);
  useEffect(() => {
    setboard(indicatorUpdates)
   
      setboard(indicatorUpdates);
    
  }, [board]);

  const onDragEnd = (result: any) => {
    // Reorder card
    // console.log(result);
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "column") {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      // dispatch(persistColumn(newColumnOrder));
      enqueueSnackbar("Update success", { variant: "success" });
      return;
    }

    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    if (start.id === finish.id) {
      const updatedCardIds = [...start.cardIds];
      updatedCardIds.splice(source.index, 1);
      updatedCardIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...start,
        cardIds: updatedCardIds,
      };
      return;
    }

    const startCardIds = [...start.cardIds];
    startCardIds.splice(source.index, 1);
    const updatedStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = [...finish.cardIds];

    finishCardIds.splice(destination.index, 0, draggableId);
    const updatedFinish = {
      ...finish,
      cardIds: finishCardIds,
    };
    if (updatedFinish.name === "Live Indicators") {
      if (updatedFinish.cardIds.length > 14) {
        enqueueSnackbar("Dashboard can only display 14 Indicators", {
          variant: "error",
        });
        return;
      }
      const group = AllIndicators.filter((e) => e.id === draggableId)[0];
      const sameGroup = AllIndicators.filter(
        (e) => e.group === group.group
      ).map((e) => e.id);
      const members = updatedFinish.cardIds.filter((e: string) =>
        sameGroup.includes(e)
      );
      const max = indicatorGroupNo[group.groupKey];
      if (members.length > max) {
        enqueueSnackbar(
          `can only display ${max} indicators from ${group.group}`,
          {
            variant: "error",
          }
        );
        return;
      }
      const newBoard = {
        ...board,
        columns: {
          ...board.columns,
          [updatedStart.id]: updatedStart,
          [updatedFinish.id]: updatedFinish,
        },
      };
      setboard(newBoard);
      handleIndicatorUpdates(newBoard);
    } else {
      const newBoard = {
        ...board,
        columns: {
          ...board.columns,
          [updatedStart.id]: updatedStart,
          [updatedFinish.id]: updatedFinish,
        },
      };
      setboard(newBoard);
      handleIndicatorUpdates(newBoard);
    }

    // console.log(board);
    // console.log(newBoard);
  };

  // console.log(board);

  return (
    <Page title="Settings" sx={{ height: "100%" }}>
      <Container maxWidth={false} sx={{ height: "100%" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided: any) => (
              <Stack
                {...provided.draggableProps}
                ref={provided.innerRef}
                direction="row"
                alignItems="flex-start"
                spacing={3}
                sx={{ height: "calc(100% - 32px)", overflowY: "hidden" }}
              >
                {board &&
                  board.columnOrder.map((columnId: any, index: number) => {
                    const column = board.columns[columnId];
                    return (
                      <SettingsColumn
                        index={index}
                        key={columnId}
                        column={column}
                      />
                    );
                  })}

                {!board && !board?.columnOrder.length && SkeletonLoad}

                {/* {provided.placeholder}  */}
                <Paper variant="outlined" sx={{ px: 2, bgcolor: "grey.5008" }}>
                  <Stack spacing={3} {...provided.dragHandleProps}>
                    <SettingsColumnToolBar columnName="Preview" />
                    <Stack
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      spacing={2}
                      width={400}
                    >
                      {selectedIndicator && <PreviewRenderer groupKey={selectedIndicator.groupKey} />}
                    </Stack>
                  </Stack>
                </Paper>
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </Page>
  );
}
