import { Form, Head, Link, router, usePage } from "@inertiajs/react"
import { ArrowLeft, Camera, Keyboard, Loader2, RotateCcw } from "lucide-react"
import { useCallback, useRef, useState } from "react"

import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AppLayout from "@/layouts/app-layout"
import {
  medicationsPath,
  medicineScansPath,
  newMedicationPath,
  newMedicineScanPath,
} from "@/routes"

interface ScanResult {
  name?: string
  dosage?: string
  instructions?: string
  error?: string
}

interface ScanPageProps {
  scan_result?: ScanResult
}

function CameraCapture({
  onCapture,
}: {
  onCapture: (base64: string) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setStreaming(true)
        setError(null)
      }
    } catch {
      setError(
        "Camera access denied. Please allow camera access or enter details manually.",
      )
    }
  }, [])

  const capturePhoto = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    ctx?.drawImage(video, 0, 0)

    const base64 = canvas.toDataURL("image/jpeg", 0.8).split(",")[1]

    // Stop camera
    const stream = video.srcObject as MediaStream
    stream?.getTracks().forEach((track) => track.stop())
    setStreaming(false)

    onCapture(base64)
  }, [onCapture])

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!streaming ? (
        <Button
          type="button"
          onClick={startCamera}
          className="w-full h-16 text-lg bg-emerald-600 hover:bg-emerald-700"
        >
          <Camera className="h-6 w-6 mr-3" />
          Open Camera
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full"
            />
          </div>
          <Button
            type="button"
            onClick={capturePhoto}
            className="w-full h-14 text-lg bg-emerald-600 hover:bg-emerald-700"
          >
            <Camera className="h-5 w-5 mr-2" />
            Capture Photo
          </Button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

function ConfirmationForm({ result }: { result: ScanResult }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
        Medicine detected! Review and edit the details below, then add it.
      </div>

      {result.error && (
        <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
          {result.error}
        </div>
      )}

      <Form method="post" action={medicationsPath()} className="space-y-4">
        {({ processing, errors }) => (
          <>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">
                Medication Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={result.name || ""}
                className="text-lg h-12"
                disabled={processing}
              />
              <InputError messages={errors.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dosage" className="text-base">
                Dosage
              </Label>
              <Input
                id="dosage"
                name="dosage"
                type="text"
                defaultValue={result.dosage || ""}
                className="text-lg h-12"
                disabled={processing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions" className="text-base">
                Instructions
              </Label>
              <Input
                id="instructions"
                name="instructions"
                type="text"
                defaultValue={result.instructions || ""}
                className="text-lg h-12"
                disabled={processing}
              />
            </div>

            {/* Default to all three schedules for scanned meds */}
            <input type="hidden" name="schedules[]" value="morning" />
            <input type="hidden" name="schedules[]" value="afternoon" />
            <input type="hidden" name="schedules[]" value="evening" />

            <p className="text-xs text-stone-400">
              Schedule will default to morning, afternoon, and evening. You can
              adjust later.
            </p>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 h-12 text-base bg-emerald-600 hover:bg-emerald-700"
                disabled={processing}
              >
                {processing && <Spinner className="mr-2" />}
                Confirm & Add
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12"
                onClick={() => router.visit(newMedicineScanPath())}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Rescan
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  )
}

export default function NewMedicineScan() {
  const { scan_result } = usePage<ScanPageProps>().props
  const [processing, setProcessing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  function handleCapture(base64: string) {
    setCapturedImage(base64)
    setProcessing(true)
    router.post(
      medicineScansPath(),
      { image: base64 },
      {
        onFinish: () => setProcessing(false),
      },
    )
  }

  return (
    <AppLayout>
      <Head title="Scan Medicine" />

      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href={medicationsPath()}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-stone-900">
            Scan Medicine Label
          </h1>
        </div>

        <Card>
          <CardContent className="p-6">
            {processing ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
                <p className="text-lg text-stone-600">
                  Analyzing medicine label...
                </p>
                <p className="text-sm text-stone-400">
                  This may take a few seconds
                </p>
              </div>
            ) : scan_result ? (
              <ConfirmationForm result={scan_result} />
            ) : (
              <div className="space-y-6">
                <p className="text-stone-500">
                  Take a photo of your medicine label or packaging. AI will
                  extract the medication details automatically.
                </p>

                <CameraCapture onCapture={handleCapture} />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-stone-500">or</span>
                  </div>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full h-12"
                >
                  <Link href={newMedicationPath()}>
                    <Keyboard className="h-5 w-5 mr-2" />
                    Enter Manually
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
