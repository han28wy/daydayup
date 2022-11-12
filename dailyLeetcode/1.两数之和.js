/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // 保存target - nums[i]的值，然后判断哈希表中是否有这个值即可，有的话，直接返回就可以。
    var map = new Map()
    for(let i=0;i<nums.length;i++){
        const item = nums[i]
        if(map.has(item)){
            return [map.get(item), i]
        }
        map.set(target-item, i)
    }

};
// @lc code=end

