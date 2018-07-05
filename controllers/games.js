const handleAdd = (req, res, db) => {
    let a = JSON.stringify(req.body)
    let b = JSON.parse(a)
    let nextGame
    
    // console.log('====================================');
    // console.log("a");
    // console.log(a);
    // console.log("b");
    // console.log(b);
    // console.log('====================================');

    db.max('game').from('games').withSchema('DEV01')
    .then((value) => {
        if (value[0].max != null){
            nextGame = value[0].max + 1
        }
        else {
            nextGame = 1;
        }

        b.map((item, i) => {
            db.insert({
                game: nextGame,
                piece: item.piece,
                srce: item.srce,
                dest: item.dest
            })
                .into('games').withSchema('DEV01')
                .then(db.commit)
                .catch(db.rollback)
        })
        res.json("Game Stored")
    })
}

const handleGame = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('games').withSchema('DEV01').where({ game: id })
        .then(game => {
            if (game.length) {
                res.json(game)
            } else {
                res.status(400).json("Not found")
            }
        })
        .catch(err => res.status(400).json('Error getting game'))
}

const handleGames = (req, res, db) => {
    db.select('*').from('games').withSchema('DEV01')
        .then(games => {
            if (games.length) {
                res.json(games)
            } else {
                res.status(400).json("Not found")
            }
        })
        .catch(err => res.status(400).json('Error getting games'))
}

module.exports = {
    handleAdd: handleAdd,
    handleGame: handleGame,
    handleGames: handleGames
};