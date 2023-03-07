import React from 'react';
import styled from 'styled-components';
import { User } from '../../types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
  margin: 20px 0;
  min-width: 1024px;
  table {
    min-width: 1024px;
  }
`;

type Props = {
  users: User[];
  edit: (type: string, user: User) => void;
  currentPage: number;
};

export const UserList = ({ users, edit, currentPage }: Props) => {
  const getIndex = (index: number) => {
    if (currentPage > 1) {
      return index + 1 + users.length * currentPage;
    }
    return index + 1;
  };
  return (
    <UserListContainer>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {['Name', 'Email', 'Role', 'Status', 'Team', 'Action'].map(
              (name, index) => (
                <th key={index}>{name}</th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{getIndex(index)}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>{user.teamName}</td>
              <td>
                <Button onClick={() => edit('editUser', user)}>
                  Edit/View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </UserListContainer>
  );
};
