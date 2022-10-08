import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    return (
        <div>
            <nav>
                <div className="logo">
                    <h1>bleep.gg</h1>
                </div>
                <Link href="/"><a>About</a></Link>
                <Link href="/"><a>Features</a></Link>
                <Link href="/"><a>Download</a></Link>
            </nav>
        </div>
    );
}
 
export default Navbar;