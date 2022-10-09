import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react';

const Navbar = () => {
    return (
        <div>
            <nav>
                <div className="logo">
                    <Link href="/">
                        <Image src="/logo.png" alt="bleep.gg" width={655/4} height={188/4}/>
                    </Link>
                </div>
                <Link href="#about"><a className="font-switzer">About</a></Link>
                <Link href="#features"><a className="font-switzer">Features</a></Link>
                <Link href="#getitnow"><a className="font-switzer">Get it now</a></Link>
            </nav>
        </div>
    );
}
 
export default Navbar;