"use client";

import { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";

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
    const [currRow, setCurrRow] = useState<number>(0);

    const contextValue = {
        columns: columns,
        setColumns: setColumns,
        data: data,
        setData: setData,
        currRow: currRow,
        setCurrRow: setCurrRow,
    };

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
                parsedData.shift().map((cell: any) => {
                    return {
                        value:
                            cell.userEnteredValue &&
                            cell.userEnteredValue.stringValue,
                        show: true,
                        obscure: true,
                    };
                })
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
            <AppContext.Provider value={contextValue}>
                <ColumnOptions />
                <div className="flex flex-col items-center justify-center">
                    <Controls />
                    <Flashcard key={currRow} />
                    <span>{`${currRow + 1}/${data.length}`}</span>
                </div>
            </AppContext.Provider>
        );
    }
}

function ColumnOptions() {
    const { columns, setColumns } = useContext<any>(AppContext);

    return (
        <div className="flex justify-center gap-8 m-12 flex-wrap">
            {columns.map((column: any, i: number) => (
                <div className="flex flex-col gap-1" key={i}>
                    <strong>{column.value}</strong>
                    <div className="flex gap-2">
                        <input
                            type="checkbox"
                            checked={columns[i].show}
                            onChange={() => {
                                let temp = [...columns];
                                temp[i].show = !temp[i].show;
                                setColumns(temp);
                            }}
                            id={`show-${i}`}
                        />
                        <label htmlFor={`show-${i}`}>Show</label>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="checkbox"
                            checked={columns[i].obscure}
                            onChange={() => {
                                let temp = [...columns];
                                temp[i].obscure = !temp[i].obscure;
                                setColumns(temp);
                            }}
                            id={`obscure-${i}`}
                        />
                        <label htmlFor={`obscure-${i}`}>Obscure</label>
                    </div>
                </div>
            ))}
        </div>
    );
}

function Flashcard() {
    const { columns, data, currRow } = useContext<any>(AppContext);

    return (
        <div className="flex w-72 flex-col gap-4 border p-8 m-2">
            {columns.map(
                (column: any, i: number) =>
                    column.show && (
                        <Column
                            name={column.value}
                            data={data[currRow][i]}
                            obscure={column.obscure}
                            key={i}
                        />
                    )
            )}
        </div>
    );
}

function Column({
    name,
    data,
    obscure,
}: {
    name: string;
    data: any;
    obscure: boolean;
}) {
    const [blur, setBlur] = useState(obscure);

    return (
        data && (
            <div>
                <strong>{name}</strong>
                <br />
                <a
                    className={`${blur ? "blur-sm" : ""} select-none`}
                    onClick={() => setBlur(!blur)}
                    href={data.hyperlink}
                >
                    {data.value}
                </a>
            </div>
        )
    );
}

function Controls() {
    const { data, currRow, setCurrRow } = useContext<any>(AppContext);

    return (
        <div className="flex flex-row justify-between w-72">
            <button
                onClick={() =>
                    setCurrRow(currRow == 0 ? data.length - 1 : currRow - 1)
                }
            >
                Back
            </button>
            <button
                onClick={() =>
                    setCurrRow(Math.floor(Math.random() * data.length))
                }
            >
                Random
            </button>
            <button
                onClick={() =>
                    setCurrRow(currRow == data.length - 1 ? 0 : currRow + 1)
                }
            >
                Next
            </button>
        </div>
    );
}
