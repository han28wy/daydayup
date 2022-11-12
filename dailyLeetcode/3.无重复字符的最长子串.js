/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let res = 0
    for(let i=0;i<s.length-1;i++){
        let currRes = 0
        let currMap = new Map()
        currMap.set(s[i], i)
        for(let j=i+1;j<s.length;j++){
            if(currMap.has(s[j])){
                // 结束当前循环
                currRes = j-i+1
                break;
            }else{
                currMap.set(s[j], j)
            }
        }
        res = Math.max(res,currRes)
    }
    return res
};
// @lc code=end

