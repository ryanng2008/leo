import Navbar from "./navbar";

export default function Layout({ children }: {children: React.ReactNode}) {
    return (
        <main className="MAIN CONTAINER, PUT UR SHIT IN HERE min-h-screen flex flex-col">
            <Navbar />
            <div className="mx-20 flex flex-col justify-center grow"> {/* Standardise padding here */}
                {children}
            </div>
        </main>
    )
}