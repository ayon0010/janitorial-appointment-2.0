import { DM_Sans } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import ScrollToTop from '@/components/ScrollToTop';
import Aoscompo from "@/utils/aos";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
const dmsans = DM_Sans({ subsets: ["latin"] });


export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={dmsans.className}>
                <SessionProvider>
                    <ThemeProvider
                        attribute="class"
                        enableSystem={true}
                        defaultTheme="system"
                    >
                        <Aoscompo>
                            <NextTopLoader color='#f9c78f' />
                            <section className="relative overflow-x-clip top-0 bg-primary circalanimat before:content-[''] before:absolute before:bg-[url('/images/work-grow/work-line.png')] before:bg-no-repeat before:bg-contain before:w-44 before:h-20 before:bottom-40 lg:before:inline-block before:hidden">
                                <div className='banner-shap it-wrapper'>
                                    {children}
                                </div>
                            </section>
                        </Aoscompo>
                        <ScrollToTop />
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
