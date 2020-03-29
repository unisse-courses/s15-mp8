router.delete('/:drinkId', (req, res, next) => {
    Drink.remove({_id: req.params.drinkId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Drink deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})