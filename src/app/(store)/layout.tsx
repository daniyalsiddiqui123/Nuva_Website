import { SanityLive } from "@/sanity/lib/live"

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="min-h-screen bg-white">
          {children}
            <SanityLive />
        </div>
    ); 
}