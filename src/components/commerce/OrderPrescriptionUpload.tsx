"use client"

import * as React from"react"
import { Upload, FileText, X, AlertCircle } from"lucide-react"
import { motion, AnimatePresence } from"framer-motion"
import { cn } from"@/lib/utils"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "application/pdf"]
const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.pdf"

interface OrderPrescriptionUploadProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  className?: string
}

export function OrderPrescriptionUpload({
  files,
  onFilesChange,
  className,
}: OrderPrescriptionUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const validateFiles = (incoming: FileList | File[]): File[] => {
    const valid: File[] = []
    const errors: string[] = []

    Array.from(incoming).forEach((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        errors.push(`"${file.name}" is not a supported format`)
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`"${file.name}" exceeds 5MB limit`)
        return
      }
      valid.push(file)
    })

    if (errors.length > 0) {
      setError(errors[0])
      setTimeout(() => setError(null), 4000)
    }

    return valid
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files
    if (!selected || selected.length === 0) return

    const validated = validateFiles(selected)
    if (validated.length > 0) {
      onFilesChange([...files, ...validated])
    }

    // Reset input so same file can be re-selected
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const handleRemoveFile = (index: number) => {
    const next = files.filter((_, i) => i !== index)
    onFilesChange(next)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const dropped = e.dataTransfer.files
    if (!dropped || dropped.length === 0) return

    const validated = validateFiles(dropped)
    if (validated.length > 0) {
      onFilesChange([...files, ...validated])
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Drop Zone */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "group flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 transition-colors",
          isDragging
            ? "border-brand-500 bg-brand-50"
            : "border-sand-300 bg-sand-50 hover:border-brand-400 hover:bg-sand-100"
        )}
      >
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
            isDragging
              ? "bg-brand-100"
              : "bg-sand-200 group-hover:bg-brand-100"
          )}
        >
          <Upload
            className={cn(
              "h-5 w-5 transition-colors",
              isDragging
                ? "text-brand-500"
                : "text-sand-500 group-hover:text-brand-500"
            )}
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-sand-700">
            {isDragging ? "Drop files here" : "Tap to upload or drag & drop"}
          </p>
          <p className="mt-0.5 text-xs text-sand-400">
            JPG, PNG or PDF, max 5MB each
          </p>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              <p className="text-xs text-red-600">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File List */}
      <AnimatePresence initial={false}>
        {files.map((file, index) => (
          <motion.div
            key={`${file.name}-${file.lastModified}-${index}`}
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 rounded-lg border border-sand-200 bg-white px-3 py-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                <FileText className="h-4 w-4 text-brand-500" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="truncate text-sm font-medium text-sand-700">
                  {file.name}
                </p>
                <p className="text-xs text-sand-400">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sand-400 transition-colors hover:bg-sand-100 hover:text-sand-600"
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
