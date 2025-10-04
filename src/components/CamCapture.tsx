import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera, RefreshCw, X, Loader2 } from "lucide-react";

const CameraCapture: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCapturedImage(null);
    setIsCameraActive(false);
  };

  const startCamera = useCallback(
    async (mode: "user" | "environment") => {
      stopCamera();
      setIsLoading(true);
      setError(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: mode },
        });

        streamRef.current = stream;
        setFacingMode(mode);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setIsCameraActive(true);
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);

        if (mode === "environment" && facingMode === "user") {
          // Não faz nada, a câmera já falhou na tentativa inicial
        } else {
          setError(
            `Não foi possível acessar a câmera. Tente trocar para a câmera ${
              mode === "user" ? "traseira" : "frontal"
            }.`
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [facingMode]
  );

  const switchCamera = () => {
    const newMode = facingMode === "user" ? "environment" : "user";
    startCamera(newMode);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);

      stopCamera();
    }
  };

  React.useEffect(() => {
    startCamera(facingMode);
    return () => {
      stopCamera();
    };
  }, [startCamera]);

  return (
    <Card className="max-w-md mx-auto my-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Camera className="mr-2 h-5 w-5" /> Captura de Foto
        </CardTitle>
        <CardDescription>
          Use a câmera do seu dispositivo para tirar fotos.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Visualizador da Imagem Capturada */}
        {capturedImage ? (
          <div className="relative">
            <img
              src={capturedImage}
              alt="Foto Capturada"
              className="w-full rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => {
                setCapturedImage(null);
                startCamera(facingMode);
              }}
              className="absolute top-2 right-2 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          /* Container da Câmera (Vídeo/Loading/Erro) */
          <div className="relative border rounded-lg overflow-hidden bg-black aspect-video">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center p-4 bg-red-500/80 text-white text-center">
                {error}
              </div>
            )}

            {/* O elemento <video> */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${
                isCameraActive ? "block" : "hidden"
              }`}
            />
          </div>
        )}

        {/* Canvas (Elemento invisível para a conversão do frame em imagem) */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Botões de Ação */}
        <div className="flex justify-between space-x-2">
          {isCameraActive && (
            <Button onClick={takePhoto} className="flex-grow">
              <Camera className="mr-2 h-4 w-4" /> Tirar Foto
            </Button>
          )}

          {!capturedImage && (
            <Button
              onClick={switchCamera}
              variant="outline"
              disabled={isLoading || !isCameraActive}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {facingMode === "user" ? "Traseira" : "Frontal"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CameraCapture;
