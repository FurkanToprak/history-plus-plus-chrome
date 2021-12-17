import { useState } from "react";
import { Table, TablePagination, TableSortLabel, TableHead, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"

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
                <TableHead style={{
                    backgroundColor: "blue",
                    color: "red"
                }}>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Tags</TableCell>
                        <TableCell>Visit Count</TableCell>
                        <TableCell>Last Visited</TableCell>
                        <TableCell>URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(historyRow => {
                        return <TableRow>
                            <a style={{
                                textDecoration: "none"
                            }}
                                target="_blank"
                                rel="noreferrer"
                                href={historyRow.url}>
                                <TableCell>{historyRow.title}</TableCell>
                                <TableCell>{historyRow.tag}</TableCell>
                                <TableCell>{historyRow.visitCount}</TableCell>
                                <TableCell>{historyRow.lastVisitTime}</TableCell>
                                <TableCell>{historyRow.url?.substring(0, Math.min(10, historyRow.url.length))}</TableCell>
                            </a>
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