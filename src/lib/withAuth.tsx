// lib/withAuth.tsx

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuth = (props: any) => {
    const [session, setSession] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const currentSession = await auth();
        if (!currentSession) {
          redirect("/sign-in");
        } else {
          setSession(currentSession);
        }
        setLoading(false);
      };

      checkAuth();
    }, []);

    if (loading) {
      return <div>Loading...</div>; // Or any loading spinner/component
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
