import { useEffect } from "react";
import { useRouter } from "next/router";
import userStore from "@/store/userStore";

const WithPrivateRoute = ({ children }) => {
  const router = useRouter();
  const user = userStore((state) => state.userInfo);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user?.sub) router.push("/login");
  }, []);

  return <>{children}</>;
};

export default WithPrivateRoute;
