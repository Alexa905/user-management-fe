import React, { useState } from 'react';
import { User, UserRoleType, UserStatus, Team } from '../../types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { capitalize } from '../../utils/capitalize';
import Stack from 'react-bootstrap/Stack';

const getName = (user?: User) => {
  if (!user) return '';
  return `${user?.firstName} ${user?.lastName}`;
};

type FormProps = {
  user?: User;
  teams: Team[];
  close: () => void;
  onDone: (user?: User) => void;
};

export const UserForm = ({ close, onDone, user, teams }: FormProps) => {
  const [name, setName] = useState<string>(getName(user));
  const [email, setEmail] = useState<string>(user?.email || '');
  const [role, setRole] = useState<UserRoleType>(
    user?.role || UserRoleType.FULLSTACK,
  );
  const [status, setStatus] = useState<UserStatus>(
    user?.status || UserStatus.CONTRACTOR,
  );
  const [teamId, setTeamId] = useState<string>(user?.teamId || '');

  const save = () => {
    const [firstName, lastName] = name.split(' ');
    onDone({ firstName, lastName, email, status, teamId, role, id: user?.id });
  };
  return (
    <>
      <Form noValidate>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            value={name}
            type="text"
            placeholder="Enter name"
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please put first name and last name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={e => setEmail(e.target?.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Select
            required
            aria-label="User Role Select"
            name="Role"
            defaultValue={role}
            onChange={e => {
              setRole(e.currentTarget.value as UserRoleType);
            }}
          >
            {Object.values(UserRoleType).map((value, index) => {
              return (
                <option key={value + index} value={value}>
                  {capitalize(value)}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select
            required
            aria-label="User Status Select"
            name="Status"
            defaultValue={status}
            onChange={e => {
              setStatus(e.currentTarget.value as UserStatus);
            }}
          >
            {Object.values(UserStatus).map((value, index) => {
              return (
                <option key={value + index} value={value}>
                  {capitalize(value)}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTeam">
          <Form.Label>Team</Form.Label>

          <Form.Select
            required
            aria-label="User Team Select"
            name="Team"
            defaultValue={teamId}
            onChange={e => {
              setTeamId(e.currentTarget.value);
            }}
          >
            <option>Choose the Team</option>
            {teams?.map(({ name, id }, index) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Stack direction="horizontal" gap={3}>
          <Button
            style={{ margin: '0 10px' }}
            variant="primary"
            onClick={() => close()}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={save}>
            Done
          </Button>
        </Stack>
      </Form>
    </>
  );
};
