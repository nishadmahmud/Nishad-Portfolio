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
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Mono:wght@300;400;500&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="font-mono text-[var(--text)] bg-[var(--bg)] antialiased cursor-crosshair tracking-wide">
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: "var(--bg2)",
                            color: "var(--text)",
                            border: "1px solid var(--line)",
                            boxShadow: "none",
                            backdropFilter: "none",
                            fontWeight: 300,
                            fontFamily: "'DM Mono', monospace",
                            borderRadius: "0",
                            padding: "1rem 1.5rem",
                            fontSize: "12px",
                            letterSpacing: "0.05em",
                        },
                        iconTheme: {
                            primary: "var(--accent)",
                            secondary: "var(--bg)",
                        },
                        success: {
                            style: {
                                border: "1px solid var(--accent)",
                                boxShadow: "none",
                            },
                            iconTheme: {
                                primary: "var(--accent)",
                                secondary: "var(--bg)",
                            },
                        },
                        error: {
                            style: {
                                border: "1px solid #ff4a4a",
                                boxShadow: "none",
                            },
                            iconTheme: {
                                primary: "#ff4a4a",
                                secondary: "var(--bg)",
                            },
                        },
                    }}
                />
                {children}
            </body>
        </html>
    );
}
