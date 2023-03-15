export function removeHTMLTag(htmlStr) {
  if(htmlStr == ''){
    return ''
  } else {
    let html = htmlStr
      .replace(/<img.*?>/g, "[图片]")
      .replaceAll(/<[^>]+>/g, "")
      .replace(/ /gi, "");
    return html;

  }
}