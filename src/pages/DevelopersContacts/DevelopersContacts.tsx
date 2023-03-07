import React, { useEffect, useState, useRef, useCallback } from 'react';
import { User, Team } from '../../types';
import { PageContainer } from './DevelopersContacts.styled';
import {
  ModalWindow,
  UserList,
  UserForm,
  NameRandomizer,
  listGeneratorProps,
  PaginationPanel,
  Notification,
} from '../../components';
import Button from 'react-bootstrap/Button';
import apiClient from '../../utils/apiClient';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

function ContactsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [user, setUser] = useState<User>();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>();
  const [generatedList, setGeneratedList] = useState<User[]>([]);
  const limitRef = useRef(4);

  async function fetchUsers(page?: number, limit?: number) {
    try {
      const data = await apiClient.getUsers({ limit, page });
      setUsers(data.items);
      setTotalPages(limit ? Math.ceil(data.allCount / limit) : 1);
    } catch (error: any) {
      setError(error?.message);
    }
  }

  async function fetchAllUsers(page?: number, limit?: number) {
    try {
      const data = await apiClient.getUsers({ limit, page });
      setAllUsers(data.items);
    } catch (error: any) {
      setError(error?.message);
    }
  }

  async function fetchTeams() {
    try {
      const data = await apiClient.getTeams();
      setTeams(data.items);
    } catch (error: any) {
      setError(error?.message);
    }
  }

  async function updateUserData(user?: User) {
    if (!user) return;
    try {
      if (user.id) {
        const data = await apiClient.updateUser(user.id, user);
        if (data) {
          setMessage('User has been updated');
          fetchUsers(currentPage, limitRef.current);
        }
      } else {
        const data = await apiClient.createUser(user);
        if (data) {
          setMessage('User has been created');
        }
      }
    } catch (error: any) {
      setError(error?.message);
    }
  }

  useEffect(() => {
    fetchUsers(currentPage, limitRef.current);
  }, [currentPage, limitRef.current]);

  const openModal = useCallback(
    async (type: string, user?: User) => {
      if (user) setUser(user);
      if (type === 'nameRandomizer') {
        await fetchAllUsers();
      } else {
        await fetchTeams();
      }
      setShowModal(true);
      setModalType(type);
    },
    [setShowModal, setModalType, fetchAllUsers, fetchTeams],
  );

  const setPages = useCallback(
    async (page: number) => {
      setCurrentPage(page);
      await fetchUsers(page, limitRef.current);
    },
    [setCurrentPage, fetchUsers],
  );

  const closeModal = useCallback(() => {
    setShowModal(false);
    setUser(undefined);
    setAllUsers([]);
    setGeneratedList([]);
  }, [setShowModal, setGeneratedList, setUser, setAllUsers]);

  const updateUser = useCallback(
    async (user?: User) => {
      await updateUserData(user);
      closeModal();
    },
    [closeModal, updateUserData],
  );

  const generateList = useCallback(
    async (props: listGeneratorProps) => {
      if (generatedList?.length) {
        setGeneratedList([]);
        return;
      }

      const data = await apiClient.generateUserList(props);
      if (data) {
        setGeneratedList(data);
      }
    },
    [setGeneratedList],
  );

  const renderUserListWithPagination = useCallback(() => {
    return (
      <>
        <UserList users={users} edit={openModal} currentPage={currentPage} />
        <PaginationPanel
          totalPages={totalPages}
          currentPage={currentPage}
          onPageSet={setPages}
        />
      </>
    );
  }, [currentPage, openModal, totalPages, users, setPages]);

  const renderNotification = useCallback(() => {
    return (
      <Notification
        type="info"
        message={message}
        onCloseCallback={() => setMessage('')}
      />
    );
  }, [message, setMessage]);

  const renderErrorNotification = useCallback(() => {
    return (
      <Notification
        type="warning"
        message={error}
        onCloseCallback={() => setError('')}
      />
    );
  }, [error, setError]);

  const renderModal = useCallback(() => {
    if (modalType === 'nameRandomizer') {
      return renderNameRandomizerModal();
    }
    return (
      <ModalWindow
        show={showModal}
        close={closeModal}
        title={user ? 'Edit User' : 'Add User'}
      >
        {
          <UserForm
            teams={teams}
            user={user}
            close={closeModal}
            onDone={updateUser}
          />
        }
      </ModalWindow>
    );
  }, [showModal, closeModal, user, teams, updateUser, modalType]);

  const renderNameRandomizerModal = useCallback(() => {
    return (
      <ModalWindow show={showModal} close={closeModal} title="Name Randomizer">
        {
          <NameRandomizer
            result={generatedList}
            users={allUsers}
            close={closeModal}
            onDone={generateList}
          />
        }
      </ModalWindow>
    );
  }, [showModal, closeModal, allUsers, generatedList]);

  return (
    <PageContainer>
      <h2>Developer Contacts Page</h2>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="me-2" aria-label="First group">
          <Button
            style={{ margin: '0 10px' }}
            variant="primary"
            onClick={() => openModal('addUser')}
          >
            Add new user
          </Button>
          <Button
            variant="secondary"
            onClick={() => openModal('nameRandomizer')}
          >
            Name Randomizer
          </Button>
        </ButtonGroup>
      </ButtonToolbar>

      {users?.length > 0 && renderUserListWithPagination()}

      {message && renderNotification()}
      {error && renderErrorNotification()}

      {showModal && renderModal()}
    </PageContainer>
  );
}

export default ContactsPage;
