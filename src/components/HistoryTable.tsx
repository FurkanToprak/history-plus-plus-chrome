import { useState } from "react";
import { TextField, Table, TablePagination, TableSortLabel, TableHead, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { purple } from "../styles/Theme";
// @ts-ignore
import timeago from 'epoch-timeago';

const columns = ["Site", /*"Tags",*/ "Visit Count", "Last Visited"]
type TableSortableColumns = 'title' | 'tag' | 'visitCount' | 'lastVisitTime';
function propertyToSortBy(property: string): TableSortableColumns {
    if (property === "Site") {
        return 'title';
    } else if (property === "Tags") {
        return 'tag';
    } else if (property === "Visit Count") {
        return 'visitCount';
    } else {
        return 'lastVisitTime';
    }
}
interface TableItem {
    id: string,
    title?: string;
    typedCount?: number;
    url?: string;
    visitCount?: number;
    tag?: string;
    lastVisitTime?: number;
    humanReadableTime?: string;
}
type SortDirection = 'desc' | 'asc';

const domainGetterRegex = /(?:[\w-]+\.)+[\w-]+/;
function getDomainFromURL(url: string | undefined) {
    if (url === undefined) {
        return "";
    }
    const domainCapture = url.match(domainGetterRegex);
    if (domainCapture) {
        return domainCapture[0]
    }
    return "";
}
function descendingComparator(a: TableItem, b: TableItem, orderBy: TableSortableColumns) {
    if (b[orderBy] === undefined) {
        return -1;
    }
    if (a[orderBy] === undefined) {
        return -1;
    }
    if (b[orderBy]! < a[orderBy]!) {
        return -1;
    }
    if (b[orderBy]! > a[orderBy]!) {
        return 1;
    }
    return 0;
}
function getComparator(order: SortDirection, orderBy: TableSortableColumns) {
    return order === 'desc'
        ? (a: TableItem, b: TableItem) => descendingComparator(a, b, orderBy)
        : (a: TableItem, b: TableItem) => -descendingComparator(a, b, orderBy);
}

export default function HistoryTable() {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('desc' as SortDirection);
    const [orderBy, setOrderBy] = useState('visitCount' as TableSortableColumns);
    const [init, setInit] = useState(false);
    const [history, setHistory] = useState([] as TableItem[]);

    const handleRequestSort = (property: TableSortableColumns) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const searchHistory = (searchText: string) => {
        chrome.history.search({ text: searchText }, function (data) {
            const fetchedHistory = data.map((entry: chrome.history.HistoryItem) => {
                const taggedEntry: TableItem = entry;
                // taggedEntry.tag = "woah"
                taggedEntry.humanReadableTime = timeago(taggedEntry.lastVisitTime)
                return taggedEntry
            })
            setInit(true)
            setHistory(fetchedHistory)
        });
    }
    if (!init) {
        searchHistory('');
    }
    return <div style={{ maxHeight: 550 }}>
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <TextField style={{ width: "100%" }} id="outlined-basic" label="Search History" defaultValue={""} onChange={(event) => searchHistory(event.target.value)} />
        </div>
        <TableContainer>
            <Table stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => {
                            const propertyAsOrderBy = propertyToSortBy(column);
                            return <TableCell style={TableHeaderStyle}
                                sortDirection={(propertyAsOrderBy === column ? order : false) as SortDirection}>
                                {column}
                                <TableSortLabel
                                    active={propertyAsOrderBy === orderBy}
                                    direction={((propertyAsOrderBy === orderBy) ? order : 'asc') as SortDirection}
                                    onClick={() => handleRequestSort(propertyAsOrderBy)}
                                />

                            </TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.slice().sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(historyRow => {
                        return <TableRow style={{ cursor: "pointer" }} onMouseDown={() => {
                            window.open(historyRow.url, "_blank")
                        }}>
                            <TableCell>
                                <div>{historyRow.title}</div>
                                <div style={{ textDecoration: "underline", color: "#737373" }}>{getDomainFromURL(historyRow.url)}</div>
                            </TableCell>
                            {/* <TableCell>{historyRow.tag}</TableCell> */}
                            <TableCell>{historyRow.visitCount}</TableCell>
                            <TableCell>{historyRow.humanReadableTime}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={history.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_event, newPage: number) => {
                setPage(newPage)
            }}
            onRowsPerPageChange={(event: any) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
            }}
        />
    </div>
}

const TableHeaderStyle = {
    backgroundColor: 'black',
    color: purple,
    border: `1px solid ${purple}`
}