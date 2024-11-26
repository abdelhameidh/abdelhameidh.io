import Section from "./section"
import Heading from "./Heading"
import { benefits } from "../constants";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
const Benefits = () => {
  return (
    <Section id="features"> 
    <div className="container relative z-2">
        <Heading 
        className="md:max-w-md lg:max-w-2xl"
        title="Chat Smarter, Not Harder with Brainwave" />
        <div className="flex flex-wrap gap-10 mb-10">
            {benefits.map((item) => (
              <div 
              className="block relative p-0.5 bg-no-repeat
               bg-[length:100%_100%] md:max-w-[24rem]"
               style = {{backgroundImage: `url(${item.backgroundUrl})`,
               }}
               key={item.id}>
                <div className="relative z-2 flex flex-col min-h-[22rem]
                 p-[2.4rem] pointer-events-none">
                    <h5 className="h5 mb-5"> {item.title}</ h5>
                    <p className="body-2 mb-6 text-n-3">
                        {item.text}
                         </p>
                    </ div>
                </ div>  
            ))}
        </div>
     
    </div>
    </Section>
  )
}

export default Benefits