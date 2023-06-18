import { useContext } from "react";
import { AppContext } from "./page";

export default function Options() {
    const { columns, setColumns } = useContext<any>(AppContext);

    return (
        <div className="flex justify-center gap-8">
            {columns.map((column: any, i: number) => (
                <div className="flex flex-row gap-1">
                    <input
                        type="checkbox"
                        checked={columns[i].show}
                        onChange={() => {
                            let temp = [...columns];
                            temp[i].show = !temp[i].show;
                            setColumns(temp);
                        }}
                        id={`show-${i}`}
                    ></input>
                    <label htmlFor={`show-${i}`}>{column.value}</label>
                </div>
            ))}
        </div>
    );
}
