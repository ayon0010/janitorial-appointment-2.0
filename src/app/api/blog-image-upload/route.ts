import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file || !(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { success: false, message: 'No image file provided' },
        { status: 400 },
      )
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET
    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Image upload is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.',
        },
        { status: 500 },
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString('base64')
    const dataUri = `data:${file.type};base64,${base64}`

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      resource_type: 'image',
      folder: 'blog-feature-images',
      public_id: `blog-${Date.now()}`,
    })

    if (!uploadResult?.secure_url) {
      return NextResponse.json(
        { success: false, message: 'Image upload failed' },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { success: true, url: uploadResult.secure_url },
      { status: 200 },
    )
  } catch (error) {
    console.error('Blog image upload error:', error)
    return NextResponse.json(
      { success: false, message: 'Unexpected error uploading image' },
      { status: 500 },
    )
  }
}

