import dynamic from "next/dynamic";

const Calendly = dynamic(() => import("./Calendly"), {
  ssr: false,
});

export default function Home() {
  return <Calendly />;
}
