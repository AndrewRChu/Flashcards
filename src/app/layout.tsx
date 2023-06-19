import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
const noto_sans_jp = Noto_Sans_JP({ subsets: ["latin", "vietnamese"] });

// export const metadata = {
//     title: "Create Next App",
//     description: "Generated by create next app",
// };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${noto_sans_jp.className}`}>{children}</body>
        </html>
    );
}
