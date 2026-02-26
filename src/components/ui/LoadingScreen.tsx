import Lottie from "lottie-react";
import RippleEffect from "../../assets/animation/RippleEffect.json";

export default function LoadingScreen() {
  return (
    <div className="w-auto h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Lottie
        animationData={RippleEffect}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
