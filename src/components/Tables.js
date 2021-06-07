/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddBoxIcon from '@material-ui/icons/AddBox';
import _ from 'lodash';
import Snackbar from '../components/Snackbar';
import { useHistory } from 'react-router-dom';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    pdfOnlyMode,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {!pdfOnlyMode && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all users' }}
            />
          </TableCell>
        )}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired,
  pdfOnlyMode: PropTypes.bool.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const history = useHistory();
  const classes = useToolbarStyles();
  const { numSelected, title } = props;

  const handleNewUser = () => {
    console.log('handleNewUser');
    history.push('/user/-1');
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Slet">
          <IconButton aria-label="delete">{/* <DeleteIcon /> */}</IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Opret nyt Medlem">
            <IconButton aria-label="nyt medlem">
              <AddBoxIcon onClick={handleNewUser} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filtrér listen">
            <IconButton aria-label="filter list" disabled>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  handlePdfTag: PropTypes.func.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  table: {
    minWidth: 750,
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
  tablecell: {
    fontSize: '8pt',
  },
}));

export default function Tables(props) {
  const classes = useStyles();
  const {
    tabelArray,
    headCells,
    startRowsPerPage,
    rowsPerPageOptions,
    title,
    showPagination = true,
  } = props;

  const history = useHistory();

  // check to avoid dev error if table is empty
  if (!tabelArray) {
    return <Snackbar severity="error">Liste er tom</Snackbar>;
  }
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(headCells[0].id);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [pdfOnlyMode, setPdfOnlyMode] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(startRowsPerPage);
  const [headerKeysInTabel, setHeaderKeysInTabel] = React.useState([]);

  useEffect(() => {
    const keys = headCells.map(headerCell => {
      return headerCell?.id;
    });
    setHeaderKeysInTabel(keys);
  }, []);

  const handlePdfTag = params => {
    setPdfOnlyMode(params);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = tabelArray.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClickSelectBox = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tabelArray.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <div>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            title={title}
            numSelected={selected.length}
            handlePdfTag={handlePdfTag}
          />
          <TableContainer>
            <Table
              stickyHeader
              className={classes.table}
              aria-labelledby="tableTitle"
              size={'small'}
              aria-label="sticky table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={tabelArray.length}
                headCells={headCells}
                startRowsPerPage={startRowsPerPage}
              />
              <TableBody>
                {stableSort(tabelArray, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    // only using values chosen by parent component
                    let filteredRow = {};
                    for (const key in row) {
                      if (Object.hasOwnProperty.call(row, key)) {
                        if (headerKeysInTabel.includes(key)) {
                          filteredRow[key] = row[key];
                        }
                      }
                    }

                    return (
                      <Tooltip title="Tryk på et navn for at se detaljer">
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={filteredRow[orderBy]}
                          selected={isItemSelected}
                        >
                          {!pdfOnlyMode && (
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                onClick={event =>
                                  handleClickSelectBox(
                                    event,
                                    filteredRow[orderBy],
                                    row['id'],
                                  )
                                }
                              />
                            </TableCell>
                          )}
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            className={classes.tablecell}
                            onClick={() => history.push('/user/' + row['id'])}
                          >
                            {filteredRow[headerKeysInTabel[0]]}
                          </TableCell>
                          {headerKeysInTabel.map(
                            (key, index) =>
                              index > 0 && (
                                <>
                                  <TableCell
                                    align="left"
                                    className={classes.tablecell}
                                    onClick={() =>
                                      history.push('/user/' + row['id'])
                                    }
                                  >
                                    {filteredRow[key]}
                                  </TableCell>
                                </>
                              ),
                          )}
                        </TableRow>
                      </Tooltip>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 25 * emptyRows }}>
                    <TableCell colSpan={2} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {showPagination && (
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={tabelArray.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              labelRowsPerPage="Rækker per side:"
              nextIconButtonText="Næste side"
              backIconButtonText="Forrige side"
            />
          )}
        </Paper>
      </div>
    </div>
  );
}
