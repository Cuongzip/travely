import Footer from "@/components/layout/Footer/Footer";

export default function RootLayout({ children }) {
return (
<html lang="vi">
    <body>
    {children}
    <Footer />
    </body>
</html>
);
}