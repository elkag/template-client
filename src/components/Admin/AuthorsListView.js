import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination, TableSortLabel, Toolbar, Typography } from '@material-ui/core';
import Loader from '../common/Loader';
import { UserContext } from '../../contexts/userContext';
import { bgColor } from '../../styles/colors';
import { AuthorsListContext } from '../../contexts/authorsListContext';
import BanUserDialog from './dialogues/BanUserDialog';
import { promoteUsersApi } from '../../api/services/promoteUsersApi';
import { getAuthorsApi } from '../../api/services/getAuthorsApi';
import { banUserApi } from '../../api/services/banUserApi';
import { demoteUsersApi } from '../../api/services/demoteUsersApi';
import PromoteUserDialog from './dialogues/PromoteUserDialog';

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

    const [user] = React.useContext(UserContext);
    const [authors, setAuthors] = React.useContext(AuthorsListContext);
    
    const classes = useStyles();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [orderBy, setOrderBy] = React.useState("date");
    const [order, setOrder] = React.useState("asc");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage] = React.useState(7);
    const [, setIsDialogOpen] = React.useState(false); 
    const [totalItems, setTotalItems] = React.useState(0);

    const openConfirmDialog = () => {
      setIsDialogOpen(true)
    }

  const handlePromote = async (row) => {
    setLoading(true);
    
    const response = row.isAdmin ? await demoteUsersApi.demote([row.id]) : await promoteUsersApi.promote([row.id]);
    row.isAdmin = !row.isAdmin
    setLoading(false);
    if(response.error ) {
      setError(response.message);
      return;
    }
  }
  
  const handleBan = async (row) => {
    setLoading(true);
    row.banned = !row.banned
    const response = await banUserApi.ban(row.id, row.banned);
    setLoading(false);
    if(response.error) {
      setError(response.message);
      return;
    }
  }

  const getPageData = async () => {
    let response;

    const result = authors[page] && authors[page].filter(result => result.criteria === orderBy && result.direction === order);

    if(!result || result.length === 0) {
      setLoading(true);
      response = await getAuthorsApi.get(page, rowsPerPage, orderBy, order);
      
      setLoading(false);
      if((response.errors || response.error) && response.message ){
          setError(response.message);
          return;
      } else {
        let index = page * rowsPerPage + 1;
        const mapped = response.result.map((user) => 
          { 
            return {
              id: user.id, 
              index: index++,
              date: user.registrationDate.split("T")[0] + " " + user.registrationDate.split("T")[1].substring(0, 8), 
              name: user.firstName + " " + user.lastName, 
              username: user.username, 
              roles: user.roles,
              isAdmin: user.roles.some(role => role === "ADMIN"),
              banned: user.banned
             }});

          let rowsClone = [...authors];
          if(!authors[page]) {
            rowsClone[page] = [{criteria: orderBy, direction: order, totalPages: response.totalPages, totalElements: response.totalElements, result: mapped}];
          } else {
            rowsClone[page] = [...rowsClone[page], {criteria: orderBy, direction: order, totalPages: response.totalPages, totalElements: response.totalElements, result: Object.assign(mapped)}];
          }
          setTotalItems(response.totalElements);
          setAuthors(rowsClone);
        }
    } else {
      setTotalItems(result[0].totalElements);
    };
  } 

  
  React.useEffect( () => {
    const fetchData = getPageData;
    fetchData(false);
  },[page, authors]);

  React.useEffect( () => {
    const fetchData = getPageData;
    fetchData(false);
  },[orderBy, order]);

  const isAdmin = () => {
    return user.user.roles.some(role => role === "SUPER_ADMIN")
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
    const data = authors[page] && authors[page].filter(result => result.criteria === orderBy && result.direction === order);
    
    if(data && data.length === 1) {
      return data[0].result.map((row) => {
        return (
          <TableRow key={row.id} className={true ? classes.tableRow : classes.tableRowUpdate}>
            <TableCell align="left">{row.index}</TableCell>
            <TableCell align="left">{row.date}</TableCell>
            <TableCell align="center">
              {row.name}
            </TableCell> 
            <TableCell align="center">
             {row.username}
            </TableCell>
            <TableCell align="center">{row.isAdmin ? "Yes" : "No"}</TableCell>
            <TableCell align="center">
              <PromoteUserDialog open={openConfirmDialog} data={row} onConfirm={handlePromote} disabled={false} />
            </TableCell> 
            <TableCell align="center">{row.banned ? "Yes" : "No"}</TableCell>
            <TableCell align="center">
              <BanUserDialog open={openConfirmDialog} data={row} onConfirm={handleBan} disabled={false} />
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
          Authors
        </Typography>
      </Toolbar>
      <TableContainer component={Paper} className={classes.paper}>
        <Table 
            className={classes.table} 
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table">
          <TableHead>
            <TableRow>
              <TableCell  align="left"  style={{width: "20px", fontWeight: "bold", overflow: "hidden"}}>
                  No
              </TableCell>
              <TableCell  align="left" style={{fontWeight: "bold"}}>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : 'asc'}
                  onClick={createSortHandler("date")}
                >
                  Registration Date
                  {orderBy ==="date" ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell  align="center" id="user" sortDirection={orderBy === "name" ? order : false}  style={{fontWeight: "bold", overflow: "hidden"}}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : 'asc'}
                  onClick={createSortHandler("name")}
                >
                  Name
                  {orderBy === "name" ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell id="user" align="center"  style={{fontWeight: "bold", overflow: "hidden"}} sortDirection={orderBy === "username" ? order : false} >
                <TableSortLabel
                  active={orderBy === "username"}
                  direction={orderBy === "username" ? order : 'asc'}
                  onClick={createSortHandler("username")}
                >
                  Email
                  {orderBy === "username" ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell id="admin" align="center" style={{fontWeight: "bold", overflow: "hidden"}}>
                  Admin
              </TableCell>
              {isAdmin() ? 
              <TableCell align="center" style={{fontWeight: "bold", overflow: "hidden"}}>
                Promote to Admin
              </TableCell> : null}
              <TableCell id="ban" align="center" sortDirection={orderBy === "banned" ? order : false}  style={{fontWeight: "bold", overflow: "hidden"}}>
                  Banned
              </TableCell>
              <TableCell align="center" style={{fontWeight: "bold"}}>
                Ban / Unban
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {renderTableContent()}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.applyWrapper}>
        
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
