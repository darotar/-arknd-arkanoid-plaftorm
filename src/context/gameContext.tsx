import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  FC,
  ReactNode,
  useReducer,
  useMemo,
} from 'react';
import { ArkanoidGameView } from '../views/MainView';
import { defaultUserState, userReducer } from './reducers/usersReducer';
import { UserEventService } from './services/userEventService';

type ArkanoidGameContext = {
  appView?: ArkanoidGameView;
  setAppView: Dispatch<SetStateAction<ArkanoidGameView | undefined>>;
  userEventService?: UserEventService;
};

export const initialContext = {
  appView: undefined,
  setAppView: () => {},
  userEventService: undefined,
};

export const GameContext = createContext<ArkanoidGameContext>(initialContext);

export const GameContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appView, setAppView] = useState<ArkanoidGameView>();
  const [userState, dispatchUserChange] = useReducer(
    userReducer,
    defaultUserState
  );

  const userEventService = useMemo(
    () => new UserEventService(userState, dispatchUserChange),
    [userState, dispatchUserChange]
  );

  const contextValue = {
    appView,
    setAppView,
    userState,
    dispatchUserChange,
    userEventService,
  };
  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
