import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
    title: "Nishad Mahmud",
    description: "Nishad Mahmud - Portfolio",
    icons: {
        icon: "/ico.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: "rgba(24,31,42,0.85)",
                            color: "#f3f6fa",
                            border: "1.5px solid #22d3ee",
                            boxShadow: "0 0 16px 0 #22d3ee55",
                            backdropFilter: "blur(8px)",
                            fontWeight: 500,
                            fontFamily: "inherit",
                            borderRadius: "1rem",
                            padding: "1rem 1.5rem",
                            fontSize: "1rem",
                            letterSpacing: "0.01em",
                        },
                        iconTheme: {
                            primary: "#22d3ee",
                            secondary: "#181f2a",
                        },
                        success: {
                            style: {
                                border: "1.5px solid #22d3ee",
                                boxShadow: "0 0 16px 0 #22d3ee55",
                            },
                            iconTheme: {
                                primary: "#22d3ee",
                                secondary: "#181f2a",
                            },
                        },
                        error: {
                            style: {
                                border: "1.5px solid #f43f5e",
                                boxShadow: "0 0 16px 0 #f43f5e55",
                            },
                            iconTheme: {
                                primary: "#f43f5e",
                                secondary: "#181f2a",
                            },
                        },
                    }}
                />
                {children}
            </body>
        </html>
    );
}
