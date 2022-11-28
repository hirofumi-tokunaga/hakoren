import router from "next/router"

export default function Custom404() {
	router.push("/login")
  return <></>;
}