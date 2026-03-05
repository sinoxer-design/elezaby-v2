"use client"

import * as React from"react"
import Image from"next/image"
import { Upload, CheckCircle2, AlertCircle, FileText } from"lucide-react"
import { motion, AnimatePresence } from"framer-motion"
import { cn } from"@/lib/utils"
import { Button } from"@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from"@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from"@/components/ui/dialog"
import { OrderPrescriptionUpload } from"./OrderPrescriptionUpload"

interface CartItemForPrescription {
  id: string
  name: string
  imageUrl: string
  requiresPrescription?: boolean
}

interface CheckoutPrescriptionSectionProps {
  items: CartItemForPrescription[]
  className?: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "application/pdf"]

export function CheckoutPrescriptionSection({
  items,
  className,
}: CheckoutPrescriptionSectionProps) {
  const prescriptionItems = items.filter((item) => item.requiresPrescription)
  const [orderFiles, setOrderFiles] = React.useState<File[]>([])
  const [perProductFiles, setPerProductFiles] = React.useState<
    Record<string, File | null>
  >({})
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [activeProductId, setActiveProductId] = React.useState<string | null>(
    null
  )
  const perProductInputRef = React.useRef<HTMLInputElement>(null)

  // Nothing to show if no items require prescriptions
  if (prescriptionItems.length === 0) return null

  const orderUploadComplete = orderFiles.length > 0
  const allPerProductUploaded =
    prescriptionItems.length > 0 &&
    prescriptionItems.every((item) => perProductFiles[item.id])

  const handlePerProductClick = (productId: string) => {
    setActiveProductId(productId)
    setDialogOpen(true)
  }

  const handlePerProductFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file || !activeProductId) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      return
    }

    setPerProductFiles((prev) => ({
      ...prev,
      [activeProductId]: file,
    }))
    setDialogOpen(false)
    setActiveProductId(null)

    // Reset input
    if (perProductInputRef.current) {
      perProductInputRef.current.value = ""
    }
  }

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      setTimeout(() => {
        setActiveProductId(null)
      }, 300)
    }
  }

  const activeProduct = prescriptionItems.find(
    (item) => item.id === activeProductId
  )

  return (
    <section className={cn("rounded-2xl border border-sand-200 bg-white", className)}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-sand-100 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50">
          <AlertCircle className="h-4.5 w-4.5 text-amber-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-sand-800">
            Prescription Required
          </h3>
          <p className="text-xs text-sand-500">
            {prescriptionItems.length === 1
              ? "1 item in your cart requires a prescription"
              : `${prescriptionItems.length} items in your cart require prescriptions`}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <Tabs defaultValue="order" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="order" className="flex-1 gap-1.5 text-xs">
              <Upload className="h-3.5 w-3.5" />
              Upload for entire order
            </TabsTrigger>
            <TabsTrigger value="per-product" className="flex-1 gap-1.5 text-xs">
              <FileText className="h-3.5 w-3.5" />
              Upload per product
            </TabsTrigger>
          </TabsList>

          {/* Tab: Entire Order */}
          <TabsContent value="order" className="mt-4">
            <OrderPrescriptionUpload
              files={orderFiles}
              onFilesChange={setOrderFiles}
            />

            {orderUploadComplete && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <p className="text-xs font-medium text-emerald-700">
                  Prescription uploaded for your order
                </p>
              </motion.div>
            )}
          </TabsContent>

          {/* Tab: Per Product */}
          <TabsContent value="per-product" className="mt-4">
            <div className="flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {prescriptionItems.map((item, index) => {
                  const uploaded = !!perProductFiles[item.id]

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-3 transition-colors",
                        uploaded
                          ? "border-emerald-200 bg-emerald-50/50"
                          : "border-sand-200 bg-sand-50/50"
                      )}
                    >
                      {/* Product Image */}
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="truncate text-sm font-medium text-sand-700">
                          {item.name}
                        </p>
                        {uploaded ? (
                          <span className="mt-0.5 flex items-center gap-1 text-xs text-emerald-600">
                            <CheckCircle2 className="h-3 w-3" />
                            Prescription uploaded
                          </span>
                        ) : (
                          <span className="mt-0.5 text-xs text-sand-400">
                            Prescription needed
                          </span>
                        )}
                      </div>

                      {/* Upload Button */}
                      <Button
                        type="button"
                        variant={uploaded ? "outline" : "upload-rx"}
                        size="sm"
                        onClick={() => handlePerProductClick(item.id)}
                        className={cn(
                          "shrink-0 rounded-lg",
                          uploaded &&
                            "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                        )}
                      >
                        {uploaded ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Change
                          </>
                        ) : (
                          <>
                            <Upload className="h-3.5 w-3.5" />
                            Upload
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {allPerProductUploaded && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  <p className="text-xs font-medium text-emerald-700">
                    All prescriptions uploaded
                  </p>
                </motion.div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Per-Product Upload Dialog */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="rounded-xl sm:max-w-md">
          <DialogHeader className="text-center">
            <DialogTitle className="text-lg font-semibold text-sand-800">
              Upload Prescription
            </DialogTitle>
            <DialogDescription className="text-sm text-sand-500">
              Upload a valid prescription for{" "}
              <span className="font-medium text-sand-700">
                {activeProduct?.name}
              </span>
            </DialogDescription>
          </DialogHeader>

          {/* Upload Area */}
          <button
            type="button"
            onClick={() => perProductInputRef.current?.click()}
            className={cn(
              "group flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 transition-colors",
              "border-sand-300 bg-sand-50 hover:border-brand-400 hover:bg-sand-100"
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand-200 transition-colors group-hover:bg-brand-100">
              <Upload className="h-5 w-5 text-sand-500 transition-colors group-hover:text-brand-500" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-sand-700">
                Tap to upload
              </p>
              <p className="mt-0.5 text-xs text-sand-400">
                JPG, PNG or PDF, max 5MB
              </p>
            </div>
          </button>

          <input
            ref={perProductInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handlePerProductFileChange}
            className="hidden"
          />

          {/* Note */}
          <p className="text-center text-xs leading-relaxed text-sand-400">
            Your prescription will be verified by our pharmacist within 30
            minutes
          </p>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export type { CartItemForPrescription, CheckoutPrescriptionSectionProps }
