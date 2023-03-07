import React, { useState } from 'react';
import styled from 'styled-components';
import { User, UserRoleType, Team } from '../../types';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { SortOptions } from '../../enums/sortOptions.enum';
import ListGroup from 'react-bootstrap/ListGroup';

export type listGeneratorProps = {
  role: string;
  sort: SortOptions;
  speaker: string;
};

type Props = {
  users: User[];
  result: User[];
  close: () => void;
  onDone: (props: listGeneratorProps) => void;
};

export const NameRandomizer = ({ close, users, onDone, result }: Props) => {
  const [role, setRole] = useState<string>('');
  const [sort, setSort] = useState<SortOptions>(SortOptions.RANDOM);
  const [speaker, setSpeaker] = useState<string>('');

  const generateList = (e: any) => {
    e.stopPropagation();
    onDone({ role, sort, speaker });
  };

  const renderForm = () => {
    return (
      <Form noValidate>
        <Form.Group className="mb-3" controlId="formTeam">
          <Form.Label>Choose the role</Form.Label>
          <Form.Select
            required
            aria-label="User Role Select"
            name="Role"
            onChange={e => {
              setRole(e.currentTarget.value);
            }}
          >
            <option>All developers</option>
            {Object.values(UserRoleType)?.map((v, index) => {
              return (
                <option key={v + index} value={v}>
                  {v}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSort">
          <Form.Label>Sorting order</Form.Label>
          <Form.Select
            required
            aria-label="User Sort"
            name="Sort"
            defaultValue={sort}
            onChange={e => {
              setSort(e.currentTarget.value as SortOptions);
            }}
          >
            {Object.values(SortOptions)?.map((value, index) => {
              return (
                <option key={value + index} value={value}>
                  {value}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSpeaker">
          <Form.Label>Speaker</Form.Label>
          <Form.Select
            required
            aria-label="User Speaker"
            name="Speaker"
            onChange={e => {
              setSpeaker(e.currentTarget.value);
            }}
          >
            <option>None</option>
            {users?.map(({ id, firstName, lastName }) => {
              return (
                <option
                  key={id}
                  value={id}
                >{`${firstName} ${lastName}`}</option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </Form>
    );
  };

  const renderResult = () => {
    if (result?.length) {
      return (
        <>
          <h6>
            Result for role - {role || 'All'}, sorting - {sort}, speaker -{' '}
            {speaker || 'None'}
          </h6>
          <ListGroup style={{ marginBottom: '20px' }}>
            {' '}
            {result.map((value, index) => {
              return (
                <ListGroup.Item key={value.id}>
                  {`${value.firstName} ${value.lastName}`}{' '}
                  {value.isSpeaker && (
                    <span
                      style={{
                        fontWeight: 'bold',
                        fontSize: '12px',
                        float: 'right',
                      }}
                    >
                      ---&gt; Designated speaker
                    </span>
                  )}{' '}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </>
      );
    } else return null;
  };

  return (
    <>
      {result?.length ? renderResult() : renderForm()}
      <Stack direction="horizontal" gap={3}>
        <Button
          style={{ margin: '0 10px' }}
          variant="primary"
          onClick={() => close()}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={e => generateList(e)}>
          Generate List
        </Button>
      </Stack>
    </>
  );
};
