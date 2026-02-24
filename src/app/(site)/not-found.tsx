import HeroSub from "@/components/SharedComponent/HeroSub";
import NotFound from "../../../NotFound";
import { Metadata } from "next";
import { SITE_NAME } from "@/data/seo-keywords";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for could not be found.",
  robots: { index: false, follow: true },
};

const ErrorPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "404" },
  ];
  return (
    <>
      <HeroSub
        title="404"
        description="We Can't Seem to Find The Page You're Looking For."
        
      />
      <NotFound />
    </>
  );
};

export default ErrorPage;
