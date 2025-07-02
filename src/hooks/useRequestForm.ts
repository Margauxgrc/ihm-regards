import { useEffect, useState } from 'react';
import { useResp } from '../hooks/useResp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { callApi, ApiConfig } from '../services/RequestService';
import { Method } from 'axios';
import { useHistory } from '../hooks/useHistory';
import { HistoryEntryType } from '../types/HistoryEntryType';

export function useRequestForm() {
  const { setResponse } = useResp();
  const { authToken, project } = useAuth();
  const { selectedEntry, setSelectedEntry, addHistoryEntry } = useHistory();
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
      navigate('/response');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRequestFromHistory = (entry: HistoryEntryType) => {
    setMethod(entry.method);
    setMicroservice(entry.microservice);
    setEndpoint(entry.endpoint);
    setPayloadText(entry.payloadText);
  };

  useEffect(() => {
    if (selectedEntry) {
      loadRequestFromHistory(selectedEntry);
      setSelectedEntry(null);
    }
  }, [selectedEntry, setSelectedEntry]);

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
