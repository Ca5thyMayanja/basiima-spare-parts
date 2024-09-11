import React, { useCallback } from 'react'
import { ImageType } from './SelectColor'
import { useDropzone } from 'react-dropzone'

type Props = {
  item?: ImageType
  handleFileChange: (value: File) => void
}

export default function SelectImage({ item, handleFileChange }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the image files
    if (acceptedFiles.length) {
      handleFileChange(acceptedFiles[0])
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png'] },
  })

  return (
    <div
      {...getRootProps()}
      className=" border-2 border-slate-400 border-dashed cursor-pointer text-slate-400 flex items-center justify-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the Image here ...</p>
      ) : (
        <p>{item?.color} Image</p>
      )}
    </div>
  )
}
