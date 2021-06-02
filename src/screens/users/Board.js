import { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Table from '../../components/Tables';
import Snackbar from '../../components/Snackbar';

const ALL_BOARDMEM_BERS = gql`
  query allUsers {
    allUsers {
      users {
        id
        active
        username
        roles {
          role
        }
      }
    }
  }
`;

export const Board = () => {
  const allBoardUsers = useQuery(ALL_BOARDMEM_BERS, {
    fetchPolicy: 'cache-first',
  });
  const [active, setActive] = useState(true);

  useEffect(() => {
    allBoardUsers.refetch();
  }, []);

  const headCells = [
    {
      id: 'role',
      numeric: false,
      disablePadding: false,
      label: 'Bestyrelsestitel',
    },
    { id: 'username', numeric: false, disablePadding: false, label: 'IQ-navn' },
  ];

  // todo: make it possible to select columns
  const titles = ['Formand', 'Næstformand', 'Kasserer', 'Bestyrelsesmedlem'];
  let tabelArray = [];

  if (allBoardUsers.data) {
    tabelArray = allBoardUsers.data.allUsers?.users
      .filter(user => {
        return (
          user.active &&
          // checking if user role is in list of board members roles
          user.roles.some(item => {
            return titles.includes(item.role);
          })
        );
      })
      .map(row => {
        return {
          ...row,
          role: row.roles.map((item, index) => {
            // Using that board roles comes before other roles (like admin), and so
            // only index 0 is needed
            if (index === 0) return item.role;
          }),
        };
      });
  }

  if (allBoardUsers.loading) return <div>Henter Bestyrelses Medlemmer...</div>;
  if (allBoardUsers.error)
    return <Snackbar severity="error">Kunne ikke hente Bestyrelsen</Snackbar>;

  return (
    <>
      {allBoardUsers.data && (
        <Table
          title={'Bestyrelsen'}
          tabelArray={tabelArray}
          headCells={headCells}
          startRowsPerPage={tabelArray.length}
          showPagination={false}
        />
      )}
    </>
  );
};
