import { NextFunction, Request, Response } from 'express';
import { MessageMedia } from 'whatsapp-web.js';
import { GetCSVContactInfoToJson } from '../utils/convertToJSON';
import { CreateFile } from '../utils/createFile';
import { connectAPI } from '../whatsapp';

const home = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await connectAPI({
			callbackQrCode: (qrCode) => {
				res.render('index', { name: qrCode });
			},
			next,
		});
	} catch (error) {
		console.error('Erro ao conectar:', error);
		next(error);
	}
};

const home2 = async (req: Request, res: Response, next: any) => {
	try {
		res.render('home2', { name: 'test' });
	} catch (error) {
		console.error('Erro ao conectar:', error);
	}
};

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
	try {
		console.log('Enviando mensagem...');
		const formData = req.body;
		CreateFile(formData.contactInfo, 'contact_info.csv');
		const contactInfo = GetCSVContactInfoToJson('contact_info.csv');
		console.log(contactInfo);

		await connectAPI({
			callbackReady: (client) => {
				const loop = (index: number) => {
					if (index <= contactInfo.length) {
						contactInfo[index]?.Contatos.split(',').map((number) => {
							if (number?.length < 10) return;
							var newNumber = number?.replace(/\D/g, '');
							const textMessage = formData?.message ? eval(formData?.message) : '';

							if (newNumber.slice(0, 2) == '31' && newNumber.length >= 11) {
								let cadeiaDeCaracteres = newNumber;
								const indice = 2;
								const arrayDeCaracteres = cadeiaDeCaracteres.split('');
								arrayDeCaracteres.splice(indice, 1);
								newNumber = arrayDeCaracteres.join('');
							}

							if (req.file?.originalname && newNumber.length >= 10) {
								console.log(newNumber);
								const media = MessageMedia.fromFilePath(__dirname + `/../documents/${req.file?.originalname}`);
								client.sendMessage(`55${newNumber}@c.us`, media, { caption: textMessage });
							} else {
								client.sendMessage(`55${newNumber}@c.us`, textMessage);
							}
						});
					}

					setTimeout(() => {
						console.log('Enviando mensagem para: \n' + contactInfo[index].Nome + '\n\n');
						index = index + 1;
						if (index < contactInfo.length) {
							loop(index);
						} else {
							console.log('Todas as mensagens foram enviadas!');
						}
					}, 10000);
				};

				loop(0); // Contador se inicia em 0
				return res.json('Mensagens enviadas');
			},
			next,
		});

		console.log('Finished');
	} catch (error) {
		console.error('Erro ao conectar:', error);
		next(error);
	}
};

export { home, home2, sendMessage };
