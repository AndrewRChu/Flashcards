export default function Flashcard({
    columns,
    row,
}: {
    columns: Array<string>;
    row: Array<string>;
}) {
    return (
        <div className="flex flex-col gap-4 border p-8">
            {columns.map((column, i) => (
                <Column name={column} data={row[i]} key={i} />
            ))}
        </div>
    );
}

function Column({ name, data }: { name: string; data: string }) {
    return (
        <div>
            <strong>{name}</strong>
            <p>{data}</p>
        </div>
    );
}
