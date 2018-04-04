var tree = require('./tree.js')
const list = [
    {id: 1, name: '超级管理', parent_id: 0},
    {id: 22, name: '超级管理1', parent_id: 0},
    {id: 4, name: '日志管理', parent_id: 1},
    {id: 5, name: '操作用户', parent_id: 2},
    {id: 6, name: '查看用户', parent_id: 2},
    {id: 7, name: '用户新增', parent_id: 5},
    {id: 8, name: '用户删除', parent_id: 5},
    {id: 9, name: '用户修改', parent_id: 5},
    {id: 10, name: '操控部门', parent_id: 3},
    {id: 11, name: '查看部门', parent_id: 3},
    {id: 12, name: '部门新增', parent_id: 10},
    {id: 13, name: '部门删除', parent_id: 10},
    {id: 14, name: '部门修改', parent_id: 10},
    {id: 15, name: '日志查看', parent_id: 4},
    {id: 16, name: '日志导出', parent_id: 4},
    {id: 2, name: '用户管理', parent_id: 1},
    {id: 3, name: '部门管理', parent_id: 1}
];

exports.getTree = function(list, parentId) {
    var re = new Array();
    for (var i = 0; i < list.length; i++) {
        var pid = list[i].parent_id;
        if (pid == parentId) {
            var child = exports.getTree(list, list[i].id);
            if (child.length > 0) {
                list[i].children = child;
            }
            re.push(list[i]);
        }
    }
    return re;
}
console.log(JSON.stringify(tree.getTree(list,0)))