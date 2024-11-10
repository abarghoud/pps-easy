import React from 'react';

import { IContactFormApi } from '../api/contact-form-api.requirements';
import { LocalContactFormApiService } from '../api/local-contact-form-api-service';

export const ContactFormApiServiceContext = React.createContext<IContactFormApi>(new LocalContactFormApiService());
