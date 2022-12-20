// Nest.js
import { BadRequestException, Injectable } from '@nestjs/common';

// Config
import { MAX_PLAYERS } from 'env-vars';

// Room
import { CreateRoomDTO } from 'modules/room/dto/create-room.dto';
import { JoinRoomDTO } from 'modules/room/dto/join-room.dto';
import { RoomEntity } from 'modules/room/room.entity';
import { RoomRepository } from 'modules/room/room.repository';

// Match
import { MATCH_STATUS } from 'modules/match/match.enum';
import { MatchRepository } from 'modules/match/match.repository';

// Player
import { PlayerEntity } from 'modules/player/player.entity';
import { PlayerService } from 'modules/player/player.service';
import { randomNumber } from 'src/utils/number';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly matchRepository: MatchRepository,
    private readonly playerService: PlayerService
  ) {}
  
  public async getRoom(name: string): Promise<RoomEntity> {
    return await this.roomRepository.getRoomByName(name);
  }
  
  /**
   * Create room by CreateRoomDTO
   * @param {CreateRoomDTO} createRoomDTO
   */
  public async createRoom(createRoomDTO: CreateRoomDTO): Promise<void> {
    let roomName = null;
    let roomNameUnique = false;
    
    while (!roomNameUnique) {
      roomName = randomNumber(0, 999999).toString();
      
      const hasRoom = await this.roomRepository.getRoomByName(roomName);
      if (!hasRoom) {
        roomNameUnique = true;
      }
    }
    
    const createRoom = RoomEntity.create(roomName);
    const createPlayer = PlayerEntity.createFromCreateRoomDTO(createRoomDTO);
  
    createRoom.addPlayer(createPlayer);
    await this.roomRepository.store(createRoom);
    
    createPlayer.room = createRoom.name;
    await this.playerService.store(createPlayer);
  }
  
  /**
   * Join room by JoinRoomDTO
   * @param {JoinRoomDTO} joinRoomDTO
   */
  public async joinRoom(joinRoomDTO: JoinRoomDTO): Promise<void> {
    const room = await this.roomRepository.getRoomByName(joinRoomDTO.roomName);
    if (!room) {
      throw new BadRequestException(`Room ${joinRoomDTO.roomName} not exists`);
    }
  
    const playerAlreadyJoinedBySocketId = room.players.some(player => player.socketId === joinRoomDTO.socketId);
    if (playerAlreadyJoinedBySocketId) {
      return;
    }
    
    const [playerAlreadyJoinedByPlayerName] = room.players.filter(player => player.name === joinRoomDTO.playerName);
    if (playerAlreadyJoinedByPlayerName && playerAlreadyJoinedByPlayerName.socketId !== joinRoomDTO.socketId) {
      throw new BadRequestException(`Player ${joinRoomDTO.playerName} already exists`);
    }
  
    if (playerAlreadyJoinedByPlayerName) {
      return;
    }
  
    if (room.players.length >= MAX_PLAYERS) {
      throw new BadRequestException(`Room ${joinRoomDTO.roomName} is full`);
    }
    
    const matchExists = await this.matchRepository.getMatchByRoomName(room.name);
    if (matchExists && matchExists.status === MATCH_STATUS.STARTED) {
      throw new BadRequestException(`Room ${joinRoomDTO.roomName} started`);
    }
    
    const createPlayer = PlayerEntity.createFromJoinRoomDTO(joinRoomDTO);
    
    room.addPlayer(createPlayer);
    await this.roomRepository.store(room);
  
    createPlayer.room = room.name;
    await this.playerService.store(createPlayer);
  }
}