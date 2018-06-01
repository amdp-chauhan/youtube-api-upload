// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * Usage: node upload.js PATH_TO_VIDEO_FILE
 */

const {
    google
} = require('googleapis');
const streamifier = require('streamifier');
const sampleClient = require('./sampleclient');
const fs = require('fs');

// initialize the Youtube API library
const youtube = google.youtube({
    version: 'v3',
    auth: sampleClient.oAuth2Client
});


// very basic example of uploading a video to youtube
async function runSample(file, callback) {
    return new Promise(async (resolve, reject) => {
        try {
            const fileSize = file.size; //fs.statSync(file).size;
            console.log(":: file inside run sample - ",file);
            const res = await youtube.videos.insert({
                part: 'id,snippet,status',
                notifySubscribers: false,
                requestBody: {
                    snippet: {
                        title: 'Node.js YouTube Upload Test',
                        description: 'Testing YouTube upload via Google APIs Node.js Client'
                    },
                    status: {
                        privacyStatus: 'public'
                    }
                },
                media: {
                    body: streamifier.createReadStream(file.data)
                }
            }, {
                // Use the `onUploadProgress` event from Axios to track the
                // number of bytes uploaded to this point.
                onUploadProgress: evt => {
                    console.log(":: evt - - > ",evt);
                    const progress = (evt.bytesRead / fileSize) * 100;
                    process.stdout.clearLine();
                    process.stdout.cursorTo(0);
                    process.stdout.write(`${Math.round(progress)}% complete`);
                }
            });
            console.log(":: youtube service res.data - > ", res);
            console.log('\n\n');
            resolve(res.data);
        } catch (err) {
            console.log(":: Run Sample Error - ",err);
            reject (err)
        }
    });
    
}

const scopes = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube'
];

// if (module === require.main) {
//     const file = process.argv[2];
//     sampleClient.authenticate(scopes)
//         .then(c => runSample(file))
//         .catch(console.error);
// }

async function upload(file) {
    return new Promise(async (resolve, reject) => {
        try {
            let resp = await sampleClient.authenticate(scopes);
            console.log(":: sampleClient.response - ",resp);
            let uploadResp = await runSample(file);
            resolve(uploadResp);
        } catch(err) {
            console.log(":: error in upload function - ",err);
            reject(err);
        }
    })
}

module.exports = {
    runSample,
    upload,
    client: sampleClient.oAuth2Client
};