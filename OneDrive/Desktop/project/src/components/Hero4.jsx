import { useRef, useState } from "react";
import axios from "axios";
import Section from "./section";
import Button from "./Button";
import { ScrollParallax } from "react-just-parallax";
import { curve, heroBackground, robot } from "../assets";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import Companylogos from "./Companylogos";
import Notification from "./Notification";
import GeneratingH from "./GeneratingH";
import { heroIcons } from "../constants";

const Hero4 = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [predictionResult, setPredictionResult] = useState("");
  const fileInputField = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("File selected: ", selectedFile); // Debug: Check if file is selected
      setFile(selectedFile); // Set the selected file in state
      setFileName(selectedFile.name); // Set the file name for display
    } else {
      console.error("No file selected in handleFileChange");
    }
  };

  // Trigger form submission only after file selection is confirmed
  const handleSubmit = async () => {
    if (!file) {
      console.error("No file selected in onSubmit");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully", response.data);
      setPredictionResult(response.data.genre); // Set the result
    } catch (error) {
      console.error("Error uploading file", error);
    } finally {
      setFile(null); // Reset file after submission
      setFileName(null); // Clear file name after submission
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
            Explore the Possibilities of&nbsp;AI&nbsp;Chatting with{" "}
            <span className="inline-block relative">
              Brainwave{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Unleash the power of AI within Brainwave. Upgrade your productivity
            with Brainwave, the open AI chat app.
          </p>
          <Button href="/pricing" white>
            Get Started
          </Button>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden">
                <img
                  src={robot}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="AI robot"
                />
                <ScrollParallax isAbsolutelyPositioned>
                  <GeneratingH className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />
                  <form className="flex flex-col items-center justify-center">
                    <input
                      id="file-upload"
                      type="file"
                      name="music"
                      accept="audio/*"
                      onChange={handleFileChange}
                      ref={fileInputField}
                      className="hidden"
                    />
                    <div className="flex flex-col md:flex-row items-center mt-4 space-x-4">
                      <Button
                        className="px-8 py-4 rounded-lg mt-2"
                        onClick={() => fileInputField.current.click()}
                      >
                        {fileName ? `Selected: ${fileName}` : "Upload"}
                      </Button>
                      <Button
                        type="button"
                        className="px-8 py-4 rounded-lg mt-2"
                        onClick={handleSubmit} // Trigger form submission only after file selection
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                  {predictionResult && (
                    <div className="mt-6 text-center">
                      <p className="text-lg font-semibold text-green-500">
                        Predicted Genre: {predictionResult}
                      </p>
                    </div>
                  )}
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>
          <BackgroundCircles />
        </div>
        <Companylogos className="hidden relative z-10 mt-20 lg:block" />
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero4;
