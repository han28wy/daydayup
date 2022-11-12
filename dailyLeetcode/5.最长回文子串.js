/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
// 动态规划
var longestPalindrome = function (s) {


};
// @lc code=end

// 中心扩散
var longestPalindrome2 = function (s) {
    if(s.length < 1) return s
    for(let i=0;i<s.length;i++){
        let len1 = fun(s,i,i)
        let len2 = fun(s,i,i+1)
        let currRes = Math.max(len1,len2)
        if(currRes > end-start){
            start = i-(len-1)/2
            end = i+len/2
        }
    }
    return s.substring(start, end)
};

function fun(s, left, right){
    let L = left;
    let R = right;
    while(L>=0 && R<=s.length && s[L] === s[R]){
        L--;
        R++;
    }
    return R-L-1
}

// 暴力解法
var longestPalindrome2 = function (s) {
    let length = s.length
    boolean[][] P = new boolean[length][length]
    for (let len = 1; len <= length; len++) { //遍历所有的长度
        for (let start = 0; start < length; start++) {
            let end = start + len - 1
            if (end >= length) {
                break
            }
            P[start][end] = (len == 1 || len == 2 || P[start + 1][end - 1]) && s.charAt(start) == s.charAt(end); //长度为 1 和 2 的单独判断下
            if (P[start][end] && len > maxLen) {
                maxPal = s.substring(start, end + 1);
            }
        }
    }
    return maxPal;
};