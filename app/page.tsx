"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import {
  Upload,
  Download,
  Settings,
  Zap,
  Moon,
  Sun,
  Info,
  Palette,
  Scissors,
  Banana,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import imageCompression from "browser-image-compression"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link';



interface ImageData {
  id: string
  file: File
  originalUrl: string
  compressedUrl?: string
  originalSize: number
  compressedSize?: number
  width: number
  height: number
  newWidth?: number
  newHeight?: number
  error?: string
}





export default function CompresslyApp() {
  const [images, setImages] = useState<ImageData[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [quality, setQuality] = useState([80])
  const [resizeWidth, setResizeWidth] = useState("")
  const [resizeHeight, setResizeHeight] = useState("")
  const [resizePercentage, setResizePercentage] = useState("")
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [resizeMode, setResizeMode] = useState<"pixels" | "percentage" | "cm" | "inches">("pixels")
  const [outputFormat, setOutputFormat] = useState<"original" | "jpeg" | "png" | "webp">("original")
  const [cropMode, setCropMode] = useState<"none" | "custom" | "instagram" | "twitter" | "linkedin">("none")
  const [watermarkText, setWatermarkText] = useState("")
  const [watermarkPosition, setWatermarkPosition] = useState<
    "bottom-right" | "bottom-left" | "top-right" | "top-left" | "center"
  >("bottom-right")
  const [autoOptimize, setAutoOptimize] = useState(false)
  const [mounted, setMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()
  const [dpi, setDpi] = useState(300)
  const [open, setOpen] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const cropPresets = {
    instagram: { width: 1080, height: 1080, name: "Instagram Square" },
    twitter: { width: 1200, height: 675, name: "Twitter Header" },
    linkedin: { width: 1584, height: 396, name: "LinkedIn Banner" },
  }

  const convertToPixels = (value: number, unit: string, dpi: number) => {
    switch (unit) {
      case "cm":
        return Math.round((value * dpi) / 2.54) // 1 inch = 2.54 cm
      case "inches":
        return Math.round(value * dpi)
      default:
        return value
    }
  }

    const convertFromPixels = (pixels: number, unit: string, dpi: number) => {
    switch (unit) {
      case "cm":
        return Number(((pixels * 2.54) / dpi).toFixed(2))
      case "inches":
        return Number((pixels / dpi).toFixed(2))
      default:
        return pixels
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.src = URL.createObjectURL(file)
    })
  }

  const handleFileSelect = async (files: FileList) => {
    if (files.length === 0) return
    const newImages: ImageData[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.startsWith("image/")) {
        const dimensions = await getImageDimensions(file)
        const imageData: ImageData = {
        id: generateId(),
          file,
          originalUrl: URL.createObjectURL(file),
          originalSize: file.size,
          width: dimensions.width,
          height: dimensions.height,
        }
        newImages.push(imageData)
      }
    }

    setImages((prev) => [...prev, ...newImages])
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const calculateNewDimensions = (originalWidth: number, originalHeight: number) => {
    if (resizeMode === "percentage" && resizePercentage) {
      const percent = Number.parseInt(resizePercentage) / 100
      return {
        width: Math.round(originalWidth * percent),
        height: Math.round(originalHeight * percent),
      }
    } else if (resizeMode === "pixels") {
      let newWidth = resizeWidth ? Number.parseInt(resizeWidth) : originalWidth
      let newHeight = resizeHeight ? Number.parseInt(resizeHeight) : originalHeight

      if (maintainAspectRatio) {
        if (resizeWidth && !resizeHeight) {
          newHeight = Math.round((originalHeight * newWidth) / originalWidth)
        } else if (resizeHeight && !resizeWidth) {
          newWidth = Math.round((originalWidth * newHeight) / originalHeight)
        }
      }

      return { width: newWidth, height: newHeight }
    } else if (resizeMode === "cm" || resizeMode === "inches") {
      let newWidth = resizeWidth ? convertToPixels(Number.parseFloat(resizeWidth), resizeMode, dpi) : originalWidth
      let newHeight = resizeHeight ? convertToPixels(Number.parseFloat(resizeHeight), resizeMode, dpi) : originalHeight

      if (maintainAspectRatio) {
        if (resizeWidth && !resizeHeight) {
          newHeight = Math.round((originalHeight * newWidth) / originalWidth)
        } else if (resizeHeight && !resizeWidth) {
          newWidth = Math.round((originalWidth * newHeight) / originalHeight)
        }
      }

      return { width: newWidth, height: newHeight }
    }

    return { width: originalWidth, height: originalHeight }
  }

  const compressImages = async () => {
    if (!images) return

    setIsProcessing(true)

    try {
      const updatedImages = await Promise.all(
        images.map(async (imageData) => {
          let { width: newWidth, height: newHeight } = calculateNewDimensions(imageData.width, imageData.height)

          // Apply crop presets
          if (cropMode !== "none" && cropMode !== "custom" && cropPresets[cropMode as keyof typeof cropPresets]) {
            const preset = cropPresets[cropMode as keyof typeof cropPresets]
            newWidth = preset.width
            newHeight = preset.height
          }

          // Create canvas for processing
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")
          if (!ctx) throw new Error("Canvas context not available")

          canvas.width = newWidth
          canvas.height = newHeight

          // Load and draw image
          const img = new Image()
          img.crossOrigin = "anonymous"
          await new Promise((resolve) => {
            img.onload = resolve
            img.src = imageData.originalUrl
          })

          // Draw resized image
          ctx.drawImage(img, 0, 0, newWidth, newHeight)

          // Add watermark if specified
          if (watermarkText.trim()) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
            ctx.font = `${Math.max(16, newWidth / 40)}px Arial`
            ctx.textAlign = "right"
            ctx.textBaseline = "bottom"

            const padding = 20
            let x = newWidth - padding
            let y = newHeight - padding

            switch (watermarkPosition) {
              case "top-left":
                ctx.textAlign = "left"
                ctx.textBaseline = "top"
                x = padding
                y = padding
                break
              case "top-right":
                ctx.textAlign = "right"
                ctx.textBaseline = "top"
                x = newWidth - padding
                y = padding
                break
              case "bottom-left":
                ctx.textAlign = "left"
                ctx.textBaseline = "bottom"
                x = padding
                y = newHeight - padding
                break
              case "center":
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                x = newWidth / 2
                y = newHeight / 2
                break
            }

            ctx.fillText(watermarkText, x, y)
          }

          // Convert to desired format
          const outputMimeType =
            outputFormat === "original"
              ? imageData.file.type
              : outputFormat === "jpeg"
                ? "image/jpeg"
                : outputFormat === "png"
                  ? "image/png"
                  : "image/webp"

          return new Promise<ImageData>((resolve) => {
            canvas.toBlob(
              async (blob) => {
                if (!blob) {
                  resolve(imageData)
                  return
                }

                // Apply compression
                let compressionQuality = quality[0]

          if (autoOptimize) {
            // Smart quality based on file size, dimensions, and format
            const fileSizeMB = imageData.originalSize / (1024 * 1024)
            const totalPixels = imageData.width * imageData.height
            const isPhoto = imageData.file.type === "image/jpeg"
            const isPNG = imageData.file.type === "image/png"

            if (fileSizeMB > 5) {
              // Very large files - aggressive compression
              compressionQuality = isPhoto ? 50 : 60
            } else if (fileSizeMB > 2) {
              // Large files - moderate compression
              compressionQuality = isPhoto ? 60 : 70
            } else if (fileSizeMB > 0.5) {
              // Medium files - balanced compression
              compressionQuality = isPhoto ? 75 : 80
            } else {
              // Small files - preserve quality
              compressionQuality = isPNG ? 90 : 85
            }

            // Adjust for high-resolution images
            if (totalPixels > 8000000) {
              // 8MP+
              compressionQuality = Math.max(compressionQuality - 10, 40)
            }
          }
                
                const options = {
                  maxSizeMB: 10,
                  maxWidthOrHeight: Math.max(newWidth, newHeight),
                  useWebWorker: true,
            quality: compressionQuality / 100,
            initialQuality: compressionQuality / 100,
                  fileType: outputMimeType,
                }

                try {
                  const file = new File([blob], imageData.file.name, { type: outputMimeType })
                  const compressedFile = await imageCompression(file, options)
                  const compressedUrl = URL.createObjectURL(compressedFile)

                  const compressionWasEffective = compressedFile.size < imageData.originalSize

                  resolve({
                    ...imageData,
                    compressedUrl,
                    compressedSize: compressedFile.size,
                    newWidth,
                    newHeight,
                  })
                } catch (error) {
                  console.error("Compression failed for", imageData.file.name, error)
                  resolve(imageData)
                }
              },
              outputMimeType,
              quality[0] / 100,
            )
          })
        }),
      )

      setImages(updatedImages)
    } catch (error) {
      console.error("Batch compression failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadImage = (imageData: ImageData, index: number) => {
    if (!imageData.compressedUrl) return

    const link = document.createElement("a")
    link.href = imageData.compressedUrl
    link.download = `compressed_${imageData.file.name}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearImages = () => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.originalUrl)
      if (img.compressedUrl) {
        URL.revokeObjectURL(img.compressedUrl)
      }
    })
    setImages([])
  }

  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0)
  const totalCompressedSize = images.reduce((sum, img) => sum + (img.compressedSize || 0), 0)
  const compressionRatio =
    totalOriginalSize > 0 ? ((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100 : 0

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Banana className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                resizeimagefast
              </h1>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle menu"
                >
                <div className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-6xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-10 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Banana className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              resizeimagefast
            </h1>
          </div>
          <div className="flex items-center space-x-3">
              <div className={`${open ? 'block bg-black text-white dark:bg-white dark:text-black' : 'hidden'} absolute top-14 left-0 w-full  p-3 text-center  font-medium sm:static sm:flex sm:space-x-6 sm:bg-transparent sm:p-0 sm:items-center `}>
                <Link href="#about" className="hover:bg-muted-foreground/20 px-3 py-2 rounded-md transition-colors">
              About
              </Link>
              <Link href="/contact" className="hover:bg-muted-foreground/20 px-3 py-2 rounded-md transition-colors">
              Contact
              </Link>
              </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" aria-hidden="true" />
              )}
            </Button>


            <Button
              className="block sm:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              title={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Upload Area */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-purple-500 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
              <h2 className="text-lg sm:text-xl font-semibold mb-2">Drop an image here</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">or tap to browse files</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Supports JPG, PNG, WebP formats</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
              />
            </div>
          </CardContent>
        </Card>

        {images.length > 0 && (
          <>
            {/* Controls */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-8">
              {/* Compression Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Compression</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium">Quality: {quality[0]}%</Label>
                    <Slider value={quality} onValueChange={setQuality} max={100} min={10} step={5} className="mt-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Smaller file</span>
                      <span>Better quality</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Output Format</Label>
                    <Select value={outputFormat} onValueChange={(value: any) => setOutputFormat(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="original">Keep Original</SelectItem>
                        <SelectItem value="jpeg">JPEG</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="webp">WebP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Resize & Crop Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Scissors className="w-5 h-5" />
                    <span>Resize & Crop</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Crop Preset</Label>
                    <Select value={cropMode} onValueChange={(value: any) => setCropMode(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Crop</SelectItem>
                        <SelectItem value="instagram">Instagram Square (1080×1080)</SelectItem>
                        <SelectItem value="twitter">Twitter Header (1200×675)</SelectItem>
                        <SelectItem value="linkedin">LinkedIn Banner (1584×396)</SelectItem>
                        <SelectItem value="custom">Custom Size</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {cropMode === "custom" && (
                    <>
                      <Tabs
                        value={resizeMode}
                        onValueChange={(value) => setResizeMode(value as "pixels" | "percentage" | "cm" | "inches")}
                      >
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="pixels">Pixels</TabsTrigger>
                          <TabsTrigger value="percentage">%</TabsTrigger>
                          <TabsTrigger value="cm">CM</TabsTrigger>
                          <TabsTrigger value="inches">IN</TabsTrigger>
                        </TabsList>

                        <TabsContent value="pixels" className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="width">Width (px)</Label>
                              <Input
                                id="width"
                                type="number"
                                placeholder="Width"
                                value={resizeWidth}
                                onChange={(e) => setResizeWidth(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="height">Height (px)</Label>
                              <Input
                                id="height"
                                type="number"
                                placeholder="Height"
                                value={resizeHeight}
                                onChange={(e) => setResizeHeight(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="aspect-ratio"
                              checked={maintainAspectRatio}
                              onCheckedChange={setMaintainAspectRatio}
                            />
                            <Label htmlFor="aspect-ratio">Lock aspect ratio</Label>
                          </div>
                        </TabsContent>

                        <TabsContent value="percentage" className="space-y-4">
                          <div>
                            <Label htmlFor="percentage">Scale (%)</Label>
                            <Input
                              id="percentage"
                              type="number"
                              placeholder="e.g., 50"
                              value={resizePercentage}
                              onChange={(e) => setResizePercentage(e.target.value)}
                            />
                          </div>
                        </TabsContent>

                        <TabsContent value="cm" className="space-y-4">
                          <div className="mb-4">
                            <Label htmlFor="dpi">DPI (Dots Per Inch)</Label>
                            <Select value={dpi.toString()} onValueChange={(value) => setDpi(Number(value))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="72">72 DPI (Web)</SelectItem>
                                <SelectItem value="150">150 DPI (Draft Print)</SelectItem>
                                <SelectItem value="300">300 DPI (High Quality Print)</SelectItem>
                                <SelectItem value="600">600 DPI (Professional Print)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="width-cm">Width (cm)</Label>
                              <Input
                                id="width-cm"
                                type="number"
                                step="0.1"
                                placeholder="Width"
                                value={resizeWidth}
                                onChange={(e) => setResizeWidth(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="height-cm">Height (cm)</Label>
                              <Input
                                id="height-cm"
                                type="number"
                                step="0.1"
                                placeholder="Height"
                                value={resizeHeight}
                                onChange={(e) => setResizeHeight(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="aspect-ratio-cm"
                              checked={maintainAspectRatio}
                              onCheckedChange={setMaintainAspectRatio}
                            />
                            <Label htmlFor="aspect-ratio-cm">Lock aspect ratio</Label>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Current image: {convertFromPixels(images[0]?.width || 0, "cm", dpi)} ×{" "}
                            {convertFromPixels(images[0]?.height || 0, "cm", dpi)} cm
                          </div>
                        </TabsContent>

                        <TabsContent value="inches" className="space-y-4">
                          <div className="mb-4">
                            <Label htmlFor="dpi-inches">DPI (Dots Per Inch)</Label>
                            <Select value={dpi.toString()} onValueChange={(value) => setDpi(Number(value))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="72">72 DPI (Web)</SelectItem>
                                <SelectItem value="150">150 DPI (Draft Print)</SelectItem>
                                <SelectItem value="300">300 DPI (High Quality Print)</SelectItem>
                                <SelectItem value="600">600 DPI (Professional Print)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="width-inches">Width (inches)</Label>
                              <Input
                                id="width-inches"
                                type="number"
                                step="0.1"
                                placeholder="Width"
                                value={resizeWidth}
                                onChange={(e) => setResizeWidth(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="height-inches">Height (inches)</Label>
                              <Input
                                id="height-inches"
                                type="number"
                                step="0.1"
                                placeholder="Height"
                                value={resizeHeight}
                                onChange={(e) => setResizeHeight(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="aspect-ratio-inches"
                              checked={maintainAspectRatio}
                              onCheckedChange={setMaintainAspectRatio}
                            />
                            <Label htmlFor="aspect-ratio-inches">Lock aspect ratio</Label>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Current image: {convertFromPixels(images[0]?.width || 0, "inches", dpi)} ×{" "}
                            {convertFromPixels(images[0]?.height || 0, "inches", dpi)} inches
                          </div>
                        </TabsContent>
                      </Tabs>

                      {/* Print Size Presets */}
                      <div className="mt-4">
                        <Label className="text-sm font-medium mb-2 block">Common Print Sizes</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            aria-label="Resize to 4 by 6 inches"
                            title="Resize to 4×6 inches"
                            onClick={() => {
                              setResizeMode("inches");
                              setResizeWidth("4");
                              setResizeHeight("6");
                            }}
                          >
                            4×6 inches
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            aria-label="Resize to 5 by 7 inches"
                            title="Resize to 5×7 inches"
                            onClick={() => {
                              setResizeMode("inches");
                              setResizeWidth("5");
                              setResizeHeight("7");
                            }}
                          >
                            5×7 inches
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            aria-label="Resize to 8 by 10 inches"
                            title="Resize to 8×10 inches"
                            onClick={() => {
                              setResizeMode("inches");
                              setResizeWidth("8");
                              setResizeHeight("10");
                            }}
                          >
                            8×10 inches
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            aria-label="Resize to A4 size, 21 by 29.7 centimeters"
                            title="Resize to A4 (21×29.7 cm)"
                            onClick={() => {
                              setResizeMode("cm");
                              setResizeWidth("21");
                              setResizeHeight("29.7");
                            }}
                          >
                            A4 (21×29.7 cm)
                          </Button>

                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Watermark Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <span>Watermark</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="watermark-text">Watermark Text</Label>
                    <Input
                      id="watermark-text"
                      placeholder="© Your Brand"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Position</Label>
                    <Select value={watermarkPosition} onValueChange={(value: any) => setWatermarkPosition(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="top-left">Top Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                onClick={compressImages}
                disabled={isProcessing}
                className="flex items-center space-x-2"
                aria-busy={isProcessing}
                aria-label={isProcessing ? "Processing images" : "Compress images"}
                title={isProcessing ? "Processing..." : "Compress Images"}
              >
                <Zap className="w-4 h-4" aria-hidden="true" />
                <span>{isProcessing ? "Processing..." : "Compress Images"}</span>
              </Button>

              <Button
                variant="outline"
                onClick={clearImages}
                aria-label="Clear all uploaded images"
                title="Clear All"
              >
                Clear All
              </Button>

            </div>

            {/* Statistics */}
            {totalCompressedSize > 0 && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Original Size</p>
                      <p className="text-lg font-semibold">{formatFileSize(totalOriginalSize)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Final Size</p>
                      <p className="text-lg font-semibold">{formatFileSize(totalCompressedSize)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Space Saved</p>
                      <p className="text-lg font-semibold text-green-600">
                      {(totalOriginalSize > totalCompressedSize) ? (
                          formatFileSize(totalOriginalSize - totalCompressedSize)
                        ) : (
                            '0'
                        )}
                    </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Change</p>
                      <p className="text-lg font-semibold text-green-600">
                      {compressionRatio === 0
                        ? "0%"
                        : totalOriginalSize > totalCompressedSize
                          ? `-${Math.abs(compressionRatio).toFixed(1)}%`
                          : `+${Math.abs(compressionRatio).toFixed(1)}%`
                      }
                      %</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Image Preview Grid */}
            <div className="grid gap-6">
              {images.map((imageData, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Original Image */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Original</h4>
                          <Badge variant="secondary">
                            {imageData.width} × {imageData.height}
                          </Badge>
                        </div>
                        <div className="relative bg-muted rounded-lg overflow-hidden mb-3">
                          <img
                            src={imageData.originalUrl || "/placeholder.svg"}
                            alt="Original"
                            className="w-full h-48 object-contain"
                          />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{imageData.file.name}</span>
                          <span>{formatFileSize(imageData.originalSize)}</span>
                        </div>
                      </div>

                      {/* Compressed Image */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Resized</h4>
                          {imageData.newWidth && imageData.newHeight && (
                            <Badge variant="secondary">
                              {imageData.newWidth} × {imageData.newHeight}
                            </Badge>
                          )}
                        </div>
                        <div className="relative bg-muted rounded-lg overflow-hidden mb-3">
                          {imageData.compressedUrl ? (
                            <img
                              src={imageData.compressedUrl || "/placeholder.svg"}
                              alt="Compressed"
                              className="w-full h-48 object-contain"
                            />
                          ) : (
                            <div className="w-full h-48 flex items-center justify-center text-muted-foreground">
                              <Info className="w-8 h-8 mb-2" />
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            {imageData.compressedSize ? (
                              <>
                                <span>{formatFileSize(imageData.compressedSize)}</span>
                                <span className="text-green-600 ml-2">
                                  (-
                                  {(
                                    ((imageData.originalSize - imageData.compressedSize) / imageData.originalSize) *
                                    100
                                  ).toFixed(1)}
                                  %)
                                </span>
                              </>
                            ) : (
                              <span>Click compress to process</span>
                            )}
                          </div>
                          {imageData.compressedUrl && (
                            <Button
                              size="sm"
                              onClick={() => downloadImage(imageData, index)}
                              className="flex items-center space-x-1"
                              aria-label={`Download image ${index + 1}`}
                              title="Download"
                            >
                              <Download className="w-4 h-4" aria-hidden="true" />
                              <span>Download</span>
                            </Button>

                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

      

        {/* Privacy Notice */}
        <Card className="mt-12 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Your Privacy is Protected</h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  All image processing happens locally in your browser. Your images never leave your device, ensuring
                  complete privacy and security.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* About Section */}
      <div className="mt-28 sm:mt-28 space-y-6" id="about">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">About resizeimagefast</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Free, privacy-focused image compression that runs entirely in your browser. Reduce file sizes, resize
              images, and add watermarks without uploading anything.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Smart Compression</h3>
              <p className="text-sm text-muted-foreground">
                Reduce file sizes by up to 90% while maintaining visual quality
              </p>
            </div>

            <div><div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Settings className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">100% Private</h3>
              <p className="text-sm text-muted-foreground">
                All processing happens locally - your images never leave your device
              </p>
            </div>
            <div><div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Scissors className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Multiple Formats</h3>
              <p className="text-sm text-muted-foreground">
                Resize, crop, convert formats, and add watermarks in one tool
              </p>
            </div>
          </div>
        </div>
      </main>


      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                <Banana className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">resizeimagefast</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground max-w-md">
                <span>Free, privacy-focused image compression that runs entirely in your browser. Reduce file sizes, resize images, and add watermarks without uploading anything.</span>
              </div>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <Separator className="my-4" />
          <p className="text-center text-sm text-muted-foreground">
            © 2025 resizeimagefast. Fast, free, and privacy-focused image compression.
          </p>
        </div>
      </footer>
    </div>
  )
}
