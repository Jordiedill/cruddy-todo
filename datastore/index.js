const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};


// Public API - Fix these CRUD functions ///////////////////////////////////////
exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) =>{
    if(err){
    console.log('I hate callbacks');
    }else{
      fs.writeFile((`${exports.dataDir}/${id}`), text, (err) => {
      if (err) {
        throw ('error writing counter');
      } else {
        callback(null, {id, text});    
      }
    });
    }
  });
  //items[id] = text;
  //callback(null, { id, text });
};

exports.readAll = (callback) => {
  fs.readdir(`${exports.dataDir}`, (err, data) => {
//console.log(typeof(data));
    if(err){
      console.log(err);
    } else{
        let arr = [];
        for(var i = 0; i < data.length; i++){
     //console.log(data[i])
          arr.push({id : data[i], text : data[i]});
        }
      //console.log('our array', arr);
      callback(null, arr);
      }
  })
};

exports.readOne = (id, callback) => {
  fs.readFile(path.join(__dirname, 'data', id), (err, data) => {
    if(err){
      console.log('readOne error');
    }else if(!data){
      callback(new Error(`No item with id: ${id}`));
    }else{
      callback(null, data);
    }
  })
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

exports.update = (id, text, callback) => {
console.log(path.join(__dirname, 'data', id), id, path.join(__dirname, 'data', id) === id);
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
