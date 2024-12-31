import Navbar from "./navbar";

export default function Layout({ children }: {children: React.ReactNode}) {
    return (
        <main className="MAIN CONTAINER, PUT UR SHIT IN HERE">
            <Navbar />
            <div className="mx-20"> {/* Standardise padding here */}
                {children}
            </div>
        </main>
    )
}