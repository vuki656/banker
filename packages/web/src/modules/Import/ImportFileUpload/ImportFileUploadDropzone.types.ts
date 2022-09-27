export type ImportFileUploadDropzoneProps = {
    onCompleted(file: File): void
}

export type ExcelRowType = Record<string, number | string>
