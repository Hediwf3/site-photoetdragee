import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        })

        // Sync Lenis scroll with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        // This ensures GSAP and Lenis are perfectly in sync to prevent scroll lag
        const raf = (time: number) => {
            lenis.raf(time * 1000)
        }
        gsap.ticker.add(raf)
        gsap.ticker.lagSmoothing(0)

            // Provide global access for page-specific overrides
            ; (window as any).lenis = lenis

        return () => {
            gsap.ticker.remove(raf)
            lenis.destroy()
        }
    }, [])

    return null
}
