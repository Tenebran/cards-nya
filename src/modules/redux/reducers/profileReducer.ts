let initialState: InitialStateProfileType = {
  _id: '',
  email: '',
  name: '',
  avatar: '',
  publicCardPacksCount: 0,
};

export const profileReducer = (
  state: InitialStateProfileType = initialState,
  action: ActionProfileType
): InitialStateProfileType => {
  switch (action.type) {
    case 'PROFILE/GET_PROFILE':
      return {
        ...state,
        _id: action.id,
        email: action.email,
        name: action.name,
        avatar: action.avatar,
        publicCardPacksCount: action.publicCardPacksCount,
      };
    default:
      return state;
  }
};

export const getProfileAC = (
  id: string,
  email: string,
  name: string,
  avatar: string | undefined,
  publicCardPacksCount: number
) => {
  return { type: 'PROFILE/GET_PROFILE', id, email, name, avatar, publicCardPacksCount } as const;
};

export type InitialStateProfileType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
};

export type ActionProfileType = ReturnType<typeof getProfileAC>;
