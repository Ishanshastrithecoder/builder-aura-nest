import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="container py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">404</h1>
        <p className="mt-2 text-lg text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="mt-6 inline-block text-primary underline-offset-4 hover:underline">
          Return to Home
        </a>
      </section>
    </Layout>
  );
};

export default NotFound;
