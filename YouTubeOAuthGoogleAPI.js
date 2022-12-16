const express = require('express');
const app = express();
const {google} = require('googleapis');


const oauth2Client = new google.auth.OAuth2(
    '774023301237-gupr1jl4tog90t2trbc85ksfb5cnee1q.apps.googleusercontent.com',
    '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',
    'http://localhost:4000/oauthAuthorisation'
  );
  // Access scopes for read-only Drive activity.
const scopes = [
    'https://www.googleapis.com/auth/youtube.readonly'
  ];
/* 
Scopes
https://www.googleapis.com/auth/youtube	Manage your YouTube account
https://www.googleapis.com/auth/youtube.channel-memberships.creator	See a list of your current active channel members, their current level, and when they became a member
https://www.googleapis.com/auth/youtube.force-ssl	See, edit, and permanently delete your YouTube videos, ratings, comments and captions
https://www.googleapis.com/auth/youtube.readonly	View your YouTube account
https://www.googleapis.com/auth/youtube.upload	Manage your YouTube videos
https://www.googleapis.com/auth/youtubepartner	View and manage your assets and associated content on YouTube
https://www.googleapis.com/auth/youtubepartner-channel-audit	View private information of your YouTube channel relevant during the audit process with a YouTube partner
*/
const PORT = 4000 || process.env.PORT;

app.get('/',(req,res)=>{
    try {
          const authorizationUrl = oauth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: scopes
        });
        res.send({"redirect URL":authorizationUrl});
    } catch (error) {
        res.send("Something Went wrong",error)
    }

})
app.get('/oauthAuthorisation',async (req,res)=> {
  let url = `https://oauth2.googleapis.com/token?code=${req.query.code}&client_id=774023301237-gupr1jl4tog90t2trbc85ksfb5cnee1q.apps.googleusercontent.com&client_secret=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&redirect_uri=http://localhost:4000/oauthAuthorisation&grant_type=authorization_code`;
  res.send(url) 
    

})
app.listen(PORT,()=> console.log(`App is listening on port http://localhost:${PORT}`))