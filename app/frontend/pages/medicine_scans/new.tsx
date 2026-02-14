import { Form, Head, Link, router, usePage } from "@inertiajs/react"
import { ArrowLeft, Camera, Keyboard, Loader2, RotateCcw } from "lucide-react"
import { useCallback, useRef, useState } from "react"

import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
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
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Camera not supported on this browser. Please enter details manually.")
        return
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setStreaming(true)
        setError(null)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(`Camera error: ${message}. Please allow camera access or enter details manually.`)
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

    const stream = video.srcObject as MediaStream
    stream?.getTracks().forEach((track) => track.stop())
    setStreaming(false)

    onCapture(base64)
  }, [onCapture])

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-[15px] font-medium text-red-700">
          {error}
        </div>
      )}

      {!streaming ? (
        <button
          type="button"
          onClick={startCamera}
          className="w-full h-52 rounded-2xl border-3 border-dashed border-gray-300 hover:border-[#C4954A] bg-gray-50 flex flex-col items-center justify-center gap-4 transition-colors active:scale-[0.98]"
        >
          <div className="h-16 w-16 rounded-2xl bg-[#2D2926] flex items-center justify-center">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <span className="text-[17px] font-bold text-gray-600">Tap to Open Camera</span>
        </button>
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-2xl overflow-hidden bg-black">
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
            className="w-full h-14 text-[17px] font-bold bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-xl"
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
    <div className="space-y-5">
      <div className="rounded-xl bg-[#2D2926] p-4 text-[15px] font-bold text-white">
        Medicine detected! Review and edit below, then add it.
      </div>

      {result.error && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-[15px] font-medium text-amber-700">
          {result.error}
        </div>
      )}

      <Form method="post" action={medicationsPath()} className="space-y-5">
        {({ processing, errors }) => (
          <>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[15px] font-bold text-gray-700">
                Medication Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={result.name || ""}
                className="text-[18px] h-14 rounded-xl border-2 border-gray-300 focus:border-[#B8860B] focus:ring-[#B8860B]"
                disabled={processing}
              />
              <InputError messages={errors.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dosage" className="text-[15px] font-bold text-gray-700">
                Dosage
              </Label>
              <Input
                id="dosage"
                name="dosage"
                type="text"
                defaultValue={result.dosage || ""}
                className="text-[18px] h-14 rounded-xl border-2 border-gray-300 focus:border-[#B8860B] focus:ring-[#B8860B]"
                disabled={processing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions" className="text-[15px] font-bold text-gray-700">
                Instructions
              </Label>
              <Input
                id="instructions"
                name="instructions"
                type="text"
                defaultValue={result.instructions || ""}
                className="text-[18px] h-14 rounded-xl border-2 border-gray-300 focus:border-[#B8860B] focus:ring-[#B8860B]"
                disabled={processing}
              />
            </div>

            <input type="hidden" name="schedules[]" value="morning" />
            <input type="hidden" name="schedules[]" value="afternoon" />
            <input type="hidden" name="schedules[]" value="evening" />

            <p className="text-[14px] text-gray-500">
              Schedule defaults to morning, afternoon, and evening.
            </p>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 h-14 text-[17px] font-bold bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-xl"
                disabled={processing}
              >
                {processing && <Spinner className="mr-2" />}
                Confirm & Add
              </Button>
              <button
                type="button"
                onClick={() => router.visit(newMedicineScanPath())}
                className="h-14 w-14 rounded-xl border-2 border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors"
              >
                <RotateCcw className="h-5 w-5 text-gray-500" />
              </button>
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

  function handleCapture(base64: string) {
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

      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href={medicationsPath()}
            className="h-12 w-12 rounded-xl bg-white border-2 border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Link>
          <h1 className="text-[24px] font-bold text-gray-900">
            Scan Medicine
          </h1>
        </div>

        <div className="rounded-2xl bg-white border-2 border-gray-200 p-6 md:p-8">
          {processing ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-[#B8860B]" />
              <p className="text-[17px] font-bold text-gray-700">
                Analyzing medicine label...
              </p>
              <p className="text-[14px] text-gray-500">
                This may take a few seconds
              </p>
            </div>
          ) : scan_result ? (
            <ConfirmationForm result={scan_result} />
          ) : (
            <div className="space-y-6">
              <p className="text-[16px] text-gray-600">
                Take a photo of your medicine label or packaging.
                AI will extract the details automatically.
              </p>

              <CameraCapture onCapture={handleCapture} />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t-2 border-gray-200" />
                </div>
                <div className="relative flex justify-center text-[13px] font-bold uppercase tracking-wider">
                  <span className="bg-white px-4 text-gray-400">Or</span>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full h-14 rounded-xl text-[16px] font-bold border-2 border-gray-300 hover:bg-gray-50"
              >
                <Link href={newMedicationPath()}>
                  <Keyboard className="h-5 w-5 mr-2" />
                  Enter Manually
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
