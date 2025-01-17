import { MicrosoftEntraId } from 'arctic';
import {
	MICROSOFTENTRAID_TENANT_ID,
	MICROSOFTENTRAID_CLIENT_ID,
	MICROSOFTENTRAID_CLIENT_SECRET,
	MICROSOFTENTRAID_REDIRECT_URI
} from '$env/static/private';

export const microsoftEntraId = new MicrosoftEntraId(
	MICROSOFTENTRAID_TENANT_ID,
	MICROSOFTENTRAID_CLIENT_ID,
	MICROSOFTENTRAID_CLIENT_SECRET,
	MICROSOFTENTRAID_REDIRECT_URI
);
