import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata = {
    title: "Nishad Mahmud - MERN-Stack Developer & ML Researcher",
    description: "MERN-Stack developer building production-grade web apps with React, Next.js & Supabase. 5 accepted IEEE/ICCIT publications in deep learning and computer vision.",
    keywords: ["Nishad Mahmud", "MERN-Stack Developer", "React", "Next.js", "Researcher", "Deep Learning", "Portfolio"],
    authors: [{ name: "Nishad Mahmud" }],
    creator: "Nishad Mahmud",
    icons: {
        icon: "/ico.png",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://nishad-mahmud.me",
        siteName: "Nishad Mahmud",
        title: "Nishad Mahmud - MERN-Stack Developer & ML Researcher",
        description: "Building production-grade web apps with React, Next.js & Supabase. Published researcher in deep learning and computer vision.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Nishad Mahmud - MERN-Stack Developer & ML Researcher",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Nishad Mahmud - MERN-Stack Developer & ML Researcher",
        description: "Building production-grade web apps with React, Next.js & Supabase. Published researcher in deep learning and computer vision.",
        images: ["/og-image.png"],
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
                <Analytics />
            </body>
        </html>
    );
}
