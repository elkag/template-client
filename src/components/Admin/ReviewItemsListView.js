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
import { Checkbox, IconButton, Popover, TablePagination, TableSortLabel, Toolbar, Typography } from '@material-ui/core';
import { EDIT_ITEM_PAGE, VIEW_ITEM_PAGE } from '../../config/routes';
import { useHistory } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Loader from '../common/Loader';
import { UserContext } from '../../contexts/userContext';
import { getAllItemsApi } from '../../api/services/getAllItemsApi';
import { bgColor } from '../../styles/colors';
import { approveItemsApi } from '../../api/services/approveItemsApi';
import ApproveItemsDialog from './dialogues/ApproveItemsDialog';

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%'
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
  marginLeft: 20
},
popper: {
  padding: 10
}
}));

export default function BasicTable() {

    const history = useHistory();
    const [session] = React.useContext(UserContext);
    
    const classes = useStyles();

    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [orderBy, setOrderBy] = React.useState('id');
    const [order, setOrder] = React.useState('asc');
    const [dense, setDense] = React.useState(true);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [dialogOpen, setIsDialogOpen] = React.useState(false); 
    const [updateCandidates, setUpdateCandidates] = React.useState([]);

    const openConfirmDialog = () => {
      setIsDialogOpen(true)
    }

    const getUpdated = () => {
      const ids = originalData.map(item => item.id);
      var updated = [];
      originalData.forEach(item => {
        const d = data.filter(i => i.id === item.id)[0];
        if(item.approved !== d.approved) {
          updated.push({id: item.id, description: item.description, user: item.user.username, name: item.name, approved: d.approved});
        }
      })
      return updated
    }

    const handleChange = (row) => {
      const updated = [...data].map(item => {
        if(item.id === row.id) {
          item.approved = !item.approved;
        }
        return item;
      });
      setData(updated);
      setUpdateCandidates(getUpdated());
    };

    const editItem = (row) => {
      history.push(EDIT_ITEM_PAGE + `${row.id}/0`);
    }
    const approveItem = (row) => {
      // history.push(EDIT_ITEM_PAGE + row.id);
    }
    const viewItem = (row) => {
      history.push(VIEW_ITEM_PAGE + `${row.id}/0`);
  }

  const handleApprove = async () => {
    setLoading(true);
    const ids = originalData.map(item => item.id);
      var requestData = [];
      originalData.forEach(item => {
        const d = data.filter(i => i.id === item.id)[0];
        if(item.approved !== d.approved) {
          requestData.push({id: item.id, isApproved: d.approved});
        }
    })
    const response = await approveItemsApi.approve(requestData);

      setLoading(false);
      if(response.errors || response.error){
        const correctData = [...data];
        correctData.forEach(i => { 
          const item =  originalData.filter(item => i.id === item.id)[0];
          i.approved = item.approved;
          return i;
        });
        setData(correctData);
        response.errors ? setError("Unexpected error. Please, try again later.") : setError("Server error. Please, try again later.");

      } else if(response.length) {
        const correctData = [...data];
        correctData.forEach(i => { 
          const item =  response.filter(item => i.id === item.id)[0];
          if(item) {
            i.approved = item.approved;
          }
          return i;
        });
        setError("")
        setData(correctData);
        setOriginalData(correctData.map(item => {return  {id: item.id, description: item.description, user: item.user, name: item.name, approved: item.approved}}));
      }
  };

 
  const getData = React.useCallback(async () => {
    setLoading(true);
    const response = (session.user.roles.some(role => role === "ADMIN")) ? await getAllItemsApi.get() : await getAuthorItemsApi.get();
    setLoading(false);
    if(response.error){
        setError(response.message);
    } else{
        const mapped = response.result.map(item => 
          { return {
            id: item.id, 
            date: item.creationDate.split("T")[0] + " " + item.creationDate.split("T")[1].substring(0, 8), 
            name: item.name, 
            description: item.description, 
            approved: item.approved ? "Yes" : "No",
            user: item.user}}
           );
        setData(response.result);
        setOriginalData([...response.result].map(item => {return  {id: item.id, description: item.description, user: item.user, name: item.name, approved: item.approved}}));
        setRows(mapped);
    }
      // return { name, calories, fat, carbs, protein };
  }, []);

    React.useEffect( () => {
        getData();    
    },[getData]);

  const isAdmin = () => {
    return session.user.roles.some(role => role === "ADMIN")
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  function numberComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stringComparator(a, b, orderBy) {
    if (b[orderBy].toString().toLowerCase() < a[orderBy].toString().toLowerCase()) {
      return -1;
    }
    if (b[orderBy].toString().toLowerCase() > a[orderBy].toString().toLowerCase()) {
      return 1;
    }
    return 0;
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => orderBy === 'name' ? stringComparator(a, b, orderBy) : numberComparator(a, b, orderBy)
      : (a, b) => orderBy === 'name' ? -stringComparator(a, b, orderBy) : -numberComparator(a, b, orderBy);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage) : 0;
  
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
              <TableCell id="id" sortDirection={orderBy === "id" ? order : false}>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? order : 'asc'}
                  onClick={createSortHandler("id")}
                >
                  ID
                  {orderBy ==="id" ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell  id="date" sortDirection={orderBy === "creationDate" ? order : false}>
                <TableSortLabel
                  active={orderBy === "creationDate"}
                  direction={orderBy === "creationDate" ? order : 'asc'}
                  onClick={createSortHandler("creationDate")}
                >
                  Date
                  {orderBy ==="creationDate" ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell id="user" sortDirection={orderBy === "user" ? order : false}>
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
              <TableCell id="name" sortDirection={orderBy === "name" ? order : false}>
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
              <TableCell>Description</TableCell>
              <TableCell id="approved" sortDirection={orderBy === "approved" ? order : false}>
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
              <TableCell>Edit</TableCell>
              <TableCell>View</TableCell>
              {isAdmin() ? <TableCell>Approve</TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            { stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow key={row.id}>
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.creationDate.split("T")[0] + " " + row.creationDate.split("T")[1].substring(0, 8)}</TableCell>
                      <TableCell align="left">
                        {row.user.firstName} {row.user.lastName} ({row.user.username})
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">{row.approved ? "Yes" : "No"}</TableCell>
                      <TableCell align="left">
                        <IconButton className={classes.icon} disabled={isAdmin() && session.user.username != row.user.username} onClick={() => editItem(row)}>
                            <Edit />
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton className={classes.icon} onClick={() => viewItem(row)}>
                            <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                      {isAdmin() ?  
                      <TableCell align="left">
                        <Checkbox
                          color="primary" 
                          checked={row.approved}
                          onChange={() => handleChange(row)}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        /></TableCell>
                        : null
                        }
                    </TableRow>
              );
            })}
             {emptyRows > 0 && (
                <TableRow style={{ height: 81 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.applyWrapper}>
        {isAdmin() ? 
                <ApproveItemsDialog open={openConfirmDialog} data={updateCandidates} onConfirm={handleApprove} disabled={updateCandidates.length === 0} />
                    : 
                    null
        } 
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </div>
      </div>
    </div>
  );
}
