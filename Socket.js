import { ORIGIN_SERVER } from '@env';

import { io } from 'socket.io-client';

const Socket = io(ORIGIN_SERVER);

export default Socket;
