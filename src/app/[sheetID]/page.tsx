"use client";

import { useState, useEffect } from "react";

import Flashcard from "./Flashcard";

export default function Home({
    params,
    searchParams,
}: {
    params: { sheetID: string };
    searchParams: { key: string };
}) {
    const API_KEY = "AIzaSyDfHG_GQMnzVxxT9It7wK14oLoA3bqcz-E";
    const [columns, setColumns] = useState<any>();
    const [data, setData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${params.sheetID}?key=${API_KEY}&fields=sheets.data.rowData.values(userEnteredValue,hyperlink)`
            );
            const rawData = await res.json();
            const parsedData = rawData.sheets[0].data[0].rowData.map(
                (row: any) => row.values
            );
            setColumns(
                parsedData
                    .shift()
                    .map(
                        (cell: any) =>
                            cell.userEnteredValue &&
                            cell.userEnteredValue.stringValue
                    )
            );
            setData(
                parsedData.map((row: any) =>
                    row.map((cell: any, i: number) => {
                        return {
                            value:
                                cell.userEnteredValue &&
                                cell.userEnteredValue.stringValue,
                            hyperlink: cell.hyperlink,
                        };
                    })
                )
            );
        };
        fetchData();
    }, []);

    if (data == undefined) {
        return <span>Loading...</span>;
    } else if (data.error) {
        return <span>Please enter a valid Google Sheets ID</span>;
    } else {
        return (
            <>
                <div className="flex gap-16 flex-wrap">
                    {data.map((row: any, i: number) => (
                        <Flashcard columns={columns} row={row} key={i} />
                    ))}
                </div>
            </>
        );
    }
}
