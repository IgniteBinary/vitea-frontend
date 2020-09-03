export const setCookie = (c_name, value, exdays) => {
  console.log(c_name);
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  const  c_value =
    escape(value) + (exdays == null ? '' : '; expires=' + exdate.toUTCString());
  document.cookie = c_name + '=' + c_value;
}

export const getCookie = (c_name) => {
  var c_value = document.cookie;
  var c_start = c_value.indexOf(' ' + c_name + '=');
  if (c_start == -1) {
    c_start = c_value.indexOf(c_name + '=');
  }
  if (c_start == -1) {
    c_value = null;
  } else {
    c_start = c_value.indexOf('=', c_start) + 1;
    var c_end = c_value.indexOf(';', c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start, c_end));
  }
  return c_value;
}
export const  delCookie = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
