import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSearching: {
    status: false,
    timeInQueue: 0,
    estimatedTime: 0,
  },
  isMatchFound: {
    status: false,
    state: 'PartyNotReady',
    playerResponse: 'None',
    timer: 0,
  },
  lobbyConfig: {
    isLobbyActive: false,
    queueId: null,
    canStartActivity: false,
    isLobbyFull: false,
    showPositionSelector: null,
    invitations: [],
    members: [],
    localMember: null,
    partyType: 'closed',
  },
};

export const lobbySlice = createSlice({
  name: 'Lobby',
  initialState,
  reducers: {
    setSearching: (state, action) => {
      if (action.payload) {
        state.isSearching = {
          ...action.payload,
          status: true,
        };
      } else {
        state.isSearching = {
          ...initialState.isSearching,
        };
      }
    },
    setLobbyConfig: (state, action) => {
      if (action.payload) {
        state.lobbyConfig = {
          ...action.payload,
        };
      } else {
        state.lobbyConfig = {
          ...initialState.lobbyConfig,
        };
      }
    },
    setMatchFound: (state, action) => {
      if (action.payload) {
        state.isMatchFound = {
          ...action.payload,
          status: true,
        };
      } else {
        state.isMatchFound = {
          ...initialState.isMatchFound,
        };
      }
    },
  },
});

export const { setSearching, setMatchFound, setLobbyConfig } =
  lobbySlice.actions;

export default lobbySlice.reducer;
