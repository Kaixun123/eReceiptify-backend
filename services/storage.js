const { Storage } = require('@google-cloud/storage');
const fs = require('fs');

const storage = new Storage({ keyFilename: 'key.json' });
const bucketName = 'ereceiptify-assets';

async function uploadFile(filePath) {
    const fileStream = fs.createReadStream(filePath);
    await storage.bucket(bucketName).upload(fileStream, {
        gzip: true,
        metadata: {
            cacheControl: 'public, max-age=31536000',
        },
    });

    console.info('Uploaded File');
}

async function generateURL(filePath) {
    const options = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000,
    };
    const [url] = await storage.bucket(bucketName).file(filePath).getSignedUrl(options);
    console.log('Generated');
    return url;
}

async function deleteFile(filePath) {
    await storage.bucket(bucketName).file(filePath).delete();
    console.info('Deleted File');
}

module.exports = {
    deleteFile,
    generateURL,
    uploadFile,
}