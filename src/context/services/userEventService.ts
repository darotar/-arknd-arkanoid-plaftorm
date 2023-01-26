import { Dispatch } from 'react';
import { UserActions, UserState } from '../reducers/usersReducer';
import { User } from '../../types';

export class UserEventService {
  constructor(
    private userState: UserState,
    private dispatch: Dispatch<UserActions>
  ) {}

  addScore(userName: string): void {
    this.dispatch({ type: 'ADD_SCORE', payload: userName });
  }

  getUsers(): User[] {
    return Object.values(this.userState.users);
  }
}
