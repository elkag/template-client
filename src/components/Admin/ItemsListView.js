import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getAuthorItemsApi } from '../../api/services/getAuthorItemsApi';
import { approveItemsApi } from '../../api/services/approveItemsApi';
import { Checkbox, IconButton, TablePagination, TableSortLabel, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { EDIT_ITEM_PAGE, VIEW_ITEM_PAGE } from '../../config/routes';
import { useHistory } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Loader from '../common/Loader';
import { UserContext } from '../../contexts/userContext';
import { getAllItemsApi } from '../../api/services/getAllItemsApi';
import { bgColor } from '../../styles/colors';
import ApproveItemsDialog from './dialogues/ApproveItemsDialog';
import DeleteItemDialog from './dialogues/DeleteItemDialog';
import { deleteItemApi } from '../../api/services/deleteItemApi';
import { ItemsListContext } from '../../contexts/itemsListContext';

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%'
  },
  tableRow: {
    height: "70px",
    th: {
      height: "70px !important",
    },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  tableRowUpdate: {
    height: "70px",
    th: {
      height: "70px !important",
    },
    '&:nth-of-type(odd)': {
      backgroundColor: "#ffe4c4",
    },
    '&:nth-of-type(even)': {
      backgroundColor: "#ffe4c4",
    },
  },
  pageWrapper: {
    width: '100%',
    height: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "top",
    backgroundColor: bgColor
},
visuallyHidden: {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  top: 20,
  width: 1,
},
root: {
 width: '100%'
},
paper: {
  height: '100%',
  marginBottom: theme.spacing(2),
},
applyWrapper: {
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: 20,
  bottom: 0
},
popper: {
  padding: 10
}
}));

export default function BasicTable() {

    const history = useHistory();
    const [user] = React.useContext(UserContext);
    const [rows, setRows] = React.useContext(ItemsListContext);
    
    const classes = useStyles();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [orderBy, setOrderBy] = React.useState("date");
    const [order, setOrder] = React.useState("desc");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(7);
    const [, setIsDialogOpen] = React.useState(false); 
    const [approveCandidates, setApproveCandidates] = React.useState([]);
    const [totalItems, setTotalItems] = React.useState(0);

    const openConfirmDialog = () => {
      setIsDialogOpen(true)
    }

    const handleApproveChange = (row) => {
      let updated = [...rows];
      let isUpdated = false;
      for(var i=0; i<updated.length; i++) {
        updated[i].forEach(element => {
          element.result.forEach(item => {
            if(item.id === row.id) {
              item.approved.current = !item.approved.current;
              if(!isUpdated && item.approved.current !== item.approved.original){
                setApproveCandidates([...approveCandidates, item]);
              } else {
                setApproveCandidates(approveCandidates.filter(i => i.id !== item.id))
              }
            }
            return item;
          })
        })
      }
      
      setRows(updated);
    };

    const editItem = (row) => {
      history.push(EDIT_ITEM_PAGE + `${row.id}/0`);
    }

    const viewItem = (row) => {
      history.push(VIEW_ITEM_PAGE + `${row.id}/0`);
    }

  const handleApprove = async () => {
    setLoading(true);

    var requestData = [...approveCandidates].map(item => {return {id: item.id, isApproved: item.approved.current}});
    const response = await approveItemsApi.approve(requestData);

    setLoading(false);
    var i=0
    if(response.errors || response.error) {
      for(i=0; i<rows.length; i++) {
        rows[i].forEach(element => {
          element.result.forEach(item => {
            item.approved.current = item.approved.original;
            return item;
          })
        })
      }
      
      setApproveCandidates([]);
      response.errors ? setError("Unexpected error. Please, try again later.") : setError("Server error. Please, try again later.");

    } else {
      for(i; i<rows.length; i++) {
        rows[i].forEach(element => {
          element.result.forEach(item => {
            item.approved.original = item.approved.current;
            return item;
          })
        })
      }
      setApproveCandidates([]);
      setError("")
    }
  };

  const handleDelete = async (row) => {
    setLoading(true);
    const response = await deleteItemApi.delete(row.id);
    setLoading(false);
    if(response.error || response.errors) {
      setError("Unexpected error. Please, try again later.");
      return;
    }
    setRows([]);
  }

  const getPageData = async () => {
    let response;

    const result = rows[page] && rows[page].filter(result => result.criteria === orderBy && result.direction === order);

    if(!result || result.length === 0) {
      setLoading(true);
      response = (user.user.roles.some(role => role === "SUPER_ADMIN")) ? await getAllItemsApi.get(page, rowsPerPage, orderBy, order) : await getAuthorItemsApi.get(page, rowsPerPage, orderBy, order);
      
      setLoading(false);
      if(response.error){
          setError(response.message);
          return;
      } else {
        let index = page * rowsPerPage + 1;
        const mapped = response.result.map((item) => 
          { 
            return {
              id: item.id, 
              index: index++,
              date: item.creationDate.split("T")[0] + " " + item.creationDate.split("T")[1].substring(0, 8), 
              name: item.name, 
              description: item.description ? (item.description.length > 200 ? item.description.substring(0, 200) + "..." : item.description) : null, 
              approved: {original: item.approved, current: getCurrentDataForItem(item)},
              user: item.user}});

          let rowsClone = [...rows];
          if(!rows[page]) {
            rowsClone[page] = [{criteria: orderBy, direction: order, totalPages: response.totalPages, totalElements: response.totalElements, result: mapped}];
          } else {
            rowsClone[page] = [...rowsClone[page], {criteria: orderBy, direction: order, totalPages: response.totalPages, totalElements: response.totalElements, result: Object.assign(mapped)}];
          }
          setTotalItems(response.totalElements);
          setRows(rowsClone);
        }
    } else {
      setTotalItems(result[0].totalElements);
      //response = result;
    };
  } 
  
  React.useEffect( () => {
    const fetchData = getPageData;
    fetchData(false);
  },[page, rows]);

  React.useEffect( () => {
    const fetchData = getPageData;
    fetchData(false);
  },[orderBy, order]);

  const getCurrentDataForItem = (newItem) => {
    let rowsClone = [...rows];
    let isApproved = Object.assign({}, newItem).approved
    for(var i=0; i<rowsClone.length; i++) {
      rowsClone[i].forEach(element => {
        element.result.forEach(item => {
          if(item.id === newItem.id) {
            isApproved = item.approved.current;
          }
        })
      })
    }
    return isApproved;
  }

  const isAdmin = () => {
    return user.user.roles.some(role => role === "ADMIN")
  }
  
  const isRootAdmin = () => {
    return user.user.roles.some(role => role === "SUPER_ADMIN")
  }

  const isOwner = (item) => {
    return (user.user.username === item.user.username)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => async (event) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const renderTableContent = () => {
    const data = rows[page] && rows[page].filter(result => result.criteria === orderBy && result.direction === order);
    
    if(data && data.length === 1) {
      return data[0].result.map((row, index) => {
        return (
          <TableRow key={row.id} className={row.approved.current === row.approved.original ? classes.tableRow : classes.tableRowUpdate}>
            <TableCell align="left">{row.index}</TableCell>
            <TableCell align="left">{row.date}</TableCell>
            <TableCell align="left">
              {row.user.firstName} {row.user.lastName} ({row.user.username})
            </TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.description}</TableCell>
            <TableCell align="left">{row.approved.current ? "Yes" : "No"}</TableCell>
            <TableCell align="left">
              <Tooltip title="Edit" aria-label="edit">
                <IconButton className={classes.icon} disabled={isRootAdmin() && !isOwner(row)} onClick={() => editItem(row)}  aria-label="edit">
                    <Edit />
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell align="left">
              <Tooltip title="View" aria-label="view">
                <IconButton className={classes.icon} onClick={() => viewItem(row)}  aria-label="view">
                    <VisibilityIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
            {isAdmin() ?  
            <TableCell align="left">
              <Checkbox
                color="secondary" 
                checked={row.approved.current}
                onChange={() => handleApproveChange(row)}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              /></TableCell>
              : null
              }
              <TableCell align="left">
                <DeleteItemDialog open={openConfirmDialog} data={row} onConfirm={handleDelete} disabled={isAdmin() && !isOwner(row)} />
              </TableCell>
          </TableRow>
        );
      });
    }

    return null;
  }

  return (
    <div className={classes.root}>
      <Loader loading={loading} error={error}/>
      <div className={classes.wrapper}>
     
      <Toolbar >
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          All items
        </Typography>
      </Toolbar>
      <TableContainer component={Paper} className={classes.paper}>
        <Table 
            className={classes.table} 
            aria-label="simple table"
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table">
          <TableHead>
            <TableRow>
              <TableCell  style={{fontWeight: "bold"}}>
                  ID
              </TableCell>
              <TableCell style={{width: "10%", fontWeight: "bold"}}>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : 'asc'}
                  onClick={createSortHandler("date")}
                >
                  Date
                  {orderBy ==="date" ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell id="user" sortDirection={orderBy === "user" ? order : false}  style={{width: "10%", fontWeight: "bold", overflow: "hidden"}}>
                <TableSortLabel
                  active={orderBy === "user"}
                  direction={orderBy === "user" ? order : 'asc'}
                  onClick={createSortHandler("user")}
                >
                  User
                  {orderBy === "user" ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell id="name" sortDirection={orderBy === "name" ? order : false} style={{width: "15%", fontWeight: "bold", overflow: "hidden"}}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : 'asc'}
                  onClick={createSortHandler("name")}
                >
                  Name
                {orderBy ==="name" ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell style={{width: "45%", fontWeight: "bold", overflow: "hidden"}}>Description</TableCell>
              <TableCell id="approved" sortDirection={orderBy === "approved" ? order : false}  style={{fontWeight: "bold"}}>
                <TableSortLabel
                  active={orderBy === "approved"}
                  direction={orderBy === "approved" ? order : 'asc'}
                  onClick={createSortHandler("approved")}
                >
                  Approved
                  {orderBy ==="approved" ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell style={{fontWeight: "bold"}}>Edit</TableCell>
              <TableCell style={{fontWeight: "bold"}}>View</TableCell>
              
              {isAdmin() ? <TableCell style={{fontWeight: "bold"}}>Approve</TableCell> : null}
              <TableCell style={{fontWeight: "bold"}}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {renderTableContent()}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.applyWrapper}>
        {isAdmin() ? 
                <ApproveItemsDialog open={openConfirmDialog} data={approveCandidates} onConfirm={handleApprove} disabled={approveCandidates.length === 0} />
                    : 
                    null
        } 
        <TablePagination
          rowsPerPageOptions={[7]}
          component="div"
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
        </div>
      </div>
    </div>
  );
}
