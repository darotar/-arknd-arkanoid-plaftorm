import { PANEL_COLORS } from '../../consts';
import { User } from '../../types';

export type UserState = {
  users: Record<string, User>;
};

export type UserActions = { type: 'ADD_SCORE'; payload: string };

export const defaultUserState: UserState = {
  users: {
    'User 1': {
      name: 'User 1',
      score: 0,
      position: 'left',
      color: PANEL_COLORS.red,
      keys: { up: 'w', down: 's' },
      isComputer: false,
    },
    'User 2': {
      name: 'User 2',
      score: 0,
      position: 'right',
      color: PANEL_COLORS.blue,
      keys: { up: 'ArrowUp', down: 'ArrowDown' },
      isComputer: true,
    },
  },
};

export function userReducer(state: UserState, action: UserActions): UserState {
  switch (action.type) {
    case 'ADD_SCORE': {
      const chosenUser = state.users[action.payload];

      return {
        ...state,
        users: {
          ...state.users,
          [action.payload]: { ...chosenUser, score: chosenUser.score + 1 },
        },
      };
    }
    default:
      return state;
  }
}
