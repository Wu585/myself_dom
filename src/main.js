const div = dom.create('<div>newDiv</div>')
dom.after(test, div)
console.log(div)

const div3 = dom.create('<div id="parent">parentDiv</div>')
dom.wrap(test, div3)

dom.attr(test, 'title', 'I am wu')
const title = dom.attr(test, 'title')
console.log(`title: ${title}`)

dom.text(test, '这是新的文本')

dom.style(test, { border: '1px solid red', color: 'blue' })

dom.class.add(test, 'red')

dom.on(test, 'click', () => { console.log('点击了') })

const t = dom.find('#test')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))