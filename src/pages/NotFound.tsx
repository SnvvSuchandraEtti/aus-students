import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    const prevTitle = document.title;
    document.title = "Page Not Found — Aditya University Student Gallery";

    const descTag = document.querySelector('meta[name="description"]');
    const prevDesc = descTag?.getAttribute("content") ?? "";
    descTag?.setAttribute(
      "content",
      "The page you are looking for in the Aditya University Student Directory could not be found."
    );

    return () => {
      document.title = prevTitle;
      if (descTag && prevDesc) descTag.setAttribute("content", prevDesc);
    };
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <a href="/" className="text-primary hover:underline">
          Return to Home
        </a>
      </div>
    </main>
  );
};

export default NotFound;
