import Sidebar from "./sidebar";

type Props = {
  activePage: "projects" | "exports";
  children: React.ReactNode;
};

export default function Layout({ activePage, children }: Props) {
  return (
    <div className="grid w-full h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar activePage={activePage} />
      {children}
    </div>
  );
}
