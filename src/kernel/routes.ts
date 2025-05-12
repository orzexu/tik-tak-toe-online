import { GameId } from "./ids";

export const routes = {
  signIn: () => `/sign-in`,
  signUp: () => `/sign-up`,
  game: (gameid: GameId) => `/game/${gameid}`,
  gameStream: (gameId: GameId) => `/game/${gameId}/stream`,
}