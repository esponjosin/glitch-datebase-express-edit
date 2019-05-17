module.exports = {

  JSON: function(str) {
  let text = str;
  let vala = text;
    
  if(text[0] === '{') {
  try {
  vala = JSON.parse(this.JSONize(str))
  } catch(e) {
  throw new Error("Error en el JSON enviado: "+e)
  }
  }
    
  return vala
  },
  
  JSONize: function(str) {
  return str
    .replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":'})    
    .replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"'})         
}
  
}