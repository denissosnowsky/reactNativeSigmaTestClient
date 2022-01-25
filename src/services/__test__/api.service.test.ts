import { AxiosInstance } from 'axios';

import { ApiService } from '../api.service';

jest.mock('expo-constants', () => ({
  Constants: {
    manifest: {
      extra: {
        prod_url: 'http://prod-server.com',
        dev_url: 'http://dev-server.com',
      },
    },
  },
}));

describe('ApiService', () => {
  const PARAM_MOCK = 'PARAM_MOCK';
  const BODY_MOCK = 'BODY_MOCK';
  const RES_DATA_MOCK = 'RES_DATA_MOCK';
  const URL = '/';

  let ApiServiceInstance: ApiService;
  let axiosInstanceStub: AxiosInstance;

  beforeEach(() => {
    axiosInstanceStub = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    } as unknown as AxiosInstance;
    ApiServiceInstance = new ApiService(axiosInstanceStub);
  });

  it('get api request should be called with right url and params', async () => {
    // Given
    jest.spyOn(axiosInstanceStub, 'get').mockResolvedValueOnce({ data: RES_DATA_MOCK });
    // When
    await ApiServiceInstance.get(URL, {
      paramProp: PARAM_MOCK,
    });
    // Then
    expect(axiosInstanceStub.get).toHaveBeenCalledWith(URL, {
      params: { paramProp: PARAM_MOCK },
    });
  });

  it('post api request should be called with right url, params and body', async () => {
    // Given
    jest.spyOn(axiosInstanceStub, 'post').mockResolvedValueOnce({ data: RES_DATA_MOCK });
    // When
    await ApiServiceInstance.post(URL, { bodyProp: BODY_MOCK }, { paramProp: PARAM_MOCK });
    // Then
    expect(axiosInstanceStub.post).toHaveBeenCalledWith(
      URL,
      { bodyProp: BODY_MOCK },
      { params: { paramProp: PARAM_MOCK } },
    );
  });

  it('put api request should be called with right url, params and body', async () => {
    // Given
    jest.spyOn(axiosInstanceStub, 'put').mockResolvedValueOnce({ data: RES_DATA_MOCK });
    // When
    await ApiServiceInstance.put(URL, { bodyProp: BODY_MOCK }, { paramProp: PARAM_MOCK });
    // Then
    expect(axiosInstanceStub.put).toHaveBeenCalledWith(
      URL,
      { bodyProp: BODY_MOCK },
      { params: { paramProp: PARAM_MOCK } },
    );
  });

  it('delete api request should be called with right url and params', async () => {
    // Given
    jest.spyOn(axiosInstanceStub, 'delete').mockResolvedValueOnce({ data: RES_DATA_MOCK });
    // When
    await ApiServiceInstance.delete(URL, {
      paramProp: PARAM_MOCK,
    });
    // Then
    expect(axiosInstanceStub.delete).toHaveBeenCalledWith(URL, {
      params: { paramProp: PARAM_MOCK },
    });
  });
});
