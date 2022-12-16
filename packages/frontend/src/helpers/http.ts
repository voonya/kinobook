import { HttpMethods } from '@common';
import { getAccessToken } from 'src/services';
import { ApiRoutes, AuthRoutes } from '@common';
import { getApiRoute } from './api-routes';

interface IOptions {
  method: HttpMethods;
  body?: any;
  contentType?: string;
  headers: HeadersInit;
}

class HttpHelper {
  private _contentType = 'application/json';

  async post(url: string, body?: any, contentType?: string) {
    const options = this.getOptions(
      HttpMethods.POST,
      body,
      contentType ?? this._contentType,
    );

    return this.makeRequest(url, options);
  }

  async put(url: string, body?: any, contentType?: string) {
    const options = this.getOptions(
      HttpMethods.PUT,
      body,
      contentType ?? this._contentType,
    );

    return this.makeRequest(url, options);
  }

  async delete(url: string, body?: any, contentType?: string) {
    const options = this.getOptions(
      HttpMethods.DELETE,
      body,
      contentType ?? this._contentType,
    );

    return this.makeRequest(url, options);
  }

  async get(url: string, body?: any, contentType?: string) {
    const options = this.getOptions(
      HttpMethods.GET,
      body,
      contentType ?? this._contentType,
    );

    return this.makeRequest(url, options);
  }

  private async makeRequest(url: string, options: IOptions) {
    let result = await fetch(url, options);

    if (result.status === 401) {
      const refreshResult = await this.refreshTokens();
      if (refreshResult.status === 400) {
        return result.json();
      }

      const updatedOptions = this.updateAccessTokenOption(options);

      result = await fetch(url, updatedOptions);
    }

    return result.json();
  }

  private refreshTokens() {
    return fetch(getApiRoute(ApiRoutes.AUTH, AuthRoutes.REFRESH), {
      method: HttpMethods.POST,
      credentials: 'include',
    });
  }

  private getOptions(method: HttpMethods, body?: any, contentType?: string) {
    const accessToken = getAccessToken();

    const config: any = {
      headers: {
        'Content-Type': contentType || 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      credentials: 'include',
      method,
    };

    if (body && contentType === 'application/json') {
      config.body = JSON.stringify(body);
    }

    if (body && contentType === 'multipart/form-data') {
      config.body = body as BodyInit;
      delete config.headers['Content-Type'];
    }

    return config;
  }

  private updateAccessTokenOption(options: IOptions) {
    const accessToken = getAccessToken();

    return {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
      },
    };
  }
}

export const http = new HttpHelper();
