import { afterEach, beforeAll, beforeEach, expect } from 'vitest';
import { mock } from 'vitest-mock-extended';

import { AuthenticationUserPersistenceHandler } from './authentication-user-persistence-handler';
import { IAuthenticationUserPersistenceProvider } from './authentication-user-persistence-provider.interface';
import { IAuthenticationService } from '../authentication.interface';
import { IAuthenticationUserPersistenceStateTracker } from './authentication-user-persistence-state-tracker.interface';
import { IUser } from '../../interfaces/user.interface';

describe('The AuthenticationUserPersistenceHandler class', () => {
  let instance: AuthenticationUserPersistenceHandler;
  let onAuthStateChangedCallback: (user: IUser | null) => void;
  const mockAuthenticationService = mock<IAuthenticationService>();
  const mockAuthenticationUserPersistenceProvider = mock<IAuthenticationUserPersistenceProvider>();
  const mockAuthenticationUserPersistenceStateTracker = mock<IAuthenticationUserPersistenceStateTracker>();


  beforeAll(() => {
    instance = new AuthenticationUserPersistenceHandler(
      mockAuthenticationService,
      mockAuthenticationUserPersistenceProvider,
      mockAuthenticationUserPersistenceStateTracker,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockAuthenticationService.onAuthStateChanged.mockImplementation((...args: any[]) => {
      onAuthStateChangedCallback = args[0];
    })
    instance.init();
  });

  describe('When auth state changes', () => {
    describe('When a not null user object is received (meaning it is a login or signup)', () => {
      describe('When persistance state tracker indicates it should update', () => {
        const authenticatedUser: IUser = {
          uid: 'a-u-id',
          displayName: 'john doe',
          email: 'john@doe.com',
        };

        beforeEach(() => {
          mockAuthenticationUserPersistenceStateTracker.checkShouldUpdate.mockReturnValue(true);
          onAuthStateChangedCallback(authenticatedUser);
        });

        afterEach(() => {
          mockAuthenticationUserPersistenceProvider.persist.mockClear();
          mockAuthenticationUserPersistenceStateTracker.setUpdated.mockClear();
        });

        it('should call persist user', () => {
          expect(mockAuthenticationUserPersistenceProvider.persist).toHaveBeenCalledWith(authenticatedUser);
        });

        it('should notify persistance state tracker as updated', () => {
          expect(mockAuthenticationUserPersistenceStateTracker.setUpdated).toHaveBeenCalled();
        });
      });
    });

    describe('When the user is null (logout)', () => {
      beforeEach(() => {
        onAuthStateChangedCallback(null);
      });

      it('should do nothing', () => {
        expect(mockAuthenticationUserPersistenceProvider.persist).not.toHaveBeenCalled();
        expect(mockAuthenticationUserPersistenceStateTracker.setUpdated).not.toHaveBeenCalled();
      });
    });
  });
});
