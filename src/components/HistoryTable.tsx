import { useState } from "react";
import { Table, TablePagination, TableSortLabel, TableHead, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
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

export default function HistoryTable() {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('desc');
    const [history, setHistory] = useState([] as TableItem[]);
    chrome.history.search({ text: '', maxResults: 10 }, function (data) {
        const fetchedHistory = data.map((entry: chrome.history.HistoryItem) => {
            const taggedEntry: TableItem = entry;
            taggedEntry.tag = "woah"
            return taggedEntry
        })
        setHistory(fetchedHistory)
    });
    return <div style={{ maxHeight: 550 }}>
        <TableContainer>
            <Table stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        <TableCell style={TableHeaderStyle}>Title</TableCell>
                        <TableCell style={TableHeaderStyle}>Tags</TableCell>
                        <TableCell style={TableHeaderStyle}>Visit Count</TableCell>
                        <TableCell style={TableHeaderStyle}>Last Visited</TableCell>
                        <TableCell style={TableHeaderStyle}>URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(historyRow => {
                        return <TableRow style={{ cursor: "pointer" }} onMouseDown={() => {
                            window.open(historyRow.url, "_blank")
                        }}>
                            <TableCell>{historyRow.title}</TableCell>
                            <TableCell>{historyRow.tag}</TableCell>
                            <TableCell>{historyRow.visitCount}</TableCell>
                            <TableCell>{historyRow.lastVisitTime}</TableCell>
                            <TableCell>{historyRow.url?.substring(0, Math.min(10, historyRow.url.length))}</TableCell>
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