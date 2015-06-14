function sort (nums) {
  var len = nums.length;
  
  if (len < 2) {
    return nums;
  }

  var left = [];
  var right = [];

  var pivot = Math.floor(Math.random() * len);
  var compare = nums[pivot];

  for (var i = 0; i < len; i++) {
    if (i == pivot) {
      continue;
    }

    var num = nums[i];

    if (num <= compare) {
      left.push(num);
    } else {
      right.push(num);
    }
  }

  return sort(left).concat([compare], sort(right));
};

module.exports = sort;
