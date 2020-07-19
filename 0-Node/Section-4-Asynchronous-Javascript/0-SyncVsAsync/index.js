console.log('Before')
setTimeout(() => {
     console.log("I'll log after both console logs outside of me because I'm async and don't block others")
}, 2000);
console.log('After')