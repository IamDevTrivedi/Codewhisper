import React from 'react'
import { BackgroundLinesUse } from '../components/BackgroundLinesUse'
import { MacbookScrollUse } from '../components/MacbookScrollUse'
import { FeaturesSectionForHome } from '../components/FeaturesSectionForHome'
import { HeroHighlightUse } from '../components/HeroHighlightUse'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/NavBarHome'

export default function Home() {


  document.title = "CodeWhisper";

  return (
    <div className='bg-black'>

      <Navbar className="text-white" />
      <BackgroundLinesUse />
      <MacbookScrollUse />
      <FeaturesSectionForHome />
      <HeroHighlightUse />
      <Footer />

    </div>
  )
}
