import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VideoIcon, Zap, Loader2 } from "lucide-react";

const CameraCapture: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const streamRef = useRef<MediaStream | null>(null);

  const toggleCamera = async () => {
    if (isCameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
      setError(null);
    } else {
      setIsLoading(true);
      setError(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          await videoRef.current.play();
        }

        setIsCameraActive(true);
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
        setError("Não foi possível acessar a câmera. Verifique as permissões.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="max-w-md mx-auto my-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <VideoIcon className="mr-2 h-5 w-5" /> Câmera
        </CardTitle>
        <CardDescription>Acesse o hardware do dispositivo.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Container da Câmera */}
        <div className="relative border rounded-lg overflow-hidden bg-black aspect-video">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center p-4 bg-red-500/80 text-white text-center">
              {error}
            </div>
          )}

          {/* O elemento onde o feed de vídeo será exibido */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ display: isCameraActive ? "block" : "none" }}
          />
        </div>

        {/* Botão de Ação */}
        <Button
          onClick={toggleCamera}
          disabled={isLoading}
          className="w-full"
          variant={isCameraActive ? "destructive" : "default"}
        >
          {isLoading ? (
            "Aguardando..."
          ) : isCameraActive ? (
            "Desligar Câmera"
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" /> Ligar Câmera
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CameraCapture;
