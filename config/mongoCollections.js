const dbConnection = require('./mongoConnection');

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.connectToDb();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
module.exports = {
    users: getCollectionFn('users'),
    diseases: getCollectionFn('diseases'),
    posts: getCollectionFn('posts'),
    comments: getCollectionFn('comments')
  
};