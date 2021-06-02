import * as Utils from '../../src/utils';

const objWithEmptyKeys = {
  email: '',
  firebaseUid: '',
  iqId: '',
  roles: '',
  token: '',
  username: '',
};

const objwithNoEmptyKeys = {
  email: 'notEmpty',
  firebaseUid: 'notEmpty',
  iqId: '',
  roles: ['d'],
  token: 'notEmpty',
  username: '',
};

test('findEmptyKeysInObject - find empty keys', () => {
  const response = Utils.findEmptyKeysInObject(objWithEmptyKeys);
  expect(response.length).toBe(3);
  expect(response).toBe(['iqId', 'username']);
});

test('findEmptyKeysInObject - find no empty keys', () => {
  const response = Utils.findEmptyKeysInObject(objwithNoEmptyKeys);
  expect(response.length).toBe(0);
});
