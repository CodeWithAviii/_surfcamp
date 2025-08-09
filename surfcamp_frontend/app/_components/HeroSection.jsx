import Link from 'next/link'
import React from 'react'

const HeroSection = ({ imgSrc ,healine, theme = "turquoise"}) => {
  return (
    <section className='hero'>
        <div className="hero__background">
            <img src={imgSrc ||'/assets/hero-home.png'} alt='hero' />
        </div>
        <div className={`hero__headline hero__headline--${theme}`}>
            {healine}
        </div>
        <button className={`btn btn--medium btn--${theme}`}>
            <Link href="/events">Book Now</Link>
        </button>
        <img className={`hero__logo hero__logo--${theme}`} src="/assets/logo.svg" alt="" />
    </section>
  )
}

export default HeroSection