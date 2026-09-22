import { DEFAULT_LOCALE, LOCALE_COOKIE, localePath } from "@/i18n/config";

export const ROOT_REDIRECT_SCRIPT = `(function(){
  function readCookie(name){
    var parts=document.cookie.split(";");
    for(var i=0;i<parts.length;i++){
      var part=parts[i].trim();
      if(part.indexOf(name+"=")===0){
        return decodeURIComponent(part.slice(name.length+1));
      }
    }
    return "";
  }
  function fromCookie(){
    var value=readCookie(${JSON.stringify(LOCALE_COOKIE)});
    if(value==="zh-CN"||value==="zh-cn") return "/zh-cn";
    if(value==="en") return "/en";
    return "";
  }
  function fromLanguages(){
    var list=navigator.languages&&navigator.languages.length
      ? navigator.languages
      : [navigator.language];
    for(var i=0;i<list.length;i++){
      var range=String(list[i]||"").toLowerCase();
      if(range==="en"||range.indexOf("en-")===0) return "/en";
      if(range==="zh"||range.indexOf("zh-")===0) return "/zh-cn";
    }
    return "";
  }
  var next=fromCookie()||fromLanguages()||${JSON.stringify(localePath(DEFAULT_LOCALE))};
  location.replace(next);
})();`;
