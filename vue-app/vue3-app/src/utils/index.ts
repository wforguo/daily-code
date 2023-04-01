/**
 * min到max的随机数
 * @param min
 * @param max
 */

export const random = function (min: number = 0, max: number = 10) {
    return Math.round(Math.random() * (max - min) + min)
}

/**
 * 树形结构转扁平数组
 * @param tree
 */
export const treeTransferList: any = function (tree: any[]) {
    let res: any = []
    for (const item of tree) {
        if (item?.children) {
            // 先保存当前父节点
            const clone = { ...item }
            // 删除children
            delete clone.children
            res.push(clone)
            // 再获取子节点
            res = [...res, ...treeTransferList(item.children)]
        } else {
            res.push(item)
        }
    }
    return res
}
/**
 * 文档库类型
 */
export interface Book {
    type: number | string
    title: number | string
    uuid: number | string
    url?: number | string
    doc_id?: number | string
    level?: number | string
    id?: number | string
    open_window?: number | string
    visible?: number | string
    parent_uuid?: string
    child_uuid?: string
    prev_uuid?: string
    sibling_uuid?: number | string
    text?: number | string
    items?: Book[]
    collapsed?: boolean
    link?: string
}

/**
 * @desc 列表转树结构
 * @param list
 * @param parent_uuid
 * @param link
 **/

// 文档库路径
const docPath = '/docs'
export const listTransferTree = (list: Book[], parentUuid: string | number, link?: string) => {
    const res: Book[] = []

    for (const item of list) {
        if (item.parent_uuid === parentUuid) {
            item.link = `${docPath}${link || ''}/${item.title}`
            const children = listTransferTree(list, item.uuid, `${link || ''}/${item.title}`)
            if (children.length) {
                item.items = children
                item.collapsed = false
            } else {
                item.link = `${docPath}${link || ''}/${item.title}`
                if (!parentUuid) {
                    item.items = []
                }
            }
            delete item.level
            delete item.doc_id
            delete item.open_window
            delete item.visible
            delete item.prev_uuid
            delete item.child_uuid
            delete item.sibling_uuid
            item.text = item.title
            res.push(item)
        }
    }
    return res
}
