import CameraCapture from "../components/CameraCapture";

export default function CaptureScreen({ onCapture, onBack }) {
  return <CameraCapture onCapture={onCapture} onBack={onBack} />;
}
