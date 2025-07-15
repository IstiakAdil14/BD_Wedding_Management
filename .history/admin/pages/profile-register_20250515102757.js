import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ProfileRegister() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return null;
}
