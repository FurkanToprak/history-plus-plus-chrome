import { useState } from "react";
import { TextField, Table, TablePagination, TableSortLabel, TableHead, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { purple } from "../styles/Theme";

interface TableItem {
    id: string,
    title?: string;
    typedCount?: number;
    url?: string;
    visitCount?: number;
    tag?: string;
    lastVisitTime?: number;
}
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

export default function HistoryTable() {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('desc');
    const [init, setInit] = useState(false);
    const [history, setHistory] = useState([] as TableItem[]);
    const searchHistory = (searchText: string) => {
        chrome.history.search({ text: searchText }, function (data) {
            const fetchedHistory = data.map((entry: chrome.history.HistoryItem) => {
                const taggedEntry: TableItem = entry;
                taggedEntry.tag = "woah"
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
                        <TableCell style={TableHeaderStyle}>Site</TableCell>
                        <TableCell style={TableHeaderStyle}>Tags</TableCell>
                        <TableCell style={TableHeaderStyle}>Visit Count</TableCell>
                        <TableCell style={TableHeaderStyle}>Last Visited</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(historyRow => {
                        return <TableRow style={{ cursor: "pointer" }} onMouseDown={() => {
                            window.open(historyRow.url, "_blank")
                        }}>
                            <TableCell>
                                <div>{historyRow.title}</div>
                                <div style={{ textDecoration: "underline", color: "#737373" }}>{getDomainFromURL(historyRow.url)}</div>
                            </TableCell>
                            <TableCell>{historyRow.tag}</TableCell>
                            <TableCell>{historyRow.visitCount}</TableCell>
                            <TableCell>{historyRow.lastVisitTime}</TableCell>
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
    border: `1px solid ${purple}`,
}