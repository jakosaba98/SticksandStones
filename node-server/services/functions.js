const fs=require('fs')
// get key and cert for HTTP/2
module.exports.readKey = () => fs.readFileSync('./https/server.key').toString('utf8')
// module.exports.readKey = () => fs.readFileSync(path.join(__dirname, '..', 'https', 'server.key'))
module.exports.readCert = () => fs.readFileSync('./https/server.crt').toString('utf8')

module.exports.isUserLogged = (req,res,login=true)=>{
  if(!req.session.name)
  {
    // return login page if not logged in
    if(login)
    {
      res.redirect('/login.html');
      return false;
    }
    res.redirect('/');
    return false;
  }
  return true;
}
module.exports.isNotUserLogged = (req,res)=>{
  if(req.session.name)
  {
    // return home page if logged in
    res.redirect('/');
    return false;
  }
  return true;
}