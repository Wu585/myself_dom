window.dom = {
    create(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim() //去除字符串两边的空格
        return container.content.firstChild
    },
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, node) {
        parent.appendChild(node)
    },
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },
    remove(node) {
        node.parent.removeChild(node)
        return node
    },
    empty(node) {
        const { childNodes } = node //新语法 const childNodes = node.childNodes
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
    attr(node, name, value) {   //重载（根据函数参数个数写不同的代码）
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) { //适配，兼容 谷歌，ie等
        if ('innerText' in node) { //这里'innerText'是字符串，因为相当于对象的属性名
            node.innerText = string
        } else {
            node.textContent = string
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            //dom.style(div,'color',''red)
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                //dom.style(div,'color')
                return node.style[name]
            } else if (name instanceof Object) {//name是对象实例
                //dom.style(div,{...})
                for (let key in object) {//key的遍历
                    node.style[key] = object[key]
                }
            }
        }

    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.has(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventList(eventName, fn)
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
}