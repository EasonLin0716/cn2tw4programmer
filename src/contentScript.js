const zh_cn = require('./terms/zh_CN');
const zh_tw = require('./terms/zh_TW');
const cn2tw = require('./utils/cn2tw');

function replaceTextNodes(node, replaceFn) {
  if (node.nodeType === Node.TEXT_NODE) {
    const res = replaceFn(node.textContent);
    node.textContent = res;
  } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
    for (let child of node.childNodes) {
      replaceTextNodes(child, replaceFn);
    }
  }
}
replaceTextNodes(document.body, text => cn2tw({ body: text, zh_cn, zh_tw }));
