module.exports = () => (req, res, next) => {
    res.success = function (data) {
        res.status(200).send(data)
    }
    res.error = function (error) {
        console.log('==method err==', error)
        res.status(500).send(error.message)
    }
    next();
}