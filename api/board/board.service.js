const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy) {
    
    // console.log('getting');
    // const criteria=_buildCriteria(filterBy);
    try {
        const collection = await dbService.getCollection('board');
        const boards = await collection.find().toArray();
        return boards;
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err;
    }
}

// function query(filterBy) {
//     var boardsForDisplay = JSON.parse(JSON.stringify(gBoards));
//     if (!filterBy) {
//         return Promise.resolve(boardsForDisplay);
//     }
//     if (filterBy.name) {
//         boardsForDisplay = boardsForDisplay.filter(t => t.name.includes(filterBy.name));
//     }
//     if (filterBy.price) {
//         boardsForDisplay = boardsForDisplay.filter(t => +t.price <= +filterBy.price);
//     }
//     if (filterBy.onStock) {
//         boardsForDisplay = boardsForDisplay.filter(t => t.inStock === true);
//     }
//     if (filterBy.type) {
//         boardsForDisplay = boardsForDisplay.filter(t => t.type === filterBy.type);
//     }
//     if (filterBy.sortBy) {
//         if (filterBy.sortBy === 'name') {
//             boardsForDisplay = boardsForDisplay.sort((t1, t2) => {
//                 return t1.name - t2.name;
//             });
//         } else if (filterBy.sortBy === 'price') {
//             boardsForDisplay = boardsForDisplay.sort((t1, t2) => {
//                 return t1.price - t2.price;
//             });
//         }
//     }
//     return Promise.resolve(boardsForDisplay);
// }

async function getById(boardId) {
    try {
        // console.log('boardId:', boardId)
        const collection = await dbService.getCollection('board');
        console.log('collection:', collection)
        const board = await collection.findOne({ '_id': ObjectId(boardId) });
        // console.log('board:', board)
        return board;
    } catch (err) {
        logger.error(`while finding user ${boardId}`, err);
        throw err;
    }
}


async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board');
        await collection.deleteOne({ '_id': ObjectId(boardId) });
    } catch (err) {
        logger.error('cannot remove board', err);
        throw err;
    }
}

async function update(board) {
    try {
        const collection = await dbService.getCollection('board');
        board._id = ObjectId(board._id)
        await collection.updateOne({ '_id': ObjectId(board._id) }, { $set: board });
        return board;
    } catch (err) {
        logger.error(`cannot remove board ${board._id}`, err);
        throw err;
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection('board');
        await collection.insertOne(board);
        return board;
    } catch (err) {
        logger.error(`cannot remove board ${board._id}`, err);
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}

// function getById(boardId) {
//     const board = gBoards.find(board => board._id === boardId);
//     return Promise.resolve(board);
// }

// function remove(boardId) {
    //     const idx = gBoards.findIndex(t => t._id === boardId);
    //     gBoards.splice(idx, 1);
    //     return Promise.resolve();
    // }

    ////will bot work need to split to update and add individual functions
    // function save(board) {
        //     if (board._id) {
            //         const idx = gBoards.findIndex(t => t._id === board._id);
            //         if (idx < 0) return Promise.reject('No such board');
            //         gBoards.splice(idx, 1, board);
//     } else {
//         board._id = _makeId();
//         gBoards.push(board);
//     }
//     _saveBoardsToFile();
//     return Promise.resolve(board);
// }

// module.exports = {
//     query,
//     getById,
//     remove,
//     save
// }

// function _makeId(length = 5) {
//     var txt = ''
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return txt
// }

// function _saveBoardsToFile() {
//     return new Promise((resolve, reject) => {
//         const fs = require('fs')
//         fs.writeFile('data/board.json', JSON.stringify(gBoards, null, 2), (err) => {
//             if (err) reject(err);
//             else resolve()
//         })
//     })
// }