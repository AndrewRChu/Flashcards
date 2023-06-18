"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

// async function getData(sheetID: string, apiKey: string, setData: Function) {
//     const res = await fetch(
//         `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}?key=${apiKey}&includeGridData=true`
//     );

//     setData(res);
// }

export default function Home() {
    const API_KEY = "AIzaSyDfHG_GQMnzVxxT9It7wK14oLoA3bqcz-E";
    const [sheetID, setSheetID] = useLocalStorage<string>("sheetID", "");
    const [data, setData] = useState();

    return (
        <>
            <span>
                人類社会のすべての構成員の固有の尊厳と平等で譲ることのできない権利とを承認することは
            </span>
        </>
    );
}
