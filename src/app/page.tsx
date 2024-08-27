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
//docker psql db=docker run -e POSTGRES_PASSWORD=password -e POSTGRES_DB=Wallet -p 5432:5432 -v Wallet:/var/lib/postgresql/data -d postgres

