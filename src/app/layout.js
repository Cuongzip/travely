import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "./reset.css";
import "./icons.css";
import "./global.css";

export const metadata = {
    title: "Travely",
};
export default function Layout({ children }) {
    return (
        <html lang="vi">
            <body cz-shortcut-listen="true">
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
