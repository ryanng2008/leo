import Navbar from "./navbar";

export default function Layout({ children }: {children: React.ReactNode}) {
    return (
        <main className="MAIN CONTAINER, PUT UR SHIT IN HERE h-[100vh] flex flex-col">
            <Navbar />
            <div className="mx-20 grow"> {/* Standardise padding here */}
                {children}
            </div>
        </main>
    )
}