import AWS from 'aws-sdk'

const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME
const REGION = process.env.REACT_APP_REGION

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
})

const s3Client = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION
})

export const uploadFile = async (file) => {
    console.log(file);
    if (file === null) {
        return;
    }

    const params = {
        Body: file,
        Key: file.name,
        ContentType: file.type
    }

    try {
        const s3Response = await s3Client.putObject(params).promise()
        return s3Response
    } catch (e) {
        console.log(e)
        return e
    }
}

export const generateDownloadLink = async (key) => {
    const url = s3Client.getSignedUrl('getObject', {
        Key: key,
        Expires: 3600
    })
    return url;
}

export const tagFile = async (key, checkedOut) => {
    const params = {
        Key: key,
        Tagging: {
            TagSet: [
                {
                    Key: 'checkedOut',
                    Value: checkedOut
                }
            ]
        }
    }

    try {
        const s3Response = await s3Client.putObjectTagging(params).promise()
        return s3Response
    } catch (e) {
        console.log(e)
        return e
    }
}

export const getTags = async (key) => {
    const params = {
        Key: key
    }

    try {
        const s3Response = await s3Client.getObjectTagging(params).promise()
        return s3Response.TagSet
    } catch (e) {
        console.log(e)
        return e
    }
}