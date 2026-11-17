import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THAMALPATH | Software Engineer & Designer",
  description:
    "Cinematic personal portfolio of Thamalpath - Full Stack Software Engineer, System Architect and Designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cinzel:wght@600;700;800;900&family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#060608] text-zinc-100 font-sans">
        {children}
      </body>
    </html>
  );
}
