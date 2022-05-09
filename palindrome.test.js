const isPalindrome = require('./palindrome')
 
test('it detects palindromes', () => {
  expect(isPalindrome('palindrome')).toBe(false)
  expect(isPalindrome('')).toBe(true)
  expect(isPalindrome('a')).toBe(true)
  expect(isPalindrome('gg')).toBe(true)
  expect(isPalindrome('pop')).toBe(true)
  expect(isPalindrome('1212')).toBe(false)
})
