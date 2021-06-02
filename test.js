const objWithEmptyKeys = {
  email: '',
  firebaseUid: '',
  iqId: [''],
  roles: '',
  token: '',
  username: '',
};

const objwithNoEmptyKeys = {
  email: 'notEmpty',
  firebaseUid: 'notEmpty',
  iqId: [''],
  roles: 'notEmpty',
  token: 'notEmpty',
  username: '',
};

const findEmptyKeysInObject = object => {
  console.log('findEmptyKeysInObject.keys(object) 66', Object.keys(object));
  let emptyKeys = [];
  Object.keys(object).map(key => {
    console.log('key 11', key);
    console.log('value 22', object[key]);
    console.log('object[key].length === 0 334', object[key].length === 0);
    if (object[key].length === 0) emptyKeys.push(key);
  });
  return emptyKeys;
};

const test1 = findEmptyKeysInObject(objWithEmptyKeys);
const test2 = findEmptyKeysInObject(objwithNoEmptyKeys);

console.log('test1', test1);
console.log('test2', test2);
