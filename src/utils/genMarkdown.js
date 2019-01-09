/**
 * The code for this file is copied from:
 * https://github.com/vuese/vuese/blob/master/lib/index.js
 * https://github.com/vuese/vuese/blob/master/lib/genMarkdownTemp.js
 */

const nameRE = /\[name\]/g
const htmlCommentRE = /<!--\s*@vuese:([a-zA-Z_][\w\-\.]*):(\w+):start\s*-->[^]*<!--\s*@vuese:\1:\2:end\s*-->/

export default function(parserRes, renderRes) {
  const mdTemplate = genTemplate(parserRes)

  if (!mdTemplate) return

  let str = ''
  let compName = parserRes.name || 'Anonymous'

  str = mdTemplate.replace(nameRE, compName)

  let index = 0,
    stream = str
  while (stream) {
    const res = stream.match(htmlCommentRE)
    if (res) {
      const matchText = res[0]
      const type = res[2]
      const i = stream.indexOf(matchText)
      const currentHtmlCommentRE = new RegExp(
        `<!--\\s*@vuese:(${compName}):(${type}):start\\s*-->[^]*<!--\\s*@vuese:\\1:\\2:end\\s*-->`
      )
      str = str.replace(currentHtmlCommentRE, (s, c1, c2) => {
        if (renderRes[type]) {
          let code = `<!-- @vuese:${c1}:${c2}:start -->\n`
          code += renderRes[type]
          code += `\n<!-- @vuese:${c1}:${c2}:end -->\n`
          return code
        }
        return s
      })
      index = i + matchText.length
    } else {
      index = stream.length
    }
    stream = stream.slice(index)
  }

  return str
}

function genTemplate(parserRes) {
  let templateStr = '# [name]\n\n'
  let original = templateStr

  templateStr += parserRes.props ? genBaseTemplate('props') : ''
  templateStr += parserRes.events ? genBaseTemplate('events') : ''
  templateStr += parserRes.slots ? genBaseTemplate('slots') : ''
  templateStr += parserRes.methods ? genBaseTemplate('methods') : ''

  return original === templateStr ? '' : templateStr
}

function genBaseTemplate(label) {
  let str = `## ${upper(label)}\n\n`
  str += `<!-- @vuese:[name]:${label}:start -->\n`
  str += `<!-- @vuese:[name]:${label}:end -->\n\n`
  return str
}

function upper(word) {
  return word[0].toUpperCase() + word.slice(1)
}
