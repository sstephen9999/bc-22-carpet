import { useEffect } from "react";

const Navitem = () => {
    const [anchorTarget, setAnchorTarget] = useState(null);

    useEffect(() => {
        setAnchorTarget(document.getElementById(itemName));
    }, [itemName]);

    const handleClick = event => {
        event.preventDefault();
        anchorTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return (
        <a href={`#${itemName}`}
         onClick={handleClick}
         className={active}
         ariaLabel={`Scroll to ${itemName}`}>
        {itemName}
      </a>
    );
}
 
export default Navitem;