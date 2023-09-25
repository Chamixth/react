import axios from 'axios';
const API_URL = process.env.CGAAS_API_URL;

export default axios.create({
	baseURL: 'https://manifest.cgaas.ai/CGaaS-Manifest/api/' ,
	headers: {
		'Content-type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers':
			'Origin, X-Requested-With, Content-Type, Accept, Authorization',
		'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
	},
});

