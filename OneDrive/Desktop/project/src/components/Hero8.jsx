
import { useRef, useState } from "react";
import axios from "axios";
import Section from "./Section";
import Button from "./Button";
import { ScrollParallax } from "react-just-parallax";
import { curve, heroBackground, music2,headphones } from "../assets";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import Companylogos from "./Companylogos";
import GeneratingH from "./GeneratingH";
import Generating from "./Generating";

const Hero8 = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [predictionResult, setPredictionResult] = useState(""); 
  const fileInputField = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault(); 

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully", response.data);
      setPredictionResult(response.data.genre_prediction); 
    } catch (error) {
      console.error("Error uploading file", error);
    } finally {
      setFile(null);
      setFileName(null);
    }
  };

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem]">
          <h1 className="h1 mb-6">
            Explore the Possibilities of&nbsp;AI&nbsp;tools with{" "}
            <span className="inline-block relative">
              QuantumVibes{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
        
          <Button href="/pricing" white>
            Get Started
          </Button>
        </div>
        <div className="relative max-w-[20rem]  mx-auto md:max-w-4xl xl:mb-22">
          <div className="relative z-1 p-0.5 rounded-1xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              <div className="aspect-[3/2] rounded-b-[0.9rem] overflow-hidden">
                <img
                  src={music2}
                  className="w-full  scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1440}
                  height={1800}
                  alt="background"
                />
                <ScrollParallax isAbsolutelyPositioned>
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col items-center justify-center mt-60 pt-60 "
                  >
                    <input
                      id="file-upload"
                      type="file"
                      name="music"
                      accept="audio/*"
                      onChange={handleFileChange}
                      ref={fileInputField}
                      className="hidden  "
                    />
                    <div className="flex flex-col md:flex-row items-center mt-4 space-x-4  ">
                      <Button
                        className="px-8 py-4 rounded-lg mt-2  "
                        onClick={() => fileInputField.current.click()}
                      >
                        {fileName ? `Selected: ${fileName}` : "Upload"}
                      </Button>
                      <Button
                        type="submit"
                        className="px-8 py-4 rounded-lg mt-2  "
                        disabled={!file}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                
                </ScrollParallax>
                

                  {/* Display the prediction result below the buttons */}
                  {predictionResult && (
                    <div className="mt-6 text-center  ">
                      <p className="text-lg font-semibold text-purple-500 ">
                        Predicted Genre: {predictionResult}
                      </p>
                    </div>
                  )}
              </div>
            </div>
            <Gradient />
          </div>
       
          <BackgroundCircles />
        </div>
        
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero8;
