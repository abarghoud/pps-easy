import React from 'react';

import { IAuthenticationService } from '../service/authentication.interface';
import { FirebaseAuthenticationService } from '../service/firebase-authentication-service';

export const AuthenticationContext = React.createContext<IAuthenticationService>(new FirebaseAuthenticationService());
