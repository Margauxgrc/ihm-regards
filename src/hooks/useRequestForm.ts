import { useEffect, useState } from 'react';
import { useResp } from '../hooks/useResp';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { callApi, ApiConfig } from '../services/RequestService';
import { Method } from 'axios';
import { useHistory } from '../hooks/useHistory';

export function useRequestForm(host: string | undefined) {
  const location = useLocation();
  const { setResponse } = useResp();
  const { authToken, project } = useAuth();
  const { addHistoryEntry } = useHistory();
  const navigate = useNavigate();

  const [method, setMethod] = useState<Method>('GET');
  const [microservice, setMicroservice] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [payloadText, setPayloadText] = useState('{}');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!authToken || !project) {
      setError("Erreur d'authentification.");
      return;
    }
    if (!host) {
      setError("L'adresse de l'instance est manquante dans l'URL.");
      return;
    }
    setIsLoading(true);
    setError(null);
    let parsedPayload = {};
    try {
      parsedPayload = JSON.parse(payloadText);
    } catch (parseError) {
      setError('JSON non valide');
      setIsLoading(false);
      return;
    }
    const apiConfig: ApiConfig = {
      host,
      method,
      microservice,
      endpoint,
      authToken,
      project,
      queryParams: method === 'GET' ? parsedPayload : undefined,
      body: method !== 'GET' ? parsedPayload : undefined,
    };
    try {
      const apiResponse = await callApi(apiConfig);
      addHistoryEntry({ method, microservice, endpoint, payloadText });
      setResponse(apiResponse);
      navigate(`/${host}/response`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Une erreur inattendue est survenue.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const entryToLoad = location.state?.entryToLoad;
    if (entryToLoad) {
      setMethod(entryToLoad.method);
      setMicroservice(entryToLoad.microservice);
      setEndpoint(entryToLoad.endpoint);
      setPayloadText(entryToLoad.payloadText);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return {
    method,
    microservice,
    endpoint,
    payloadText,
    isLoading,
    error,
    onMethodChange: setMethod,
    onMicroserviceChange: setMicroservice,
    onEndpointChange: setEndpoint,
    onPayloadChange: setPayloadText,
    onSubmit: handleSubmit,
  };
}
