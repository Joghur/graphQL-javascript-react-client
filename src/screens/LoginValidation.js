import React, { useEffect, useState } from 'react';
import { userState, initialUserStates } from '../Recoil';
import { useRecoilState } from 'recoil';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import {
  findEmptyKeysInObject,
  findMissingKeysInObject,
  isEmptyObject,
} from '../utils/validate';
import { useHistory, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { dateEpochToDateString } from '../utils/dates';

const ALL_USERS_FOR_LOGIN = gql`
  query allUsers {
    allUsers {
      users {
        id
        active
        name
        username
        address
        birthday
        email
        phone
        mobile
        work
        workemail
        workphone
        size
        firebaseemail
        firebaseuid
        roles {
          id
          role
        }
      }
    }
  }
`;

const UPDATE_USER_FIREBASE = gql`
  mutation updateUser(
    $id: Int!
    $active: Boolean!
    $name: String!
    $username: String!
    $birthday: String!
    $address: String!
    $email: String!
    $phone: String!
    $mobile: String!
    $work: String!
    $workemail: String!
    $workphone: String!
    $size: String!
    $roles: [Int!]!
    $firebaseemail: String!
    $firebaseuid: String!
  ) {
    updateUser(
      id: $id
      active: $active
      name: $name
      username: $username
      birthday: $birthday
      address: $address
      email: $email
      phone: $phone
      mobile: $mobile
      work: $work
      workemail: $workemail
      workphone: $workphone
      size: $size
      roles: $roles
      firebaseuid: $firebaseuid
      firebaseemail: $firebaseemail
    ) {
      user {
        id
      }
      errors {
        field
        message
      }
    }
  }
`;

export default function LoginValidation() {
  // fetching params info about where to redirect after this page
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  // react
  const [missingKeys, setMissingKeys] = useState([]);
  const [emptyKeys, setEmptyKeys] = useState([]);
  const [goto, setGoto] = useState(params.get('to'));
  const [redirectToReferrer2, setRedirectToReferrer2] = useState(false);
  const [userFromGraphQL, setUserFromGraphQL] = useState({});
  const [missingMember, setMissingMember] = useState(false); // member has not been found in graphQL server
  const [foundMember, setFoundMember] = useState({});
  const [filteredSortedUsers, setFilteredSortedUsers] = useState([]);

  // recoil
  const [user, setUser] = useRecoilState(userState);

  // react-router
  const history = useHistory();

  // react-cookie
  const [cookies, setCookie] = useCookies(['user']);

  //graphQL
  const allUsersForLogin = useQuery(ALL_USERS_FOR_LOGIN, {
    fetchPolicy: 'cache-and-network',
  });
  const [updateUserWithFirebaseInfo, { data }] = useMutation(
    UPDATE_USER_FIREBASE,
  );

  // remove users who has an firebaseuid. They have been registered in graphQL server
  // sort alphabetically
  useEffect(() => {
    if (allUsersForLogin?.data) {
      const users = allUsersForLogin?.data?.allUsers?.users;
      const filtering = users.filter(_user => {
        return _user.firebaseuid === '';
      });
      const sorted = filtering.sort((a, b) => {
        const order = b.username.toLowerCase() < a.username.toLowerCase();
        return order;
      });
      setFilteredSortedUsers(sorted);
    }
  }, [allUsersForLogin.loading]);

  useEffect(() => {
    const missing = findMissingKeysInObject(user, initialUserStates);
    const empty = findEmptyKeysInObject(user);
    setMissingKeys(missing);
    setEmptyKeys(empty);
    const users = allUsersForLogin?.data?.allUsers?.users;
    console.log('users 4796', users);
    console.log('recoil user 4796', user);
    console.log('recoil allUsersForLogin?.data 4796', allUsersForLogin?.data);
    if (
      (missingKeys.length > 0 || emptyKeys.length > 0) &&
      users &&
      user.email
    ) {
      // todo implement firebaseUid in server database
      const gotUserByEmail = users.filter(_user => {
        return (
          _user.firebaseemail === user.email ||
          _user.email === user.email ||
          _user.workemail === user.email
        );
      });
      console.log('gotUserByEmail 4796', gotUserByEmail);
      console.log('gotUserByEmail.length > 0 4796', gotUserByEmail.length > 0);
      let existingUser;
      if (gotUserByEmail.length > 0) {
        existingUser = gotUserByEmail[0];
      } else if (foundMember) {
        existingUser = foundMember;
      }
      console.log(
        'existingUser 4796',
        existingUser,
        // isEmptyObject(existingUser),
      );
      console.log('gotUserByEmail 4796', gotUserByEmail);
      console.log('foundMember 4796', foundMember);
      if (!isEmptyObject(existingUser)) {
        console.log('existingUser 4796', existingUser);
        console.log('user 4796', user);
        const userData = {
          firebaseUid: user.firebaseUid,
          email: user.email,
          iqId: existingUser.id,
          username: existingUser.username,
          roles: existingUser.roles,
        };
        console.log('userData 4796', userData);
        setUser(userData);
        // whole user needed when updating db.
        setUserFromGraphQL(existingUser);
      } else {
        console.log('no existing user 4796');
        setMissingMember(true);
      }
    }
  }, [allUsersForLogin?.data?.allUsers, foundMember, user]);

  useEffect(() => {
    console.log('user 4796', user);
    if (user.firebaseUid && user.iqId) {
      handleUpdateUserWithFirebaseInfo();
      setCookie('user', JSON.stringify(user), {
        maxAge: 47433444, // 1½ year
        path: '/',
      });
      setRedirectToReferrer2(true);
    }
  }, [user]);

  const handleUpdateUserWithFirebaseInfo = () => {
    console.log('handleUpdateUserWithFirebaseInfo user 456', user);
    console.log('userFromGraphQL 456', userFromGraphQL);
    console.log('user.firebaseUid 456', user.firebaseUid);
    console.log('user.email 456', user.email);
    updateUserWithFirebaseInfo({
      variables: {
        id: user.iqId,
        active: userFromGraphQL.active,
        name: userFromGraphQL.name,
        username: userFromGraphQL.username,
        birthday: dateEpochToDateString(userFromGraphQL.birthday, 'yyyy-MM-DD'),
        address: userFromGraphQL.address,
        email: userFromGraphQL.email,
        phone: userFromGraphQL.phone,
        mobile: userFromGraphQL.mobile,
        work: userFromGraphQL.work,
        workemail: userFromGraphQL.workemail,
        workphone: userFromGraphQL.workphone,
        size: userFromGraphQL.size,
        roles: userFromGraphQL.roles.map(role => role.id),
        firebaseuid: user.firebaseUid ? user.firebaseUid : '',
        firebaseemail: user.email ? user.email : '',
      },
    });
  };

  console.log('missingKeys 457', missingKeys);
  console.log('missingMember 457', missingMember);
  console.log('missingKeys.length === 0 457', missingKeys.length === 0);
  // console.log('!user.iqId 456', !user.iqId);
  console.log('emptyKeys.length === 0 457', emptyKeys.length === 0);
  console.log('user 457', user);

  console.log('redirectToReferrer2 457', redirectToReferrer2);
  // const users = allUsers?.data?.allUsers?.users;
  // console.log('users 484', users);

  if (allUsersForLogin.loading) {
    return <div>Henter data.</div>;
  }

  if (allUsersForLogin.error) {
    console.log('error 111', allUsersForLogin.error);
    return <div>Fejl ved hentning af data. </div>;
  }

  // continuing to onboarding page and then the wanted page
  if (redirectToReferrer2) {
    return <Redirect to={`${goto || '/'}`} />;
  }
  return (
    <>
      <div>Find Medlem</div>
      {/* <ul>
        {missingKeys &&
          missingKeys.map(key => {
            return <li>{key}</li>;
          })}
      </ul> */}
      <ul>
        {missingMember &&
          // allUsersForLogin?.data?.allUsers?.users.map(user => {
          filteredSortedUsers.map(user => {
            return (
              <li>
                <Button
                  color="primary"
                  onClick={() => {
                    setFoundMember(user);
                    setUserFromGraphQL(user);
                  }}
                >
                  {user.username}
                </Button>
              </li>
            );
          })}
      </ul>
    </>
  );
}
