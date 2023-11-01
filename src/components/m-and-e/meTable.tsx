import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { useState, SetStateAction, FC, useEffect } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Skeleton
} from "@mui/material";

// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import TableListHead from "./tableListHead";
import ListToolbar from "./tableListToolbar";
// import MoreMenu from "./TableMoreMenu";
import ViewDataModal from "./components/viewDataModal";
// import { useAuthUserContext } from "../../context/authUser.context";
import axiosInstance from "../../services/api_service";
import { getObjectById } from "../../utility";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function descendingComparator(
  a: { [x: string]: number },
  b: { [x: string]: number },
  orderBy: string | number
) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

// }
function applySortFilter(
  array: any[],
  comparator: { (a: any, b: any): number; (arg0: any, arg1: any): any },
  query: string
) {
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: number[], b: number[]) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user?.fieldToSearch?.toLowerCase().includes(query.toLowerCase())  ||
        // _user?.wardLocation?.toLowerCase().includes(query.toLowerCase())  ||
        _user?.lgaLocation?.toLowerCase().includes(query.toLowerCase())  ||
        _user?.stateLocation?.toLowerCase().includes(query.toLowerCase()) 
    );
  }
  return stabilizedThis.map((el: any[]) => el[0]);
}

interface ITable {
  table_Head: any;
  dataList: any;
  page_title: string;
  loading?:boolean;
  show?:boolean;
  setNeedle?:any
}

const METable: FC<ITable> = ({ dataList, page_title, table_Head,loading,show,setNeedle }) => {
  const { themeStretch } = useSettings();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState<any>([]);
  const [orderBy, setOrderBy] = useState("year");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [locations,setLocations] = useState([])

  useEffect(()=>{
    axiosInstance.get('locations').then(res =>{
      const options = res?.data?.map((dt:any) =>{
        return {
          label: dt?.name,
          id: dt?.id
        }
      })
      setLocations(options)
    }).catch(error =>{
      console.log(error)
    })
},[])

  let navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event: any, property: SetStateAction<string>) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: { target: { checked: any } }) => {
    if (event.target.checked) {
      const newSelecteds = dataList.map((n: any) => n?.location?.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: any, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setFilterName(event.target.value);
  };

  const handleSetRowData = (row: any, rowQ: number,rowTitle:string, rowNum:number) => {
    setRow(row);
    if (page_title === "LGA") {
      let ti = `${row?.fieldToSearch} LGA M&E Assessment for ${rowTitle} ${row?.year}`;
      setTitle(ti);
      navigate(PATH_DASHBOARD.m_and_e.viewAssessment, {
        state: {
          row,
          rowQ,
          page_title,
          rowTitle,
          rowNum
        },
      });
    } else if(page_title === "HF") {
      let ti = `${row?.fieldToSearch} HF M&E Assessment for ${rowTitle} ${row?.year}`;
      setTitle(ti);
      navigate(PATH_DASHBOARD.m_and_e.viewHFAssessment, {
        state: {
          row,
          rowQ,
          page_title,
          rowTitle,
          rowNum
        },
      });
    }
    else{
      let ti = `${row?.fieldToSearch} State M&E Assessment for ${rowTitle} ${row?.year}`;
      setTitle(ti);
      navigate(PATH_DASHBOARD.m_and_e.viewStateAssessment, {
        state: {
          row,
          rowQ,
          page_title,
          rowTitle,
          rowNum
        },
      });
    }

    // handleClickOpen();
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataList.length) : 0;

   
    let dataToSearch = dataList?.map((dt: any) =>{
        return {
          ...dt,
          wardLocation:getObjectById(dt?.wardLocation, locations)?.label,
          fieldToSearch: page_title === "LGA" ? dt?.location?.name : page_title === "HF" ?  dt?.facility : dt?.location?.name
        }
    })
    
  const filteredUsers = applySortFilter(
    dataToSearch,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0 && !loading;
  let dummyData = [...Array(10)]

  useEffect(()=>{
      if(filterName.length >= 3 && setNeedle){
        setNeedle(filterName)
      }
      else if(filterName.length === 0 && setNeedle){
        setNeedle("")
      }
  },[filterName])

 
  return (
    <>
      <Page title={`${page_title}: List | BHCFP`}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={`${page_title}`}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: `${page_title}`, href: page_title === "LGA"
              ? PATH_DASHBOARD.m_and_e.lga : page_title === "HF" ?
              PATH_DASHBOARD.m_and_e.hf 
              : PATH_DASHBOARD.m_and_e.state },
              { name: "List" },
            ]}
            action={
              show?   <Button
                variant="contained"
                component={RouterLink}
                disabled={page_title === "HF"}
                to={
                  page_title === "LGA"
                    ? PATH_DASHBOARD.m_and_e.newAssessmentLga : page_title === "HF" ?
                    PATH_DASHBOARD.m_and_e.newAssessmentHF 
                    : PATH_DASHBOARD.m_and_e.newAssessment
                }
                startIcon={<Icon icon={plusFill} />}
              >
                New Assessment
              </Button> :null
            }
          />

          <Card>
            <ListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={table_Head}
                    rowCount={dataList.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                 { loading ? <TableBody>
                   {dummyData?.map((dum) =>(
                         <TableRow
                            hover
                      
                            tabIndex={-1}
                            role="checkbox"
                          
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >            
                                <Skeleton variant="rectangular" width={100} height={30} />                               
                              </Stack>
                            </TableCell>
                            <TableCell
                              align="left"
                               
                              sx={{
                                cursor:
                                  row?.quarter === 1 ? "pointer" : "initial",
                                pointerEvents:
                                  row?.quarter === 1 ? "auto" : "none",
                              }}
                            >
                            <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                            <TableCell
                              align="left"
                              
                              sx={{
                                cursor:
                                  row?.quarter === 2 ? "pointer" : "initial",
                                pointerEvents:
                                  row?.quarter === 2 ? "auto" : "none",
                              }}
                            >
                             <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                            <TableCell
                              align="left"
                              
                              sx={{
                                cursor:
                                  row?.quarter === 3 ? "pointer" : "initial",
                                pointerEvents:
                                  row?.quarter === 3 ? "auto" : "none",
                              }}
                            >
                            <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                            <TableCell
                              align="left"
                            
                              sx={{
                                cursor:
                                  row?.quarter === 4 ? "pointer" : "initial",
                                pointerEvents:
                                  row?.quarter === 4 ? "auto" : "none",
                              }}
                            >
                             <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                          { page_title === "LGA" && <TableCell
                              align="left"
                            
                              sx={{
                                cursor:
                                  row?.quarter === 4 ? "pointer" : "initial",
                                pointerEvents:
                                  row?.quarter === 4 ? "auto" : "none",
                              }}
                            >
                             <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>}
                            {page_title === "HF" && <><TableCell
                              align="left"
                            
                              sx={{
                                cursor:
                                  row?.quarter === 4 ? "pointer" : "initial",
                                pointerEvents:
                                  row?.quarter === 4 ? "auto" : "none",
                              }}
                            >
                             <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                            <TableCell
                              align="left"
                            
                              sx={{
                                cursor:
                                  row?.quarter === 4 ? "pointer" : "initial",
                                pointerEvents:
                                  row?.quarter === 4 ? "auto" : "none",
                              }}
                            >
                             <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                            <TableCell
                              align="left"
                            
                              sx={{
                                cursor:
                                  row?.quarter === 4 ? "pointer" : "initial",
                                pointerEvents:
                                  row?.quarter === 4 ? "auto" : "none",
                              }}
                            >
                             <Skeleton variant="rectangular" width={100} height={30} /> 
                            </TableCell>
                            </>}
                            <TableCell align="left">
                            <Skeleton variant="rectangular" width={100} height={30} /> 
                              </TableCell>

                            <TableCell align="right"></TableCell>
                          </TableRow>
                   ))}
                  </TableBody> :
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: any, index: number) => {
                        const isItemSelected =
                          selected.indexOf(row?.year) !== -1;

                        return (
                          <TableRow
                            hover
                            key={index}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                              <Typography variant="subtitle2" noWrap>
                                {page_title === "LGA"
                                  ? row?.stateLocation || "Nil"
                                  : page_title === "HF" ? row?.stateLocation || "Nil" : row?.location?.name || "Nil"}
                              </Typography>
                              </Stack>
                            </TableCell>
                          {page_title !== "State" && <TableCell
                            align="left"
                            padding="none"
                          >
                            <Typography variant="subtitle2" noWrap>
                              {page_title === "LGA"
                                ? row?.lgaLocation || "Nil"
                                : page_title === "HF" ? row?.lgaLocation  || "Nil" : row?.location?.name || "Nil"}
                            </Typography>
                          </TableCell>}
                          {page_title === "HF" && <TableCell
                            align="left"
                            padding="none"
                          >
                            <Typography variant="subtitle2" noWrap>
                             {row?.wardLocation
                              ? typeof row?.wardLocation === 'string'
                                ? row.wardLocation
                                : getObjectById(row?.wardLocation, locations)?.label
                              : 'Nil'}
                            </Typography>
                          </TableCell>}
                          {page_title === "HF" && <TableCell
                            align="left"
                            padding="none"
                          >
                            <Typography variant="subtitle2" noWrap>
                              {row?.facility || "Nil"}
                            </Typography>
                          </TableCell>}
                            <TableCell
                              align="left"
                              onClick={() => handleSetRowData(row, row?.quarters?.Q1?.id,"Q1",1)}
                              sx={{
                                cursor:
                                  row?.quarters?.Q1?.exists ? "pointer" : "initial",
                                pointerEvents:
                                row?.quarters?.Q1?.exists ? "auto" : "none",
                                  textDecoration: row?.quarters?.Q1?.exists ? "underline" : "none"
                              }}
                            >
                              { row?.quarters?.Q1?.exists ? "Done" : "Pending"
                              }
                           
                            </TableCell>
                            <TableCell
                              align="left"
                              onClick={() => handleSetRowData(row, row?.quarters?.Q2?.id,"Q2",2)}
                              sx={{
                                cursor:
                                row?.quarters?.Q2?.exists ? "pointer" : "initial",
                                pointerEvents:
                                  row?.quarters?.Q2?.exists ? "auto" : "none",
                                  textDecoration: row?.quarters?.Q2?.exists ? "underline" : "none"
                              }}
                            >
                               {row?.quarters?.Q2?.exists ? "Done" : "Pending"
                              }
                            </TableCell>
                            <TableCell
                              align="left"
                              onClick={() => handleSetRowData(row, row?.quarters?.Q3?.id,"Q3",3)}
                              sx={{
                                cursor:
                                  row?.quarters?.Q3?.exists ? "pointer" : "initial",
                                pointerEvents:
                                  row?.quarters?.Q3?.exists ? "auto" : "none",
                                  textDecoration: row?.quarters?.Q3?.exists ? "underline" : "none"
                              }}
                            >
                               {row?.quarters?.Q3?.exists ? "Done" : "Pending"
                              }
                            </TableCell>
                            <TableCell
                              align="left"
                              onClick={() => handleSetRowData(row, row?.quarters?.Q4?.id,"Q4",4)}
                              sx={{
                                cursor:
                                  row?.quarters?.Q4?.exists ? "pointer" : "initial",
                                pointerEvents:
                                  row?.quarters?.Q4?.exists ? "auto" : "none",
                                  textDecoration: row?.quarters?.Q4?.exists ? "underline" : "none"
                              }}
                            >
                               {row?.quarters?.Q4?.exists ? "Done" : "Pending"
                              }
                            </TableCell>
                            <TableCell align="left">
                          
                              { row?.year}
                             
                              </TableCell>

                            <TableCell align="right"></TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
}
                  {(isUserNotFound) && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataList?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
      <ViewDataModal
        open={open}
        handleClose={handleClose}
        rowData={row}
        title={title}
      />
    </>
  );
};

export default METable;
