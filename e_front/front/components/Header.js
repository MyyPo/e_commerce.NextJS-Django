import Link from "next/dist/client/link"

export default function Header() {
  return (<>
    <div className="p-4">
        <Link href='/'>Home</Link>
    </div>
    <div className="p-4">

        <Link href='/login'>Login</Link>

    </div>
    </>
  )
}
