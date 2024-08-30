import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link";
export default function Home() {

  return <div className="flex min-h-screen justify-center items-center bg-black text-white">      
    <div className="flex flex-col space-y-4 items-center  bg-black text-white justify-center text-xl">
  <Button variant="outline">
    <Link href="/secret-phrase">Create New Mnemonics to Login</Link>
  </Button>
  <Button variant="outline">
    <Link href="/login">Login with Mnemonics</Link>
  </Button>
</div>
</div>
  
}
//docker psql db=docker run -e POSTGRES_PASSWORD=password -e POSTGRES_DB=Wallet -p 5432:5432 -v Wallet:/var/lib/postgresql/data -d postgres
