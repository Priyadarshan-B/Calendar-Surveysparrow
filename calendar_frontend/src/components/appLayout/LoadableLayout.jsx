import { useEffect, useState } from "react";
import AppLayout from "./Layout";
import PageLoader from "../loader/loader";
export default function LoadableLayout({ body }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 300); 
    return () => clearTimeout(timeout);
  }, []);

  return loading ? <PageLoader /> : <AppLayout body={body} />;
}
