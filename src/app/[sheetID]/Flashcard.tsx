import { useContext } from "react";
import { AppContext } from "./page";

export default function Flashcard({ rowNum }: { rowNum: number }) {
    const { columns, data } = useContext<any>(AppContext);

    return (
        <div className="flex w-72 flex-col gap-4 border p-8 m-8">
            {columns.map(
                (column: any, i: number) =>
                    column.show && (
                        <Column
                            name={column.value}
                            data={data[rowNum][i]}
                            key={i}
                        />
                    )
            )}
        </div>
    );
}

function Column({ name, data }: { name: string; data: any }) {
    return (
        data && (
            <div>
                <strong>{name}</strong>
                <br />
                <a href={data.hyperlink}>{data.value}</a>
            </div>
        )
    );
}
