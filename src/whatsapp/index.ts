import { NextFunction } from 'express';
import pkg, { Client } from 'whatsapp-web.js';

const { LocalAuth } = pkg;

interface ConnectAPIProps {
	callbackReady?: (client: Client) => void;
	callbackQrCode?: (qrCode: string) => void;
	next?: NextFunction;
}

const connectAPI = (props?: ConnectAPIProps) => {
	return new Promise<any>((resolve, reject) => {
		try {
			console.log('Conectando...');
			const client = new Client({ authStrategy: new LocalAuth() });

			client.on('authenticated', (session) => {
				console.log('Client is authenticated!', session);
			});

			client.on('qr', (qr) => {
				console.log(qr);
				if (props?.callbackQrCode) {
					props.callbackQrCode(qr);
					resolve({});
				}
				props?.next && props?.next();
			});

			client.on('ready', () => {
				console.log('Client is ready!', props?.callbackReady);
				console.log('Client is qrCode!', props?.callbackQrCode);

				if (props?.callbackReady) {
					props.callbackReady(client);
					resolve({});
				}

				resolve({});
				props?.next && props?.next();
			});

			client.initialize();
		} catch (error) {
			console.log(error);
		}
	});
};

export { connectAPI };
