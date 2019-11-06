// set account links
if(localStorage.name)
{
  let el=$('#loginlink');
  el.css({
    display: 'block',
    padding: '.25rem 1.5rem'
  });
  el.removeClass('dropdown-item');
  el.removeAttr('href');
  el.text(localStorage.name);
  el=$('#registerlink');
  el.attr('href','logout');
  el.text('Logout');
  el.on('click',()=>localStorage.removeItem('name'));
}