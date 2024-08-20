import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-white flex flex-auto items-center justify-around">
        <Link href="/secret-phrase">Create New mnmonics to login</Link>
        <br />
        <Link href="/login">Login With mnmonics</Link>
      </div>
    </>
  );
}
