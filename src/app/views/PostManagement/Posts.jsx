/* eslint-disable */
import React, { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Card,
  IconButton,
  Input,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import FeedIcon from '@mui/icons-material/Feed';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DetailProductModal from './PostDetail';

const headerGroup = [
  { Header: 'ID', accessor: 'id', minWidth: 5 },
  {
    Header: 'TITLE',
    accessor: 'title',
    minWidth: 10,
    align: 'left',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    Header: 'USER ID',
    accessor: 'userId',
    minWidth: 10,
    align: 'left',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    Header: 'ACTION',
    accessor: 'action',
    minWidth: 10,
    align: 'right'
  }
];

export const Posts = ({ tableData }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);

  const ButtonDetailProduct = ({ product }) => {
    console.log('product', product);
    return (
      <>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Detail
        </Button>
        <DetailProductModal
          product={product}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      </>
    );
  };

  const tableInstance = useTable(
    {
      columns: headerGroup,
      data: tableData
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    page,
    prepareRow,
    initialState,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter
  } = tableInstance;
  initialState.pageSize = 10;
  initialState.page;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <Card sx={{ width: '100%', overflow: 'hidden', px: 4 }}>
      <Box display={'flex'} px="25px" justifyContent="space-between" mb="20px" alignItems="center">
        <Typography fontSize="22px" fontWeight="700" lineHeight="100%">
          Users Management
        </Typography>
        <Input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search"
          sx={{ width: '50%' }}
        />
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table {...getTableProps()} stickyHeader aria-label="sticky table">
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell {...column.getHeaderProps(column.getSortByToggleProps())} key={index}>
                    <Box
                      display={'flex'}
                      justifyContent="space-between"
                      alignItems="center"
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color="gray.400"
                    >
                      {column.render('Header')}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data;
                    if (cell.column.Header === 'ID') {
                      data = (
                        <Typography fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Typography>
                      );
                    } else if (cell.column.Header === 'USER ID') {
                      data = (
                        <Typography fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Typography>
                      );
                    } else if (cell.column.id === 'title') {
                      data = (
                        <Typography fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Typography>
                      );
                    } else if (cell.column.id === 'action') {
                      data = <ButtonDetailProduct product={cell.row.original} />;
                    }
                    return (
                      <TableCell {...cell.getCellProps()} key={index}>
                        {data}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      <Box display={'flex'} justifyContent="space-between" m={4} alignItems="center">
        <Box display={'flex'}>
          <Tooltip title="First Page">
            <IconButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Previous Page">
            <IconButton
              aria-label={'arrow-previous'}
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box display={'flex'} alignItems="center">
          <Typography mr={8}>
            Page{' '}
            <Typography fontWeight="bold" display={'inline'}>
              {pageIndex + 1}
            </Typography>{' '}
            of{' '}
            <Typography fontWeight="bold" display={'inline'}>
              {pageOptions.length}
            </Typography>
          </Typography>
          <Typography>Go to page:</Typography>{' '}
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Box>

        <Box display={'flex'}>
          <Tooltip title="Next Page">
            <IconButton aria-label="arrow-next" onClick={nextPage} disabled={!canNextPage}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Last Page">
            <IconButton
              aria-label={'arrow-right'}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
};
