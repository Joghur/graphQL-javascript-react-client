import { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Table from '../../components/Tables';
import { removeSpaces } from '../../utils/strings';
import Snackbar from '../../components/Snackbar';
import { auth } from '../../utils/firebase';
import { tokenState } from '../../Recoil';
import { useRecoilState } from 'recoil';

const ALL_USERS = gql`
  query allUsers {
    allUsers {
      users {
        id
        name
        active
        username
        email
        phone
        mobile
        address
        roles {
          role
        }
      }
    }
  }
`;

export const Users = () => {
  // grapgQL
  const allUsers = useQuery(ALL_USERS, {
    fetchPolicy: 'cache-and-network',
  });

  // recoil
  const [token, setToken] = useRecoilState(tokenState);

  useEffect(() => {
    allUsers.refetch();
  }, []);

  useEffect(async () => {
    // refresh firebase token and update recoil value so apolloclient will use updated token
    // when fetching from graphQL server
    const token = await auth().currentUser.getIdToken();
    setToken({ token });
  }, []);

  const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Navn' },
    { id: 'username', numeric: false, disablePadding: false, label: 'IQ-navn' },
    { id: 'role', numeric: false, disablePadding: false, label: 'Rolle' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Adresse' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    {
      id: 'phone',
      numeric: false,
      disablePadding: false,
      label: 'Telefon (mobil først)',
    },
  ];

  // todo: make it possible to select columns
  let tabelArray;
  if (allUsers.data) {
    tabelArray = allUsers.data.allUsers?.users
      .filter(user => {
        return user.active;
      })
      .map(row => {
        const phones = row.mobile ? row.mobile : row.phone;
        return {
          ...row,
          role: row.roles.map(item => item.role).join(', '),
          address: row.address.replace(/,/g, ', '),
          phone: removeSpaces(phones),
        };
      });
  }

  if (allUsers.loading) return <div>Henter Medlemmer...</div>;
  if (allUsers.error || !allUsers.data?.allUsers)
    return (
      <Snackbar severity="error">Kunne ikke hente Medlems liste</Snackbar>
    );
  console.log('allUsers.data', allUsers.data);
  return (
    <>
      {allUsers.data?.allUsers && (
        <>
          <Table
            title={`Medlemmer (${tabelArray.length})`}
            tabelArray={tabelArray}
            headCells={headCells}
            startRowsPerPage={15}
            showPagination={true}
            rowsPerPageOptions={[
              15,
              17,
              19,
              21,
              { value: tabelArray.length, label: 'Alle' },
            ]}
          />
        </>
      )}
    </>
  );
};
