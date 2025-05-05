"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  apiVersion: "2006-03-01",
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getSignedURL(fileName: string) {
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    ContentType: "multipart/form-data",
  });

  // @ts-ignore
  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 900,
  });

  return {
    success: { signedUrl: signedURL, imageUrl: signedURL.split("?")[0] },
  };
}
