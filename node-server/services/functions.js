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