const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const { v4: uuidv4 } = require("uuid");
const AWS_BUCKET_NAME = "sevenpos";
const AWS_BUCKET_REGION = "us-east-1";
const dotenv = require("dotenv").config();

//RECORDAR AGREGAR ESTO A LAS VARIABLES DE ENTORNO EN PROD
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const s3Client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});
/**
 * Sube una imagen a AWS S3.
 * @param {string} ImageData - Datos de la imagen en formato buffer.
 * @param {string} bucketName - Nombre del cubo de S3.
 * @param {string} objectKey - Clave del objeto en S3.
 * @param {string} contentType - Tipo de contenido de la imagen (por ejemplo, 'image/jpeg').
 * @returns {Promise} Una promesa que se resuelve cuando la imagen se ha cargado con éxito.
 */

async function uploadImage(binaryData, contentType = "image/png") {
  const objectKey = uuidv4() + binaryData.type.replace("image/", ".");

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: AWS_BUCKET_NAME,
      Key: objectKey,
      ContentType: contentType,
      Body: binaryData.data, // Utiliza el flujo como datos
    },
  });

  try {
    const result = await upload.done();
    return result.Location;
  } catch (error) {
    throw error;
  }
}

module.exports = { uploadImage };

