exports.testMessage = (req, res) => {
    res.render('test', { testMessage: "Тест за backend развој на софтвер " });
};