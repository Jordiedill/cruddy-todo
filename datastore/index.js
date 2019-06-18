const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};


// Public API - Fix these CRUD functions ///////////////////////////////////////
exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) =>{
    if (err) {
      console.log('I hate callbacks');
    } else {
      fs.writeFile((`${exports.dataDir}/${id}.txt`), text, (err) => {
        if (err) {
          throw ('error writing counter');
        } else {
          callback(null, {id, text});    
        }
      });
    }
  });
};

exports.readAll = (callback) => {
  fs.readdir(`${exports.dataDir}`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let arr = [];
      for (var i = 0; i < data.length; i++) {
        let a = data[i].split('.');
        arr.push({id : a[0], text : a[0]});
      }
      callback(null, arr);
    }
  });
};

exports.readOne = (id, callback) => {
  fs.readFile(`${exports.dataDir}/${id}.txt`, (err, data) => {
    if(data === null){
      console.log(`No item with id: ${id}`);
    }else if(err){
      console.log(err);
    }else{
      done(callback(null, data));
    }
  });
};

exports.update = (id, text, callback) => {
  if (path.join(__dirname, 'data', id) === id ){
  }
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');
exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
