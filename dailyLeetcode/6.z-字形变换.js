/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] Z 字形变换
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    let r = numRows
    let n = s.length
    if (r === 1 || r >= n) {
        return s;
    }
    const t = r * 2 - 2
    const c = Math.floor((n + t - 1) / t) * (r - 1)
    // 建立空白矩阵
    const mat = new Array(r).fill(0).map(() =>
        new Array(c).fill(0)
    )
    // 填充矩阵
    for (let i = 0, x = 0, y = 0; i < n; ++i) {
        mat[x][y] = s[i];
        if (i % t < r - 1) {
            ++x; // 向下移动
        } else {
            --x;
            ++y; // 向右上移动
        }
    }
    // 遍历矩阵，组成res
    const ans = [];
    for (const row of mat) {
        for (const ch of row) {
            if (ch !== 0) {
                ans.push(ch);
            }
        }
    }
    return ans.join('')
};
// @lc code=end


// 压缩构建矩阵的空间
function convert2(s, numRows) {
    let n = s.length
    let r = numRows
    if (r === 1 || r >= n) {
        return s
    }

    const mat = new Array(r).fill(0)
    for (let i = 0; i < r; ++i) {
        mat[i] = []
    }
    for (let i = 0, x = 0, t = r * 2 - 2; i < n; ++i) {
        mat[x].push(s[i])
        if(i%t<r-1){
            ++x;
        }else{
            --x;
        }
    }
     // 遍历矩阵，组成res
     const ans = [];
     for (const row of mat) {
         for (const ch of row) {
             if (ch !== 0) {
                 ans.push(ch);
             }
         }
     }
     return ans.join('')
}