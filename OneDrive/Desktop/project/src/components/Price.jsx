import { smallSphere, stars } from "../assets"
import Heading from "./Heading"
import Section from "./section"
import PricingList from "./PricingList"
import { LeftLine, RightLine } from "./design/Pricing";


const Price = () => {
  return (
    <Section>
        <div className="container relative z-2">
            <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
                <img
                src={smallSphere}
                className="relative z-1"
                width={250}
                height={250}
                alt = "sphere" />
                <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <img
                    src={stars}
                    width={950}
                    height={400}
                    className="w-full"
                    alt="starts" /> 
                </div>
            </div>
            <Heading
             tag="Get started with Brainwave"
             title="Pay once, use forever" />
             <div className="relative">
                <PricingList />
                <LeftLine />
                <RightLine />
             </div>
             <div className="flex justify-center mt-10">
                <a className="text-xs font-code font-bold tracking-wider uppercase border-b"
                href="/Price">
                    See full details
                </a>
             </div>
        </div>
    </Section>
  );
};

export default Price