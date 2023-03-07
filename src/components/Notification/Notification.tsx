import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

type Props = {
  type?: string;
  message: string;
  onCloseCallback?: () => void;
};

export function Notification({
  type = 'info',
  message,
  onCloseCallback,
}: Props) {
  const [show, setShow] = useState(true);
  const onCloseNotification = () => {
    setShow(false);
    onCloseCallback && onCloseCallback();
  };
  if (show) {
    return (
      <Alert variant={type} onClose={() => onCloseNotification()} dismissible>
        <Alert.Heading>Oh snap! You got an message!</Alert.Heading>
        <p>{message}</p>
      </Alert>
    );
  }
  return null;
}
