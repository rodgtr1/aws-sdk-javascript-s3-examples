import { useState } from 'react'
import { uploadFile, generateDownloadLink, tagFile, getTags } from './awsService'
import './App.css'

function App() {
    const [file, setFile] = useState(null)
    const [downloadLink, setDownloadLink] = useState('')
    const [checkedOut, setCheckedOut] = useState(false)

    const handleFileInput = async(e) => {
        setFile(e.target.files[0])
    }

    const uploadFileToS3 = async(e) => {
        await uploadFile(file)
    }

    const downloadFileFromS3 = async(e) => {
        const downloadURL = await generateDownloadLink('aws-s3-logo.png')
        setDownloadLink(downloadURL);
    }

    const handleFileCheckedOut = async(e) => {
        await tagFile('aws-s3-logo.png', "true")
    }

    const handleFileCheckedIn = async(e) => {
        await tagFile('aws-s3-logo.png', "false")
    }

    const handleGetTags = async(e) => {
        const tags = await getTags('aws-s3-logo.png')

        if (tags.statusCode === 404) {
            console.log('Tags do not exist')
        }

        const checkedOut = tags.find(o => o.Key === 'checkedOut').Value
        setCheckedOut(checkedOut)
    }

    return (
        <div className='App' style={{ marginTop: '50px'}}>
            <label htmlFor="myFile" style={{ marginRight: '10px' }}><strong>1. Upload File to S3</strong></label>
            <input type='file' id="myFile" name='myFile' onChange={handleFileInput} />
            <input type='submit' value='Upload' onClick={uploadFileToS3} />

            <br /><br />

            <label style={{ marginRight: '10px' }}><strong>2. Download File From S3</strong></label>
            <input type='submit' value='Generate URL For Download' onClick={downloadFileFromS3} />
            <div>Download URL: <a href={downloadLink}>{downloadLink}</a></div>

            <br /><br />

            <label style={{ marginRight: '10px' }}><strong>3. Tag File</strong></label>
            <input type='submit' value='Tag File Checked Out' onClick={handleFileCheckedOut} />
            <input type='submit' value='Tag File Checked In' onClick={handleFileCheckedIn} />

            <br /><br />

            <label style={{ marginRight: '10px' }}><strong>4. Get Tags</strong></label>
            <input type='submit' value='Is File Checked Out:' onClick={handleGetTags} />
            <div>Checked Out: {checkedOut}</div>
        </div>
    )
}

export default App
