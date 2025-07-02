import React from 'react';
import RequestForm from '../components/RequestForm';
import NavBar from '../components/NavBar';
import { useRequestForm } from '../hooks/useRequestForm';

export default function RequestPage() {
  const requestFormLogic = useRequestForm();
  return (
    <NavBar>
      <RequestForm {...requestFormLogic} />
    </NavBar>
  );
}
