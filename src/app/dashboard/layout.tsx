import DashboardNav from "../components/DashboardNav";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex ">
                <DashboardNav />
                {children}
            </div>
        </>
    );
}
