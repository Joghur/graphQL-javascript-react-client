import { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Table from '../../components/Tables';
import { removeSpaces } from '../../utils/strings';
import Snackbar from '../../components/Snackbar';
import { GRAPHQL_SERVER_URL } from '../../constants';
import _ from 'lodash';

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
        address
        roles {
          role
        }
      }
    }
  }
`;
const ALL_ROLES = gql`
  query {
    allRoles {
      roles {
        role
        users {
          name
        }
      }
    }
  }
`;

export const Users = () => {
  // graphQL
  const allUsers = useQuery(ALL_USERS, {
    fetchPolicy: 'cache-and-network',
  });
  const allRoles = useQuery(ALL_ROLES, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    allUsers.refetch();
    allRoles.refetch();
  }, []);

  const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Navn' },
    {
      id: 'username',
      numeric: false,
      disablePadding: false,
      label: 'Bruger navn',
    },
    { id: 'role', numeric: false, disablePadding: false, label: 'Roller' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Adresse' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    {
      id: 'phone',
      numeric: false,
      disablePadding: false,
      label: 'Telefon',
    },
  ];

  // todo: make it possible to select columns
  let tabelArray;
  if (allUsers.data) {
    tabelArray = allUsers.data.allUsers?.users.map(row => {
      const phones = row.phone;
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
    return <Snackbar severity="error">Kunne ikke hente Medlems liste</Snackbar>;

  return (
    <>
      <h1>Medlems liste</h1>
      <div>
        <ul>
          <li>
            Database <b>Many-to-Many relation</b> mellem de to tabeller - bruger
            og roller.
            <ul>
              <li>
                En bruger kan have flere roller, og en rolle kan have flere
                brugere
              </li>
            </ul>
          </li>
          <li>Tryk på et navn for at ændre data</li>
          <li>
            Al data er tilfældig test data og bliver genopbygget ved server
            reboot
          </li>
          <li>
            Data kommer herfra:{' '}
            <ul>
              <li>
                <a href={GRAPHQL_SERVER_URL}>{GRAPHQL_SERVER_URL}</a>
              </li>
              <li>
                Hvis du trykker på linket prøv da at kopiere følgende ind i
                feltet på venstre side og tryk på pil i midten:
                <ul>
                  <li>
                    <b>{'query{allUsers{users{name roles{role}}}}'}</b>
                  </li>
                  eller{' '}
                  <li>
                    <b>{'query{allRoles{roles{role users{name}}}}'}</b>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            Scroll ned for at se <b>rolle liste</b>
          </li>
        </ul>
      </div>
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
      <h1>Rolle liste</h1>
      <h3>Usorteret liste af roller og dens medlemmer</h3>
      <span>
        Prøv at ændre roller via ovenstående tabel og kom tilbage hertil og se
        ændringen
      </span>
      <div>
        <ul>
          {allRoles?.data?.allRoles.roles &&
            allRoles?.data?.allRoles.roles.map(roleObj => {
              return (
                <>
                  <li>
                    <b>{roleObj.role}</b>
                  </li>
                  <ul>
                    {roleObj.users.map(userObj => {
                      return (
                        <>
                          <li>{userObj.name}</li>
                        </>
                      );
                    })}
                  </ul>
                </>
              );
            })}
        </ul>
      </div>
    </>
  );
};
