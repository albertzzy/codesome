/* 
   生成可能的二叉树
   codemind:
    递归上部分的return 返回的是某个递归func的值
    递归下部分的return 返回的是某个递归分支完成后的值
    因为有双重递归，所以最底下的返回后，还是会回到一个顶部的递归func里
    直到全部递归完后，最底下的return 才返回最后的值
*/

function TreeNode(val){
    this.left = this.right = null;
    this.val = val;
}
  
function doGenTree(start, end){
    let treelist = [];
    if(start > end){
        treelist.push(null)
        return treelist;
    }

    if(start === end){
        let node = new TreeNode(start);
        treelist.push(node)
        return treelist
    }

    for(let i=start;i<=end;i++){
        let leftlist = doGenTree(start, i-1)
        let rightlist = doGenTree(i+1, end)
        
        for(let j=0;j<leftlist.length;j++){
            for(let k=0;k<rightlist.length;k++){
                let root = new TreeNode(i);
                root.left = leftlist[j]
                root.right = rightlist[k]
                treelist.push(root)
            }
        } 
    }
    return treelist;
}