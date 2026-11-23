import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
