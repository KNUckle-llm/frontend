import { LoaderCircle } from "lucide-react";

interface SVGLoadingSpinnerProps {
  message?: string;
}
const SVGLoadingSpinner = ({ message }: SVGLoadingSpinnerProps) => {
  return (
    <div
      className={
        "flex justify-center items-center gap-2 mx-auto col-span-4 w-1/3 h-full pt-20"
      }
    >
      <LoaderCircle size={30} className={"text-3xl animate-spin"} />
      {message && <span> {message}</span>}
    </div>
  );
};

export default SVGLoadingSpinner;
