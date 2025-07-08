import RequestForm from '../components/RequestForm';
import NavBar from '../components/NavBar';
import { useRequestForm } from '../hooks/useRequestForm';
import { useParams } from 'react-router-dom';

export default function RequestPage() {
  const { host } = useParams<{ host: string }>();
  const requestFormLogic = useRequestForm(host);
  return (
    <NavBar>
      <RequestForm {...requestFormLogic} />
    </NavBar>
  );
}
