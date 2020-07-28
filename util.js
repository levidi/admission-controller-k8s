const pipe = (...funcs) => input => funcs.reduce((promises, func) => promises.then(func), Promise.resolve(input))

module.exports = {
    pipe
}