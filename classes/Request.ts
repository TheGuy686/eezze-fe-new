import { API_HOST } from '../env';

// type TYPE_HEADERS = {[key: string]: [val: number | string]};
type TYPE_HEADERS = any;

export default class Request {
	static doRequest(url: string, method: string, params?: Object, headers?: TYPE_HEADERS, showUploadFeedBackCb?: Function)
	{
// console.clear();
// console.log('url: ', url);
// console.log('method: ', method);
		if (typeof params !== 'object') params = {};

		var XMLHREQ;

		XMLHREQ = XMLHttpRequest;

		const Http = new XMLHREQ();

		Http.open(method, url, true);

		Http.setRequestHeader('Content-Type', 'application/json');

		if (typeof headers == 'object') {
			for (let k in headers) {
				Http.setRequestHeader(k, String(headers[k]));
			}
		}

		if (typeof showUploadFeedBackCb == 'function')
		{
			Http.upload.addEventListener(
				'progress',
				function(evt: any)
				{
					if (evt.lengthComputable)
					{
						let percentComplete = (evt.loaded / evt.total) * 100;

						showUploadFeedBackCb(percentComplete);
					}
				},
				false
			);
		}

		return new Promise(
			(resolve) =>
			{
				try {
					if (typeof params == 'object' && Object.keys(params).length > 0) {
						Http.send(JSON.stringify(params));
					}
					else {
						Http.send();
					}

					Http.onreadystatechange = (e: any) => {
						if (Http.readyState == XMLHttpRequest.DONE && Http.status == 200)
						{
							resolve(
								{
									body: Http.responseText,
									status: Http.status,
									success: true,
									toObject: function ()
									{
										try
										{
											return {
												status: Http.status,
												success: true,
												body: JSON.parse(Http.responseText),
											};
										}
										catch (e: any)
										{
											return {
												status: Http.status,
												success: false,
												body: Http.responseText,
												error: e.message,
											};
										}
									}
								}
							);
						}

						if (Http.readyState == XMLHttpRequest.DONE && Http.status == 400)
						{
							resolve(
								{
									body: Http.responseText,
									status: Http.status,
									success: false,
									toObject: function ()
									{
										try
										{
											return {
												status: Http.status,
												success: false,
												body: JSON.parse(Http.responseText),
											};
										}
										catch (e: any)
										{
											return {
												status: Http.status,
												success: false,
												body: Http.responseText,
												error: e.message,
											};
										}
									}
								}
							);
						}
					}

					Http.onerror = () => resolve(
						{
							body: Http.responseText,
							status: Http.status,
							toObject: function ()
							{
								try
								{
									return {
										status: Http.status,
										success: false,
										body: JSON.parse(Http.responseText),
									};
								}
								catch (e: any)
								{
									return {
										status: Http.status,
										success: false,
										body: Http.responseText,
										error: e.message,
									};
								}
							}
						}
					);
				}
				catch (err) {
					resolve(
						{
							body: Http.responseText,
							status: Http.status,
							toObject: function ()
							{
								try
								{
									return {
										status: Http.status,
										success: false,
										body: JSON.parse(Http.responseText),
									};
								}
								catch (e: any)
								{
									return {
										status: Http.status,
										success: false,
										body: Http.responseText,
										error: e.message,
									};
								}
							}
						}
					);
				}
			}
		);
	}

	static async get(path: string, params?: Object, headers?: TYPE_HEADERS, showUploadFeedBackCb?: Function)
	{
		return await this.doRequest(API_HOST + '/v1' + path, 'GET', params, headers, showUploadFeedBackCb);
	}

	static async post(path: string, params?: Object, headers?: TYPE_HEADERS, showUploadFeedBackCb?: Function)
	{
		return await this.doRequest(API_HOST + '/v1' + path, 'POST', params, headers, showUploadFeedBackCb);
	}

	static async put(path: string, params?: Object, headers?: TYPE_HEADERS, showUploadFeedBackCb?: Function)
	{
		return await this.doRequest(API_HOST + '/v1' + path, 'PUT', params, headers, showUploadFeedBackCb);
	}

	static async delete(path: string, params?: Object, headers?: TYPE_HEADERS, showUploadFeedBackCb?: Function)
	{
		return await this.doRequest(API_HOST + '/v1' + path, 'DELETE', params, headers, showUploadFeedBackCb);
	}
}