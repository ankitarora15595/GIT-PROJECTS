const { shortenUrl, getLongUrl } = require('./service');

exports.shorten = (req,res) =>{
    const {longUrl} = req.body;

    if(!longUrl || typeof longUrl !== 'string')
    {
        return res.status(400).json({error: "Invalid URL"});
    }

    const shortCode = shortenUrl(longUrl);
    res.json({ shortCode});
};


exports.getUrl = (req,res) => {
    const {code} = req.params;
    const longUrl = getLongUrl(code);
    
    if(!longUrl)
    {

        return res.status(400).json({error: "Invalid ShortenURL"});
    }
    res.status(200).json({longUrl}); //res.redirect -> temporary redirect(302) default - 301 for permanent redirect
};
