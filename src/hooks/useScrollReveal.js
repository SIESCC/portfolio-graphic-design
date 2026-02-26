import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollReveal(once = true, margin = "-100px") {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin });

    return { ref, isInView };
}
