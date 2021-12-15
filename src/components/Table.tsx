import MaterialTable from "material-table"
import { forwardRef, ReactElement } from "react"
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"

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
            lastVisited: Date.now()-200,
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
    return <div>
        <MaterialTable
            columns={[
                { title: 'Title', field: 'title' },
                { title: 'URL', field: 'url' },
                { title: 'Last Visited', field: 'lastVisited', type: 'numeric' },
                { title: 'Times Visited', field: 'timeVisited', type: 'numeric' },
                { title: 'Duration', field: 'duration', type: 'numeric' },

            ]}
            icons={{
                SortArrow: forwardRef((props, ref) => <KeyboardArrowDown {...props} ref={ref}/>)
            }}
            data={tableItems}
            options={{
                search: true,
                showTitle: false,
                headerStyle: {
                    fontSize: 12,
                    padding: 0
                },
                pageSize: 10,
                pageSizeOptions: [10, 20, 50, 100],
                searchFieldAlignment: "right",
                searchFieldStyle: { padding: 0 }
            }}
            style={{ fontSize: 12 }}
        />
    </div>
} 