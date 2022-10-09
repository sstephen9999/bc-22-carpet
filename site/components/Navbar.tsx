import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    return (
        <div>
            <nav>
                <div className="logo">
                    <Image src="/logo.png" alt="bleep.gg" width={655/4} height={188/4}/>
                </div>
                <Link href="/"><a className="font-switzer">About</a></Link>
                <Link href="/"><a className="font-switzer">Features</a></Link>
                <Link href="/"><a className="font-switzer">Get it now</a></Link>
            </nav>
        </div>
    );
}
 
export default Navbar;