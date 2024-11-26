import ButtonSvg from "../assets/svg/ButtonSvg";

const ButtonUpload = ({ className, onClick, children, px, white }) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;
  const spanClasses = "relative z-10";
 /*
  const handleUploadClick = (event) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'audio/*'; // Accept only audio files
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        onClick(file); // Pass the file to the parent component's onClick function
      }
    };
    fileInput.click();
  };
  */

  return (
    /*
    <button className={classes} onClick={handleUploadClick}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </button>
    */
    <button type="submit" className={classes}>
    <span className="relative z-10">{children}</span>
    {ButtonSvg(white)}
  </button>
  );
};

export default ButtonUpload;
