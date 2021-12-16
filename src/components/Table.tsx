import MaterialTable from "material-table"
import { forwardRef } from "react"
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import NavigateNext from "@material-ui/icons/NavigateNext"
import NavigateBefore from "@material-ui/icons/NavigateBefore"
import Search from "@material-ui/icons/Search"
import Clear from "@material-ui/icons/Clear"

interface TableItem {
    url: string;
    title: string;
    lastVisited: number;
    timesVisited: number;
    durationSecs: number;
}

export default function Table() {
    const tableItems: TableItem[] = [
        {
            url: "URL",
            title: "TITLE",
            lastVisited: Date.now(),
            timesVisited: 9,
            durationSecs: 73
        },
        {
            url: "URL",
            title: "TITLE1",
            lastVisited: Date.now(),
            timesVisited: 6,
            durationSecs: 3
        },
        {
            url: "URL2",
            title: "TITLE",
            lastVisited: Date.now() - 200,
            timesVisited: 1,
            durationSecs: 7
        },
        {
            url: "URL",
            title: "TITLE4",
            lastVisited: 0,
            timesVisited: 1,
            durationSecs: 71
        }
    ]
    return <div style={{ width: "100%" }}>
        <MaterialTable
            columns={[
                { title: 'Title', field: 'title' },
                { title: 'URL', field: 'url' },
                { title: 'Last Visited', field: 'lastVisited', type: 'numeric' },
                { title: 'Times Visited', field: 'timesVisited', type: 'numeric' },
                { title: 'Duration', field: 'durationSecs', type: 'numeric' },

            ]}
            icons={{
                SortArrow: forwardRef((props, ref) => <KeyboardArrowDown {...props} ref={ref} />),
                NextPage: forwardRef((props, ref) => <NavigateNext {...props} ref={ref} />),
                PreviousPage: forwardRef((props, ref) => <NavigateBefore {...props} ref={ref} />),
                FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
                LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
                Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
                Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            }}
            data={tableItems}
            options={{
                search: true,
                showTitle: false,
                headerStyle: {
                    fontSize: 12,
                    padding: 0
                },
                pageSize: Math.min(tableItems.length, 10),
                pageSizeOptions: [10, 20, 50, 100],
                searchFieldAlignment: "right",
                searchFieldStyle: { padding: 0 }
            }}
            style={{ fontSize: 12, maxHeight: 300 }}
        />
    </div>
} 