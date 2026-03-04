export default function Layout({ children }) {
    return (
        <html>
            <body cz-shortcut-listen="true">{children}</body>
        </html>
    );
}
