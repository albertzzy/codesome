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




/* 
    将字符串Z型遍历
    codemind: 主要就是取余的计算
*/
var convert = function(s, numRows) {
    let verticalFlag = true
    let  i=0, len = s.length;
    let matrix = [];
    let temp = [];
    let step = numRows-1;
    while(i < len){
        // codemind: 主要就是取余的计算
        verticalFlag = i % ((numRows-1) * 2) <= numRows-1 || numRows === 1
          
        if(verticalFlag){
           step = numRows-1;

            if(temp.length <=  numRows){
                temp.push(s[i])
                i++;
            }
            if(temp.length === numRows || i === len){
                matrix.push([...temp])
                temp = []
            }
        }else{
            temp = new Array(numRows).fill('#')
            temp[step-1] = s[i];
            matrix.push([...temp])
            temp = []
            i++
            step--
        }
    }

    // print matrix
    let k = 0;
    let result = ''
    while(k < numRows){
      for(let j=0;j<matrix.length;j++){
        let arr = matrix[j]
        if(typeof arr[k]!== 'undefined' && arr[k] !== '#'){
          result += arr[k]  
        }
      }
      k++
    }
   
    return result;
};



/* 
    将二叉树以前序遍历顺序拉成链表
    codemind: 用last变量记录前一个遍历节点
    index: 114
*/
// 解法一： 从下到上
var flatten = function(root) {
    let last = null
    function doFlatten(root){
      if(!root){
        return;
      }
      
      doFlatten(root.right)
      doFlatten(root.left)
      root.right = last;
      root.left = null;
      last = root
    }
    doFlatten(root)
 };

// 解法二： 从上到下
function flatten(root){
    while (root != null) { 
        if (root.left == null) {
            root = root.right;
        } else {
            // 找左子树最右边的节点
            let pre = root.left;
            while (pre.right != null) {
                pre = pre.right;
            } 
            //将原来的右子树接到左子树的最右边节点
            pre.right = root.right;
            // 将左子树插入到右子树的地方
            root.right = root.left;
            root.left = null;
            // 考虑下一个节点
            root = root.right;
        }
    }
}


// 解法3： 迭代后序遍历 - 解法1的迭代版本，同样也是从下到上
function flatten(root) { 
    let toVisit = [];
    let cur = root;
    let pre = null;

    while (cur || toVisit.length) {
        while (cur) {
            toVisit.push(cur); // 添加根节点
            cur = cur.right; // 递归添加右节点
        }
        cur = toVisit[toVisit.length-1] // 已经访问到最右的节点了
        // 在不存在左节点或者右节点已经访问过的情况下，访问根节点
        // ！！！keycode: cur.left == pre 
        if (!cur.left || cur.left == pre) {
            toVisit.pop(); 
            cur.right = pre;
            cur.left = null;
            pre = cur;
            cur = null;
        } else {
            cur = cur.left; // 左节点还没有访问过就先访问左节点
        }
    }       
}


 
