import React from 'react'
import ImagesSection from '../components/Home/ImagesSection/ImagesSection'
import WhyChoose from '../components/Home/WhyChoose/WhyChoose'
import ExploreProducts from '../components/Home/Products/ExploreProducts'
import Feedback from '../components/Home/Feedback/Feedback'
import Stories from '../components/Home/Stories/Stories'
import Partner from '../components/Partner/Partner'


export default function Home() {
  return (
    <div>
     <ImagesSection/>
     <WhyChoose/>
     <ExploreProducts/>
     <Feedback/>
     <Stories/>
     <Partner/>
    </div>
  )
}
