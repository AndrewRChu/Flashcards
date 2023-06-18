export default function Flashcard({
    columns,
    row,
}: {
    columns: Array<string>;
    row: Array<JSON>;
}) {
    return (
        <div className="flex w-72 flex-col gap-4 border p-8">
            {columns.map((column, i) => (
                <Column name={column} data={row[i]} key={i} />
            ))}
            {/* {JSON.stringify(row)} */}
        </div>
    );
}

function Column({ name, data }: { name: string; data: JSON }) {
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
