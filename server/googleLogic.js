const { google } = require('googleapis');
const sheets = google.sheets('v4');

const OAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
);

function getAuth(accessToken, refreshToken) {
    OAuth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken
    });

    return OAuth2Client;
};

async function listSheets(auth) {
    const drive = google.drive({ version: "v3", auth });
    const res = await drive.files.list({
        pageSize: 50,
        q: "mimeType='application/vnd.google-apps.spreadsheet'",
        fields: 'nextPageToken, files(id, name)'
    });
    return res.data.files;
}

async function getSheetsMetadata(auth, spreadsheetId) {
    const request = {
        spreadsheetId: spreadsheetId,
        includeGridData: true,
        auth: auth
    };

    const res = (await sheets.spreadsheets.get(request)).data;
    return res.sheets;
}

async function getSheetData(auth, spreadsheetId, sheetName, row, cols) {
    var range = sheetName + '!A'+row+":";
    const col = String.fromCharCode(64 + parseInt(cols));
    range = range + col;
    const request = {
        spreadsheetId: spreadsheetId,
        range: range,
        auth: auth
    };
    const res = (await sheets.spreadsheets.values.get((request))).data;
    return res.values;
}

module.exports = { getAuth, listSheets, getSheetsMetadata, getSheetData };